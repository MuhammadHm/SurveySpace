// Core Imports
const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');
const session=require('express-session');
const bcrypt=require('bcrypt');
const rout=express.Router();
const { check,body,validationResult }=require('express-validator/check');

// External imports
const User=require('../models/user');
const signin=require('../controllers/signin');
const signup=require('../controllers/signup');

// Setting session
rout.use(session({secret:'my secret' , resave: false, saveUninitialized:false }));
// getting submitted data from url (as an obj through req.body)
rout.use(parser.urlencoded({extended : false}));


//  handling requests from /singin
rout.post('/signup',signup.validateSignup,signup.postSignup);
rout.get ('/signup',signup.getSignup);

rout.post('/login',signin.validateLogin,signin.postLogin);
rout.get('/',signin.getLogin);

module.exports=rout;