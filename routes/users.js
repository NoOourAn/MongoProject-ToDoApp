const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
let ejs = require('ejs')
const User = require('../models/User')

///to get the registeration form 
router.get(['/','/register'], (req, res) => {
    res.render('register')
  })
  
//to post the reg. form values
router.post('/register', async (req, res) => {
    ///the api handling
    try{
        const {username ,email ,password} = req.body;
        ///to check if username and email unique
        const FoundUser = await User.findOne({$or:[{username},{email}]}).exec();
        if(FoundUser) throw new Error("username or email already exists")
  
        ///to check if password is strong enough
        var Passwordregex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        let strongPassword = Passwordregex.test(password);
        if(!strongPassword) throw new Error("your password should contain Atleast 1 capital letter , 1 digit in minimum 8 long")
        ///after all validations are passed
        const HashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username,email,password:HashedPassword})
        res.json({success:true,msg:"You Registered Successfully..."}) ///head to the same page with success msg 
    }catch(err){
          res.status(422).json({success:false,error:err.message}) ///head to the same page with error msg
        }
})
    
///to get the login form 
router.get('/login', (req, res) => {
    res.render('login')
})
  
//to post the login form values
router.post('/login', (req, res) => {
    ///the api handling
    // try{

    //     const {username,password} = req.body;
    //     if(username && password){
  
    //       const user  = await User.findOne({ username }).exec(); 
    //       if(!user) throw new Error("wrong username or password!!")
    //       const isMatch = await bcrypt.compare(password, user.password);
    //       if(!isMatch) throw new Error("wrong username or password!!");
    
    
    //       const LoggedUser = await User.findOneAndUpdate({ username }).exec();
    //       // console.log(LoggedUser);
    //       if(LoggedUser){
    //         //prepare token for user
    //         var token = await jwt.sign({ id: LoggedUser.id }, 'Awesomeness');
    //         if(!token) throw new Error("something went wrong !!");
    //         // res.send({token});
    //         // population of user -_-
    //         const FoundTodos = await Todo.find({ user:LoggedUser.id }).populate('user').exec();
    //         if(FoundTodos){
    //               const obj = {
    //               message: "logged in successfully",
    //               username,
    //               latestTodos: (FoundTodos.length ? todos : 'no todos'),
    //             }
    //             res.json(obj)
    //         }else throw new Error("something went wrong !!");
    //       }else throw new Error("invalid credentials !!")
    //     }else throw new Error("username and password are required !!")
  
    //   }catch(err){
    //       res.status(422).json({error:err.message})
    //   }
})

router.get('/profile', (req, res) => {
    res.render('profile',{ status: true, msg: "Hello there!" })
    
})

module.exports = router