const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Todo = require('../models/Todo')
const Group = require('../models/Group')

///to get the registeration form 
router.get(['/','/profile'], (req, res) => {
    const {authorization} = req.headers;
    // res.render('profile',{"auth":authorization})
    res.render('profile');

})
  





module.exports = router