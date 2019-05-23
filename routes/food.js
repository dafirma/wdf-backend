const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const User = require('../models/user');
const Storage = require('../models/storage');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

// GET STORAGE INFO

router.get('/storage', isLoggedIn(),(req, res, next) => {
  const userID = req.session.currentUser._id;
  User.findById(userID)
  .then(user =>{
    req.session.currentUser = user;
    res.status(200)
    res.json(user)

  })
  .catch(err =>{
    res.json(err);
  })
})

//CREATE AND UPDATE STORAGE

router.put('/storage/new', isLoggedIn(),async(req, res, next) => {
  try{
   const userID = req.session.currentUser._id;
   const {food} =req.body;
   const tempT = food.title;
   const tempQ = food.quantity;
   const tempUn = food.unity
   const userStorage = req.session.currentUser.storage;
   console.log(food)
   console.log(userStorage)
   let resp = await userStorage.some(el => el.title === tempT);
   console.log(resp)
   if(resp === true){

    //ok 
    let newStorage = await User.findByIdAndUpdate(userID, 
      { $set:{'storage.$[food].quantity':tempQ}},  { arrayFilters:[ { 'food.title':tempT } ] } )
        req.session.currentUser = newStorage
        console.log('new',newStorage.storage)
        res.json(newStorage)
 }
   else {
      let newStorageUp = await User.findByIdAndUpdate(userID,
        {$push: {storage: {title: tempT, quantity: tempQ, unity: tempUn}}, new:true})
        req.session.currentUser = newStorageUp;
        console.log('variable',newStorageUp.storage)
        console.log('user', req.session.currentUser.storage)
        //req.session.currentUser = newStorageUp
      //res.json(newStorageUp.storage)
   }  
  } catch(error){
    console.log(error)
  }
}
)


//DELETE
router.post('/storage', isLoggedIn(),async(req, res, next) => {
  try{
    const userID = req.session.currentUser._id;
    const {food} =req.body;
    console.log('aqui',food);
    let newStorage = await User.findByIdAndUpdate(userID, {$pull:{storage:{'title': food}}, new:true})
    console.log('new delete', newStorage.storage)
    res.json(newStorage.storage)
  }
  catch(err){ 
    console.log(err); 
  }
}
)


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

router.put('/favorite', isLoggedIn(),(req,res,next) =>{
  const userID = req.session.currentUser._id;
  const favorites = req.body.favoriteId;
  User.findByIdAndUpdate( userID, 
    {$push:{favorites:favorites}}, {new:true})
    .then(fav =>{
    console.log('ok',fav)
    res.json(fav.favorites)
    })
    .catch(err =>{
      res.json(err)
    })
  })
//DELETE FAVORITE
  router.post('/favorite', isLoggedIn(),async(req, res, next) =>{
   try{
    const userID = req.session.currentUser;
    const {favoriteId} = req.body;
    let newFavorite = await User.findByIdAndUpdate( userID, { $pull:{ favorites:{'uri': favoriteId.uri }}, new:true})
    res.json(newFavorite)
   }
    catch(err){
      res.json(err);
    }
   }  
  )
module.exports = router;

