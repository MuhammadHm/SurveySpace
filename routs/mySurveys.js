const fs = require('fs');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const session=require('express-session');
//const user=require('./../models/user');
const rout = express.Router();


// /mysurveys
rout.use(parser.json());

rout.get('/',(req,res,next)=>{
   // const user=require('./../controllers/signin').authUser;
    
    res.render('mysurveys',{surveys : req.session.user.surveys ,user: req.session.user });
    //res.json(user);
});




module.exports = rout;