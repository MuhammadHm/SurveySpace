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
let user=new User();

//  '/survey'
exports.addServeyInfo =async (req, res, next) => {

    let files=await fs.readdirSync(path.join(__dirname,'..','dataBase','survey'))
        
    let survey_id=files.length+1;  
    User.addSurvey(req.session.user.id ,survey_id ,req.body.title , req.body.welcomeMessage);
    let survey = new Survey();
    survey.addSurvey(survey_id,req.session.user.id  ,req.body.title , req.body.welcomeMessage,[]) ;
    user=req.session.user;
       
    res.redirect(`http://localhost:3000/createsurvey`);

}
exports.sendSurveyInfo =async (req, res, next) => {
    
    let Info =await User.getLastSurvey();
    let surveyInfo={
          survey_id: Info.surveyInfo.id,
          user_id : Info.id,
          title : Info.surveyInfo.title,
          welcomeMessage : Info.surveyInfo.welcomeMessage
    }

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
exports.saveAsTemplate = async(req , res )=>{
    let survey = new Survey();

    if(req.body.survey_id != undefined)
         survey.saveAsTemplate(req.body.survey_id ,req.body.user_id ,req.body.title ,req.body.welcomeMessage,req.body.questionsArray);
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({done : true});
}
exports.editSurvey = async (req,res)=>{
    

    if(req.body.survey_id != undefined)
         Survey.editSurvey(req.body.survey_id ,req.body.user_id ,req.body.title ,req.body.welcomeMessage,req.body.questionsArray);
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({done : true});
}





