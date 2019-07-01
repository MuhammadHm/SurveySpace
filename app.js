// npm Imports
const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');
const session=require('express-session');
const app=express();

// External imports
const home=require('./routs/home');
const singin=require('./routs/signin');
const mysurveys=require('./routs/mySurveys');
const survey=require('./routs/survey');
const results=require('./routs/results');
const back = require('./routs/back');
const logout=require('./routs/logout');
//  Setting view engine
app.set('view engine', 'ejs');
app.set('views', 'views');


//   defining public folder
app.use(express.static(path.join(__dirname,'public')));
//   getting submitted data from url (as an obj through req.body)
app.use(parser.urlencoded({extended : false}));
//   using sessions
app.use(session({secret:'my secret' , resave: false, saveUninitialized:false }));

//  Requests Handlers
app.use('/home',home);

app.use('/signin',singin);

app.use('/logout',logout);

app.use('/mysurveys',mysurveys);

app.use('/survey',survey);

app.use('/results',results);

app.use('/back',back);

app.listen(8080);


