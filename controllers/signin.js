// imports
const User = require('./../models/user');
const { validationResult } = require('express-validator/check');
const parser = require('body-parser');
const { check, body } = require('express-validator/check');
const userInfo = require('./../models/usersInfo');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const util=require('util');
let info = {};

exports.postLogin = (req, res, next) => {
    // search at emails for a valid email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('signin', {
            err: errors.array()[0],
            oldInput: {
                email: req.body.email,
                password: req.body.password
            }
        });
    }

    req.session.isAuth = true;
    res.status(200).render('home',{ isAuth : true});
}
exports.getLogin = (req, res, next) => {
    res.render('signin', {
        err: false,
        oldInput: {
            email: '',
            password: ''
        }
    });
}
exports.validateLogin = [
    check('email').isEmail().trim().withMessage("Please Enter a valid email"),
    body('email').custom(async (email, { req }) => {
        info = await userInfo.getUsersInfo(email);
        if (info === undefined)
            throw new Error(`Email is not exist ! Sign up insted`);
        else
            return true;
    }),
    body('password').custom(async (password, { req }) => {

        let id = info.id;
        let user={};
        let userpassword;
        let read = util.promisify(fs.readFile);
        let data=await read(path.join(__dirname, '..', 'dataBase', 'users', `${id}.json`));
        user =  JSON.parse(data);
        userpassword= bcrypt.compareSync(password, user.password);
    
        if (! userpassword )
             throw new Error(`Wrong password!`);         
         return true;

    }),
    check('password').isLength({ min: 5 }).withMessage(`Password must be 5 characters at least`),
]



