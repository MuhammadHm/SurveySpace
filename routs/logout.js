// Core Imports
const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');
const session=require('express-session');
const bcrypt=require('bcrypt');
const rout=express.Router();
const util=require('util');
const logout = require('../controllers/logout')

// handle '/logout'

rout.use('/deleteaccount',logout.deleteAccount);

rout.use('/',logout.logout);


module.exports = rout;