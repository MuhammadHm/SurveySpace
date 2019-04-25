// imports
const User = require('./../models/user');
const { validationResult } = require('express-validator/check');
const parser=require('body-parser');
const { check,body }=require('express-validator/check');
const userInfo=require('./../models/usersInfo');
const session=require('express-session');


exports.postLogin = (req, res, next) => {
    // search at emails for a valid email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('signin', {
            err: errors.array()[0],
            oldInput:{
                email : req.body.email,
                password : req.body.password
            }  
        });
    }
    req.session.isAuth=true;
    res.redirect('/home');
}

exports.getLogin=(req,res,next)=>{
    res.render('signin',{
        err : false,
        oldInput : {
            email : '',
            password: ''
        }
        });
}

exports.validateLogin=[
    check('email').isEmail().trim().withMessage("Please Enter a valid email"),
    body('email').custom((value, {req})=>{
        if (!userInfo.getUsersInfo(value)) {
            throw new Error('Email is not exist , Sign up Insted!');
        }
        return true;
    }),
    check('password').isLength({ min: 5 }).withMessage(`Password must be 5 characters at least`),
    
]



