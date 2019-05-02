// imports
const User = require('./../models/user');
const servey = require('./../models/survey');
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

exports.postServey = (req, res, next) => {
    let survey = new servey();
    survey.addSurvey(7,req.body.title,req.body.question,req.body.design);
    res.redirect('/home');
}
exports.getCreate = (req, res, next) => {
    res.render('survey');
}
/*
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
            throw new Error(`Wrong password !`);
        return true;

    }),
    check('password').isLength({ min: 5 }).withMessage(`Password must be 5 characters at least`),
]
*/


