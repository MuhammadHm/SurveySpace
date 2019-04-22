const fs = require('fs');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const rout = express.Router();

// for getting submitted data from url (as an obj through req.body)
rout.use(parser.urlencoded({ extended: false }));

//  handling requests from /home

rout.get('/about', (req, res, next) => {
    res.render('about');
});

rout.get('/features', (req, res, next) => {
    res.render('features');
});

rout.get('/contact', (req, res, next) => {
    res.render('contact');
});

rout.post('/contact/submitFeedback', (req, res, next) => {
    let feedback = req.body;
    fs.writeFile(path.join(__dirname, '..', 'dataBase', 'feedbacks', `${feedback.name}.json`), feedback);
    res.redirect('/contact');
    // printing succeed message (your feedback submitted)
});

rout.get('/', (req, res, next) => {
    res.render('home');

});


module.exports = rout;