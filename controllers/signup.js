const User = require('./../models/user');
const { validationResult } = require('express-validator/check');
const parser=require('body-parser');
const { check,body }=require('express-validator/check');
const userInfo=require('./../models/usersInfo');
const util=require('util');

exports.postSignup = (req, res, next) => {
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
   
    let user = new User();
    user.addUser(req.body.name, req.body.email, req.body.password);
    res.redirect('/home');
}
exports.getSignup=(req,res,next)=>{
    res.render('signup',{
        err : false,
        oldInput :{
            name : '',
            email : '',
            password : '',
            confirmPassword : ''
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

