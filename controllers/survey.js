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
exports.addServeyInfo =async (req, res, next) => {

    await fs.readdir(path.join(__dirname,'..','dataBase','survey'),async (err, files) => {
        
        let id=files.length+1;  
        
         surveyInfo = {
            survey_id: id, 
            user_id: req.session.user.id,
            title: req.body.title,
            welcomeMessage: req.body.welcomeMessage
        };   

    });
    res.redirect('http://localhost:3000/createsurvey');

}
exports.sendSurveyInfo = (req, res, next) => {
   
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(surveyInfo);
}
exports.saveSurvey =async (req,res,next)=>{
    let survey = new Survey();

    if(req.body.survey_id != undefined)
         survey.addSurvey(req.body.survey_id ,req.body.user_id ,req.body.title ,req.body.welcomeMessage,req.body.questionsArray);
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({done : true});

}
exports.sendSurvey =async (req,res,next)=>{
    
    //for previewing survey with certain id to users 
    let survey_id=req.params.id; 

    //for previewing the last saved survey (if preview clicked from the creating nav)
    if(survey_id === 'id'){
        let files =await fs.readdirSync(path.join(__dirname,'..','dataBase','survey'));
        survey_id = files.length;        
    }

    let read = util.promisify(fs.readFile);
    let data=await read(path.join(__dirname, '..', 'dataBase', 'survey', `${survey_id}.json`));
    let survey=JSON.parse(data);

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(survey);
    
}
exports.publishSurvey =async ( req , res )=>{

    let files =await fs.readdirSync(path.join(__dirname,'..','dataBase','survey'));
    let id = files.length;  
     
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({ survey_id :  id });    

}




