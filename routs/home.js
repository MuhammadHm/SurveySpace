const fs = require('fs');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const session=require('express-session');
const rout = express.Router();
const infoLogin = require('../controllers/signin');
const util=require('util');


// for getting submitted data from url (as an obj through req.body)
rout.use(parser.urlencoded({ extended: false }));
rout.use(session({secret:'my secret' , resave: false, saveUninitialized:false }));

//  handling requests from /home

rout.get('/about', (req, res, next) => {
    res.render('about', { 
        isAuth : req.session.isAuth
    });
});

rout.get('/features', (req, res, next) => {
    res.render('features', { 
        isAuth : req.session.isAuth
    });
});

rout.get('/contact', (req, res, next) => {
    res.render('contact', { 
        isAuth : req.session.isAuth
    });
});

rout.post('/contact/submitFeedback', (req, res, next) => {
    let feedback = req.body;
    fs.writeFile(path.join(__dirname, '..', 'dataBase', 'feedbacks', `${feedback.name}.json`), feedback);
    res.redirect('/contact', { 
        isAuth : req.session.isAuth
    });
    // printing succeed message (your feedback submitted)
});

rout.get('/account', (req, res, next) => {
    res.render('profile',
    { 
        isAuth : req.session.isAuth,
        user : req.session.user
    });
});
rout.get('/', async(req, res, next) => {
    let read = util.promisify(fs.readFile);
    let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `en.json`));
    let lang=  JSON.parse(data);
    console.log(lang.Survey_Space);
    
   

    

    req.session.lang=lang;
    res.render('home',
    { 
        isAuth : req.session.isAuth,
        lang :   req.session.lang    
    });
});

rout.get('/:language', async(req, res, next) => {
    let lang="ar";
    if (req.params.language !== "ar")
        lang="en";
    let read = util.promisify(fs.readFile);
    let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${lang}.json`));
    lang=  JSON.parse(data);
    console.log(lang.Survey_Space);
    req.session.lang=lang;
    res.render('home',
    { 
        isAuth : req.session.isAuth,
        lang :   req.session.lang    
    });
});



module.exports = rout;