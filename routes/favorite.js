const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

router.get('/favorite', isLoggedIn(), (req,res,next) =>{
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

router.put('/favorite', isLoggedIn(),(req,res,next) =>{
  const userID = req.session.currentUser._id;
  const username = req.session.currentUser.username;
  const { preference } = req.body;
  console.log(preference);
  User.findByIdAndUpdate(userID, preference)
  .then(() => {
    res.status(200)
    res.json({message: `favorite recipe user ${username} is updated. ${preference}`})
    console.log(req.session.currentUser);
  })
  .catch(err =>{
    res.json(err);
  })
})



module.exports = router;