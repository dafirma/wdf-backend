const express = require('express');
const createError = require('http-errors');
//const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/user');
const Storage = require('../models/storage');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');


router.get('/storage', isLoggedIn(),(req, res, next) => {
  const userID = req.session.currentUser._id;
  User.findById(userID)
  .then(storageList =>{
    res.status(200)
    res.json(storageList)
    console.log(storageList);
  })
  .catch(err =>{
    res.json(err);
  })
})

//CREATE OK

router.put('/storage/new', isLoggedIn(),async(req, res, next) => {
  try{
    const userID = req.session.currentUser._id;
   const {food} =req.body;
   //const {title, quantity} = req.body;
   //const food = {title, quantity};
   const tempT = food.title;
   const tempQ = food.quantity;
  // const tempQ = food.quantity;
   //const tempT = food.name;
   //console.log(food);
   console.log(tempQ);
   console.log(tempT);
   console.log('food',food)
   //console.log(req.session.currentUser.storage);
   const userStorage = req.session.currentUser.storage;
   console.log('user',userStorage)
   console.log(req.session.currentUser)
   let resp = await userStorage.some(el => el.title === tempT);
   //let index = await userStorage.findIndex(el => el.title === tempT);
   //let newQnt = userStorage[index].quantity + tempQ;

   console.log('resp',resp);
   //console.log(newQnt)
   if(resp === true){
     let newStorage = await User.findByIdAndUpdate(userID, 
       { $set:{'storage.$[food].quantity':tempQ}},  { arrayFilters:[ { 'food.title':tempT } ] } )
       .then(user =>{
         req.session.currentUser = user
         console.log('new',user)
         res.json(user)
// refractor
       })
  }
   else {
      let newStorageUp = await User.findByIdAndUpdate(userID,
        {$push: {storage: {title: tempT, quantity: tempQ}}, new:true})
        req.session.currentUser = newStorageUp
      res.json(newStorageUp)
   } 
  } catch(error){
    console.log(error)
  }
})
 // veririfcar porque esta saltando a condicao de false



router.put('/storage', isLoggedIn(),async(req, res, next) => {
try{

  const userID = req.session.currentUser._id;
  const {name, quantity} =req.body;
  const menu ={name, quantity};
  const tempT = menu.name;
  const tempQ = menu.quantity;
  // para trocar deve ser primeiro o campo que voce precisa trocar e depois o campo de comparacao.
  let newStorage = await User.findByIdAndUpdate(userID,  { $set:{'storage.$[food].quantity':tempQ}},{ arrayFilters:[{'food.name':tempT}], new:true } )
  console.log('new',newStorage)
  res.json(newStorage)
} catch(error){
  console.log(error)
}}
)


//UPDATE

router.put('/storage', isLoggedIn(),async(req, res, next) => {
  try{
  
    const userID = req.session.currentUser._id;
    const {menu} =req.body;
    //const menu ={title, quantity};
    const tempT = menu.title;
    const tempQ = menu.quantity;
    console.log(menu)
    console.log('title',tempT)
    console.log('qnt', tempQ)
    // para trocar deve ser primeiro o campo que voce precisa trocar e depois o campo de comparacao.
   // let newStorage = await User.findByIdAndUpdate(userID,  { $set:{'storage.$[food].quantity':tempQ}},{ arrayFilters:[{'food.title':tempT}], new:true } )
    //console.log('new',newStorage)
   // res.json(newStorage)
 } catch(error){
   console.log(error)
  }}
  )


//ok
/* 
router.put('/storage', isLoggedIn(),async(req, res, next) => {
try{

  const userID = req.session.currentUser._id;
  const {title, quantity} =req.body;
  const menu ={title, quantity};
  const tempT = menu.title;
  const tempQ = menu.quantity;
  // para trocar deve ser primeiro o campo que voce precisa trocar e depois o campo de comparacao.
  let newStorage = await User.findByIdAndUpdate(userID,  { $set:{'storage.$[food].quantity':tempQ}},{ arrayFilters:[{'food.title':tempT}], new:true } )
  console.log('new',newStorage)
  res.json(newStorage)
} catch(error){
  console.log(error)
}}
)
 */

