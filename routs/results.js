const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');
const session=require('express-session');
const bcrypt=require('bcrypt');
const rout=express.Router();
const Result=require('../models/results');
const util=require('util');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
//  /results    
rout.use(parser.json());

rout.use('/submit',(req,res,next)=>{
    
    let result=new Result();
    if(req.body.survey_id !== undefined)
        result.addanswer(cryptr.decrypt(req.body.survey_id) ,req.body.user_id ,req.body.answers);
    
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.json({done : true});

});
rout.use("/getresult/:id",async (req,res,next)=>{
    id=req.params.id;
    let path1=path.join(__dirname,'..','dataBase','results',`${id}.json`);
    let read=util.promisify(fs.readFile);
    let result=await read(path1)
    result=JSON.parse(result)
    console.log(result)


})



module.exports=rout;
