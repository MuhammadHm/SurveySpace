const fs = require('fs');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const session=require('express-session');
const rout = express.Router();
const infoLogin = require('../controllers/signin');
const util=require('util');
const Result=require('../models/results');
const cookie = require('cookie');



// for getting submitted data from url (as an obj through req.body)
rout.use(parser.urlencoded({ extended: false }));
rout.use(session({secret:'my secret' , resave: false, saveUninitialized:false }));

//  handling requests from /home

rout.get('/about', async(req, res, next) => {
    let language=cookie.parse(req.headers.cookie || '').Language;
    if(language === "Arabic")
        language="ar";
    else 
        language="en";
     let read = util.promisify(fs.readFile);
     let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${language}.json`));
     let lang=  JSON.parse(data);
    res.render('about', { 
        isAuth : req.session.isAuth,
        lang :  lang,
        language : language
    });
});

rout.get('/features', async(req, res, next) => {
    let language=cookie.parse(req.headers.cookie || '').Language;
    if(language === "Arabic")
        language="ar";
    else 
        language="en";
     let read = util.promisify(fs.readFile);
     let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${language}.json`));
     let lang=  JSON.parse(data);
    res.render('features', { 
        isAuth : req.session.isAuth,
        lang :  lang,
        language : language
    });
});


rout.get('/contact',async(req,res,next)=>{
    let language=cookie.parse(req.headers.cookie || '').Language;
    if(language === "Arabic")
        language="ar";
    else 
        language="en";
     let read = util.promisify(fs.readFile);
     let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${language}.json`));
     let lang=  JSON.parse(data);
     res.render('contact',{
        isAuth : req.session.isAuth,
        lang :  lang,
        language : language
     });
});

rout.post('/contact/submitFeedback', (req, res, next) => {
    let feedback = req.body;
    fs.writeFile(path.join(__dirname, '..', 'dataBase', 'feedbacks', `${feedback.name}.json`), feedback);
    res.redirect('/contact', { 
        isAuth : req.session.isAuth,
    });
    // printing succeed message (your feedback submitted)
});

rout.get('/account',async (req, res, next) => {
    let language=cookie.parse(req.headers.cookie || '').Language;
    if(language === "Arabic")
        language="ar";
    else 
        language="en";
     let read = util.promisify(fs.readFile);
     let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${language}.json`));
     let lang=  JSON.parse(data);
    res.render('profile',
    { 
        isAuth : req.session.isAuth,
        user : req.session.user,
        lang :  lang,
        language : language
    });
});
rout.get('/', async(req, res, next) => {
    let language=cookie.parse(req.headers.cookie || '').Language;
    if(language === "Arabic")
        language="ar";
    else 
        language="en";
     let read = util.promisify(fs.readFile);
     let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${language}.json`));
     let lang=  JSON.parse(data);
    res.render('home',
    { 
        isAuth : req.session.isAuth,
        lang :  lang,
        language : language
  
    });
});

rout.post('/Language',(req,res,next) => {
    res.cookie("Language",req.body.Language);
    res.redirect(req.headers.referer);
});

module.exports = rout;