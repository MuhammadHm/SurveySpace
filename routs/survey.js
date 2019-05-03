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
const survey=require('../controllers/survey');


// Setting session
rout.use(session({secret:'my secret' , resave: false, saveUninitialized:false,cookie: { secure : true} }));
// getting submitted data from url (as an obj through req.body)
rout.use(parser.urlencoded({extended : false}));


rout.post('/create',survey.postServey);
rout.get('/',survey.getCreate);

module.exports=rout;