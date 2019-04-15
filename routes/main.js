/* const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

router.get('/storage', isLoggedIn(), (req, res, next)=> {
  const userID = req.session.currentUser._id;
  User.find({ userID })
  .then(storageList =>{
    res.status(200)
    res.json(storageList)
  })
    .catch(err =>{
      res.json(err);
    })
})

router.post ('/storage', (req,res, next) => {
  const { title, quantity } = req.body;
  const userID = req.session.currentUser._id;
  const storage = { title, quantity};
  User.findOneAndUpdate({_id: userID }, {
    $push: { storage },
  })
})


module.exports = router;  */