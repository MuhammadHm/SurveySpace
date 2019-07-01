const fs = require('fs');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const session=require('express-session');
//const user=require('./../models/user');
const rout = express.Router();
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const util=require('util');
const cookieUser=require("./../controllers/cookieUser")
rout.use(parser.json());

// /mysurveys

rout.get('/mytemplates',(req,res,next)=>{
    res.render('mytemplates',{templates : req.session.user.templates ,user: req.session.user });
})
rout.get('/',async (req,res,next)=>{
    let user=await cookieUser.getUser(req);
    res.render('mysurveys',{surveys : user.surveys ,user: user });
});



module.exports = rout;