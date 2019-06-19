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
//rout.use(parser.urlencoded({extended : false}));
rout.use(parser.json());

//   handling  '/survey'
rout.post('/addsurvey',survey.addServeyInfo);    // getting survey title and welcome message
rout.use('/sendsurveyinfo',survey.sendSurveyInfo);  //sending survey title and welcome message to FE app
rout.use('/savesurvey',survey.saveSurvey);      // saving survey in database
rout.use('/sendsurvey/:id',survey.sendSurvey);   //sending survey data to previw 
rout.use('/publish',survey.publishSurvey);
rout.use('/saveastemplate',survey.saveAsTemplate) 
rout.use('/editsurvey',survey.editSurvey)   // saving the edited survey


module.exports=rout;