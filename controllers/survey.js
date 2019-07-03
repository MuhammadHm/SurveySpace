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
const read = util.promisify(fs.readFile);
let user=new User();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const cookieUser=require("./cookieUser");
const Results=require("./../models/results")
const cookie = require('cookie');

//  handle '/survey'
exports.addServeyInfo =async(req, res, next) => {

    let files=await fs.readdirSync(path.join(__dirname,'..','dataBase','survey'))        
    let survey_id=files.length+1; 

    res.cookie("survey",cryptr.encrypt(survey_id)); 

    let user_id =await cookieUser.getUserID(req);
    User.addSurvey(user_id ,survey_id ,req.body.title , req.body.welcomeMessage);

    let survey = new Survey();
    await survey.addSurvey(survey_id , user_id , req.body.title , req.body.welcomeMessage,[]) ;

         
    res.redirect(`http://localhost:3000/createsurvey`);
}
exports.sendSurveyInfo =async (req, res, next) => {
    
    let survey_id=cryptr.decrypt(req.params.user_id);
    //let Info =await User.getLastSurvey(user_id);
    let data=await read(path.join(__dirname, '..', 'dataBase', 'survey', `${survey_id}.json`));
    let Info=JSON.parse(data);

    let surveyInfo={
          survey_id: Info.id,
          user_id : Info.user_id,
          title : Info.title,
          welcomeMessage : Info.welcomeMessage
    }

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(surveyInfo);
}
exports.saveSurvey =async (req,res,next)=>{
    let survey = new Survey();

    if(req.body.survey_id != undefined)
         survey.addSurvey(cryptr.decrypt(req.body.survey_id) ,req.body.user_id ,req.body.title ,req.body.welcomeMessage,req.body.questionsArray);
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({done : true});

}
exports.sendSurvey =async (req,res,next)=>{
    
    let survey_id=cryptr.decrypt(req.params.id); 
    let data=await read(path.join(__dirname, '..', 'dataBase', 'survey', `${survey_id}.json`));
    let survey=JSON.parse(data);

    //console.log("send survey : ",survey)
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(survey);
    
}
exports.sendTemplate =async (req,res,next)=>{
    
    let template_id=cryptr.decrypt(req.params.id); 
    let data=await read(path.join(__dirname, '..', 'dataBase', 'templates', `${template_id}.json`));
    let template=JSON.parse(data);
    
    //console.log("send survey : ",survey)
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(template);
    
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
         survey.saveAsTemplate(cryptr.decrypt(req.body.survey_id ),req.body.user_id ,req.body.title ,req.body.welcomeMessage,req.body.questionsArray);
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({done : true});
}
exports.editSurvey = async (req,res)=>{
    
    if(req.body.survey_id != undefined)
         Survey.editSurvey(cryptr.decrypt(req.body.survey_id) ,req.body.user_id ,req.body.title ,req.body.welcomeMessage,req.body.questionsArray);
    

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({done : true});
}
exports.delete = async (req,res)=>{

    let id = cryptr.decrypt(req.params.id);
    //deleting file
    let path1=path.join(__dirname,'..','dataBase','survey',`${id}.json`);
    fs.unlinkSync(path1);
    fs.unlinkSync(path.join(__dirname,'..','dataBase','results',`${id}.json`));

    //delete from user file
    let user_id =await cookieUser.getUserID(req);
    let user = await read(path.join(__dirname,'..','dataBase','users',`${user_id}.json`));
    user = JSON.parse(user);
    for( let i = 0; i < user.surveys.length; i++){ 
        if ( user.surveys[i].id == id) {
            user.surveys.splice(i, 1); 
        }
    }
    let json=JSON.stringify(user);
    await fs.writeFileSync(path.join(__dirname,'..','dataBase','users',`${user_id}.json`),json); 
   
    res.redirect("/mysurveys")
}
exports.deleteTemplate = async (req,res)=>{

    let id = cryptr.decrypt(req.params.id);
    //deleting file
    let path1=path.join(__dirname,'..','dataBase','templates',`${id}.json`);
    fs.unlinkSync(path1);
    //delete from user file
    let user_id =await cookieUser.getUserID(req);

    let user = await read(path.join(__dirname,'..','dataBase','users',`${user_id}.json`));
    user = JSON.parse(user);
    for( let i = 0; i < user.templates.length; i++){ 
        if ( user.templates[i].id == id) {
            user.templates.splice(i, 1); 
        }
    }
    let json=JSON.stringify(user);
    await fs.writeFileSync(path.join(__dirname,'..','dataBase','users',`${user_id}.json`),json); 
   
    res.redirect("/mytemplates")
}
exports.report = async (req,res)=>{

    let survey_id=cryptr.decrypt(req.params.id); 
    let report=await Results.createReport(survey_id)
    console.log(report)
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(report);
}
exports.analyze = async (req,res)=>{

    let survey_id=cryptr.decrypt(req.params.id); 
    console.log("survey ID " ,survey_id)
    let result=await Results.getresult(survey_id)
    console.log("result: "+ result)
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json(result);
}



