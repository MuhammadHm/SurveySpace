// npm Imports
const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');
const session=require('express-session');
const app=express();

// External imports
const home=require('./routs/home');
const userRout=require('./routs/userRout');
const singin=require('./routs/signin');

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

//app.use('/user',userRout);




//  Run Server
app.listen(3000);


