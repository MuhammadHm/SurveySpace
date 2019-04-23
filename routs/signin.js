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
// Setting session
rout.use(session({secret:'my secret' , resave: false, saveUninitialized:false }));
//   getting submitted data from url (as an obj through req.body)
rout.use(parser.urlencoded({extended : false}));


//  handling requests from /singin

rout.post('/signup',
    //validating user Input
    [      //TODO check if the email alredy used
        check('email').isEmail().trim().withMessage("Please Enter a valid email"),
        check('password').isLength({ min: 5 }).withMessage(`Password must be 5 characters at least`),
        body('confirmPassword').custom((value, {req})=>{
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })
    ],signin.signup);

rout.get('/signup',(req,res,next)=>{
    res.render('signup',{
        err : false,
        oldInput :{
            name : '',
            email : '',
            password : '',
            confirmPassword : ''
        }
    });  
});

rout.post('/login',[
    check('email').isEmail().trim().withMessage("Please Enter a valid email"),
    check('password').isLength({ min: 5 }).withMessage(`Password must be 5 characters at least`)
],signin.login);

rout.get('/',(req,res,next)=>{
    res.render('signin',{
        err : false,
        oldInput : {
            email : '',
            password: ''
        }
        });
});

module.exports=rout;