// Core Imports
const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');
const session=require('express-session');
const bcrypt=require('bcrypt');
const rout=express.Router();
const util=require('util');
const { check,body,validationResult }=require('express-validator/check');
// External imports
const User=require('../models/user');

// handling '/back'

rout.use("/home/:id",async (req,res,next)=>{

    let id=req.params.id;
    let read = util.promisify(fs.readFile);
    let data=await read(path.join(__dirname, '..', 'dataBase', 'users', `${id}.json`));
    let user=JSON.parse(data);
   
    //lang 
    let ldata=await read(path.join(__dirname, '..', 'dataBase', 'language', `en.json`));
    let lang=  JSON.parse(ldata);
   
    // user is Authenticated
    req.session.isAuth = true;
    req.session.user=user;
    res.render('home',{
        isAuth : true, 
        path : "/home" ,
        lang : lang,
        language :"en"
    });
});


rout.use("/:id",async (req,res,next)=>{

    let id=req.params.id;
    let read = util.promisify(fs.readFile);
    let data=await read(path.join(__dirname, '..', 'dataBase', 'users', `${id}.json`));
    let user=JSON.parse(data);
   
    //lang 
    let ldata=await read(path.join(__dirname, '..', 'dataBase', 'language', `en.json`));
    let lang=  JSON.parse(ldata);
   
    // user is Authenticated
    req.session.isAuth = true;
    req.session.user=user;

    
    res.status(200).render('mysurveys',{surveys : req.session.user.surveys ,user: req.session.user });

});


module.exports=rout;