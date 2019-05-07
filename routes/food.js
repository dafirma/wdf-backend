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

router.put('/:storage', isLoggedIn(),(req, res, next) => {
  const userID = req.session.currentUser._id;
  const {menu} =req.body;
  //console.log(menu.name);
  //console.log(menu[0].name)
  User.findByIdAndUpdate(userID, {$push:{storage:menu}})
  .then((food)=>{
    res.json(food)
  })
  .catch((error)=>{
    res.json(error)
  }) 

})

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
})

// FAVORITE RECIPES

router.get('/favorite', isLoggedIn(), (req,res,next)=>{
  const userID = req.session.currentUser._id;
  User.findById(userID)
  .then(favoriteList =>{
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

router.put ('/word', isLoggedIn(),(req,res,next)=>{
  const userID = req.session.currentUser._id;
  const word = req.body.word;
  console.log(word)
  User.findByIdAndUpdate(userID, {$push:{wordTest:word}})
  .then((test)=>{
    console.log(test)
  })
  .catch((error)=>{
    console.log(error)
  })
})

router.post('/word', isLoggedIn(),(req,res,next)=>{
  const userID = req.session.currentUser._id;
  const wordDelete = req.body.word;
  console.log(wordDelete)
  User.findByIdAndUpdate(userID, {$pull: {wordTest:wordDelete}})
  .then((test)=>{
    console.log(test)
  }).catch((error)=>{
    console.log(error);
  })
})

router.put('/:favorite', isLoggedIn(),(req,res,next) =>{
  const userID = req.session.currentUser._id;
  const favorites = req.body.favoriteId;
  //const favorites = {favorites: favoriteId}
  //console.log(req.session.currentUser._id)
  //const favorite = {recipeId: favoriteId};
  console.log(favorites)
  User.findByIdAndUpdate( userID, {$push:{favorites:favorites}})
  .then((fav) => {
    //res.status(200)
    res.json({message: `favorite recipe user ${username} is updated. ${favorite}`, fav })
    res.json(fav.data)
    //console.log(req.session.currentUser);
  })
  .catch((err)=>{
    res.json(err);
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
