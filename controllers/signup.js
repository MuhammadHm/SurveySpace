const { validationResult } = require('express-validator/check');
const parser=require('body-parser');
const { check,body }=require('express-validator/check');
const userInfo=require('./../models/usersInfo');
const fs = require('fs');
const util=require('util');
const read = util.promisify(fs.readFile);
const User = require('./../models/user');
const path = require('path');
const cookie = require('cookie');


exports.postSignup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('signup', {
            err: errors.array()[0],
            oldInput:{
                name : req.body.userName,
                email : req.body.email,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword
            }  
        });
    }
   
    let user = new User();
    user.addUser(req.body.userName, req.body.email, req.body.password);
    res.redirect('/home');
}

exports.getSignup=async(req,res,next)=>{
    let language="en";
    if (cookie.parse(req.headers.cookie || '').Language === "ar" )
        language=cookie.parse(req.headers.cookie || '').Language;
     let data=await read(path.join(__dirname, '..', 'dataBase', 'language', `${language}.json`));
     let lang=  JSON.parse(data);
    res.render('signup',{
        err : false,
        lang :lang,
        oldInput :{
            name : '',
            email : '',
            password : '',
            confirmPassword : '',
        }
    });  
}

exports.validateSignup=[
    //TODO check if the email alredy used
  check('email').isEmail().trim().withMessage("Please Enter a valid email"),
  check('password').isLength({ min: 5 }).withMessage(`Password must be 5 characters at least`),
  body('confirmPassword').custom((value, {req})=>{
      if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  body('email').custom(async (email, {req}) =>{
        let info= await userInfo.getUsersInfo(email);
        if(info === undefined )
            return true;
        else
            throw new Error('Email already exists ! ');
    })
]

