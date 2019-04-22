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
//   getting submitted data from url (as an obj through req.body)
rout.use(parser.urlencoded({extended : false}));


//  handling requests from /singin

rout.post('/login',(req, res, next) => {   // logIn submit
    //must search at emails for a valid email
    console.log(req.body.email,req.body.password,req.body.keepMe);
    res.redirect('/home');
});

rout.post('/signup',(req,res,next)=>{
    //validating email
  

    let user=new User(10);
    user.addUser(req.body.name,req.body.email,req.body.password);

    res.redirect('/home')
    
});


rout.get('/',(req,res,next)=>{
    res.render('login');
});

module.exports=rout;