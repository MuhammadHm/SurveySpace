const fs = require('fs');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const session=require('express-session');
//const user=require('./../models/user');
const rout = express.Router();
const Cryptr = require('cryptr');
const cookie = require('cookie');
const cryptr = new Cryptr('myTotalySecretKey');
const util=require('util');
const  read = util.promisify(fs.readFile);
const cookieUser=require("./../controllers/cookieUser")
rout.use(parser.json());

// /mysurveys

rout.get('/mytemplates',async(req,res,next)=>{
    let user=await cookieUser.getUser(req);
    let language="en";
    if (cookie.parse(req.headers.cookie || '').Language === "ar" )
        language=cookie.parse(req.headers.cookie || '').Language;
     let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${language}.json`));
     let lang=  JSON.parse(data);
    res.render('mytemplates',{
        templates : user.templates ,
        user: user,lang:lang ,
        cryptr : cryptr});
})
rout.get('/',async (req,res,next)=>{

    let user=await cookieUser.getUser(req);
    let language="en";
    if (cookie.parse(req.headers.cookie || '').Language === "ar" )
        language=cookie.parse(req.headers.cookie || '').Language;
     let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${language}.json`));
     let lang=  JSON.parse(data);
    res.render('mysurveys',
    {   surveys : user.surveys,
        cryptr : cryptr,
        user: user,
        lang:lang });
});



module.exports = rout;