// Core Imports
const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');
const session=require('express-session');
const bcrypt=require('bcrypt');
const rout=express.Router();
// External imports
const User=require('../models/user');
// Setting session
rout.use(session({secret:'my secret' , resave: false, saveUninitialized:false }));
//  handling requests from /singIn

rout.post('/submit',(req, res, next) => {   // logIn submit
    //must search at emails for a valid email

});

rout.post('/signUp/submit',(req,res,next)=>{
    //validating email
    let user=new User(id);
    user.addUser(req.body.name,req.body.email,req.body.password);
    //res.redirect('to dashboard')
});

rout.get('/signUp',(req,res,next)=>{
    res.render('signUp');
});

rout.get('/',(req,res,next)=>{
    res.render('login');
});

module.exports=rout;