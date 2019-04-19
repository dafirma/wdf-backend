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
  User.findById(userID).populate('storage')
  .then(storageList =>{
    res.status(200)
    res.json(storageList)
    console.log(storageList);
  })
  .catch(err =>{
    res.json(err);
  })
})



router.post('/storage', isLoggedIn(),(req, res, next) => {
  const userID = req.session.currentUser._id;
  Storage.create({
    title: req.body.title,
    quantity: req.body.quantity
  })
  .then(response =>{
    console.log(response);
    
    const title = req.body.title;
    const quantity = req.body.quantity;
    const storage = {title, quantity};
    User.findByIdAndUpdate(userID, {$push: { storage } } )
    .then(theResponse =>{
      res.json(theResponse);
      console.log(req.session.currentUser);
    })
    .catch(err =>{
      res.json(err);
    })  
  })
  .catch(err =>{
    res.json(err);
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


router.delete('/storage/:id',isLoggedIn(), (req,res, next) =>{

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
    res.json(favoriteList)
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

router.put('/:favorite', isLoggedIn(),(req,res,next) =>{
  const userID = req.session.currentUser._id;
  //const { favoriteId } = req.body;
  console.log(req.session.currentUser._id)
  //const favorite = {recipeId: favoriteId};
  User.findByIdAndUpdate( userID, {$push:{'favorite.0.recipeId': req.body.favoriteId}})
  .then((fav) => {
    res.status(200)
    res.json({message: `favorite recipe user ${username} is updated. ${favorite}`, fav })
    res.json(req.session.currentUser)
    //console.log(req.session.currentUser);
  })
  .catch((err)=>{
    res.json(err);
  })
}) 




router.delete('/favorite', isLoggedIn(),(req, res, next) =>{
  const userID =req.session.currentUser._id;
  User.findByIdAndUpdate( userID, {$pull:{'favorite.0.recipeId': req.body.favoriteId}})
  .then((fav) => {
    res.status(200)
    //res.json({message: `favorite recipe user ${username} is updated. ${favorite}`, fav })
    res.json(fav)
    //console.log(req.session.currentUser);
  })
  .catch((err)=>{
    res.json(err);
  })
  
    

})





module.exports = router;
