// imports
const User = require('./../models/user');
const Survey = require('./../models/survey');
const { validationResult } = require('express-validator/check');
const parser = require('body-parser');
const { check, body } = require('express-validator/check');
const userInfo = require('./../models/usersInfo');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const util = require('util');
let surveyInfo = {};

//  /survey
exports.addServey = (req, res, next) => {
   

    //survey.addSurvey(req.session.user.id , req.body.title , req.body.welcomeMessage );
     surveyInfo = {
        user_id: req.session.user.id,
        title: req.body.title,
        welcomeMessage: req.body.welcomeMessage
    };
   
    res.redirect('http://localhost:3000');
  
}

exports.sendSurveyInfo = (req, res, next) => {
   
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(surveyInfo);
}

exports.saveSurvey = (req,res,next)=>{
    console.log('save survey');
    let survey = new Survey();
    survey.addSurvey(req.body.user_id,req.body.title,req.body.welcomeMessage,req.body.questionsArray);
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({done : true});

}

exports.getCreate = (req, res, next) => {
    res.render('survey');
}


