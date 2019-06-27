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
const User = require('./../models/user');



// for getting submitted data from url (as an obj through req.body)
rout.use(parser.urlencoded({ extended: false }));
rout.use(session({secret:'my secret' , resave: false, saveUninitialized:false }));

//  handling requests from /home

rout.get('/', async(req, res, next) => {
    await User.IsAuthUser(req,res);
    let language="en";
    if (cookie.parse(req.headers.cookie || '').Language === ("ar" || "en"))
        language=cookie.parse(req.headers.cookie || '').Language;
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

rout.get('/about', async(req, res, next) => {
    await User.IsAuthUser(req,res);
    let language="en";
    if (cookie.parse(req.headers.cookie || '').Language === ("ar" || "en"))
        language=cookie.parse(req.headers.cookie || '').Language;
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
    await User.IsAuthUser(req,res);
    let language="en";
    if (cookie.parse(req.headers.cookie || '').Language === ("ar" || "en"))
        language=cookie.parse(req.headers.cookie || '').Language;
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
    await User.IsAuthUser(req,res);
    let language="en";
    if (cookie.parse(req.headers.cookie || '').Language === ("ar" || "en"))
        language=cookie.parse(req.headers.cookie || '').Language;
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
    await User.IsAuthUser(req);
     let language="en";
     if (cookie.parse(req.headers.cookie || '').Language === ("ar" || "en"))
        language=cookie.parse(req.headers.cookie || '').Language;
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


rout.post('/Language',(req,res,next) => {
    if (req.body.Language === "Arabic")
        res.cookie("Language","ar",{maxAge :2592000000});
    else
        res.cookie("Language","en",{maxAge :2592000000});
    res.redirect(req.headers.referer);
});

module.exports = rout; 