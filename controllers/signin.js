// imports
const User = require('./../models/user');
const { validationResult } = require('express-validator/check');
const parser=require('body-parser');


exports.login = (req, res, next) => {
    //must search at emails for a valid email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
       
        return res.status(422).render('signin', {
            err: errors.array()[0],
            oldInput:{
                email : req.body.email,
                password : req.body.password
            }  
        });
    }
    res.redirect('/home');
};

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('signup', {
            err: errors.array()[0],
            oldInput:{
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword
            }  
        });
    }
   
    let user = new User(10);
    user.addUser(req.body.name, req.body.email, req.body.password);
    res.redirect('/home');
};