const express = require('express');
const router = express.Router()
const User = require('../models/User')  ///not created yet

///to get the registeration form 
router.get(['/','/register'], (req, res) => {
    res.render('register')
  })
  
//to post the reg. form values
router.post('/register', (req, res) => {
    ///the api handling
    res.render('register',{msg:"You Registered Successfully..."}) ///head to the same page with success msg
})
    
///to get the login form 
router.get('/login', (req, res) => {
    res.render('login')
})
  
//to post the login form values
router.post('/login', (req, res) => {
    ///the api handling
})

router.get('/profile', (req, res) => {
    res.render('profile')
})

module.exports = router