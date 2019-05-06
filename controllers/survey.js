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
    survey.addSurvey(req.session.user.id , req.body.title , req.body.welcomeMessage);
    //after submitting survey details
    res.redirect('http://localhost:3000/createsurvey');
}
exports.getCreate = (req, res, next) => {
    res.render('survey');
}