//DELETE
router.post('/storage', isLoggedIn(),(req, res, next) => {
  const userID = req.session.currentUser._id;
  const {foodName} =req.body;
  console.log(foodName);
  //console.log(menu.name);
  //console.log(menu[0].name)
 User.findByIdAndUpdate(userID, {$pull:{storage:{'name': foodName}}})
  .then((food)=>{
    res.json(food)
  })
  .catch((error)=>{
    res.json(error)
  })  

})

/* 
router.put('/storage/:id',isLoggedIn(),(req, res, next) =>{
  Storage.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.json({message: `food storage ${req.params.id} is updated`});
    console.log(req.session.currentUser);
  })
  .catch(err =>{
    res.json(err);
  })
})


router.post('/storage/:id',isLoggedIn(), (req,res, next) =>{
//$pull
  Storage.findByIdAndRemove(req.params.id)
  .then(() =>{
    res.json({message: `food storage ${req.params.id} is removed`});
    console.log(req.session.currentUser);
  })
  .catch(err =>{
    res.json
  })
}) */

// FAVORITE RECIPES

router.get('/favorite', isLoggedIn(), (req,res,next)=>{
  const userID = req.session.currentUser._id;
  User.findById(userID)
  .then(favoriteList =>{
    req.session.currentUser.favorites = favoriteList.favorites
    res.status(200)
    res.json(favoriteList.favorites)
  })
  .catch(err =>{
    res.json(err);
  })
})

/* router.put('/:favorite', isLoggedIn(),(req,res,next) =>{
  const userID = req.session.currentUser._id;
  const { favoriteId } = req.body;
  console.log(favoriteId)
  //const favorite = {recipeId: favoriteId};
  User.findOneAndUpdate( userID,
    {$push: {'favorite': [{ 'recipeId': favoriteId }] } } )
  .then((fav) => {
    res.status(200)
    res.json({message: `favorite recipe user ${username} is updated. ${favorite}`, fav })
    res.json(req.session.currentUser)
    //console.log(req.session.currentUser);
  })
  .catch((err)=>{
    res.json(err);
  })
}) */


router.put('/favorite', isLoggedIn(),(req,res,next) =>{
  const userID = req.session.currentUser._id;
  const favorites = req.body.favoriteId;
  //const favorites = {favorites: favoriteId}
  //console.log(req.session.currentUser._id)
  //const favorite = {recipeId: favoriteId};
  //console.log(favorites)
  User.findByIdAndUpdate( userID, 
    {$push:{favorites:favorites}}, {new:true})
    .then(fav =>{
       //res.status(200)
    console.log('ok',fav)
    //res.json({message: `favorite recipe user ${username} is updated. ${favorite}`, fav })
    res.json(fav.favorites)
    //console.log(req.session.currentUser);
    })
    .catch(err =>{
      res.json(err)
    })
  })





router.post('/favorite', isLoggedIn(),(req, res, next) =>{
  const userID = req.session.currentUser;
  const {favoriteId} = req.body;
  console.log(favoriteId)
  User.findByIdAndUpdate( userID, { $pull:{ favorites:{'uri': favoriteId }}})
  .then((fav) => {
    //res.status(200);
    res.json({message: `favorite recipe user ${username} is updated. ${favorite}`, fav })
    res.json(fav)
  })
  .catch((err)=>{
    res.json(err);
  }) 
  
  
  
})





module.exports = router;

// router.put ('/word', isLoggedIn(),(req,res,next)=>{
//   const userID = req.session.currentUser._id;
//   const word = req.body.word;
//   console.log(word)
//   User.findByIdAndUpdate(userID, {$push:{wordTest:word}})
//   .then((test)=>{
//     console.log(test)
//   })
//   .catch((error)=>{
//     console.log(error)
//   })
// })

// router.post('/word', isLoggedIn(),(req,res,next)=>{
//   const userID = req.session.currentUser._id;
//   const wordDelete = req.body.word;
//   console.log(wordDelete)
//   User.findByIdAndUpdate(userID, {$pull: {wordTest:wordDelete}})
//   .then((test)=>{
//     console.log(test)
//   }).catch((error)=>{
//     console.log(error);
//   })
// })