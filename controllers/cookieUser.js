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


exports.getUser=async (req)=>{
    let cookies=req.get("Cookie").trim().split(";");
    let user_id;
    for(let i=0;i<cookies.length;i++){
        if(cookies[i].trim().split('=')[0] =='user')
             user_id=cryptr.decrypt(cookies[i].trim().split('=')[1])
    }
 
    let read = util.promisify(fs.readFile);
    let data = await read(path.join(__dirname, '..', 'dataBase', 'users', `${user_id}.json`));
    let user = JSON.parse(data);
    return user;
}
exports.getUserID=async (req)=>{
    let cookies=req.get("Cookie").trim().split(";");
    let user_id;
    for(let i=0;i<cookies.length;i++){
        if(cookies[i].trim().split('=')[0] =='user')
             user_id=cryptr.decrypt(cookies[i].trim().split('=')[1])
    }
    return user_id;
}
exports.getLanguage=async (req)=>{
    let cookies=req.get("Cookie").trim().split(";");
    let lang;
    for(let i=0;i<cookies.length;i++){
        if(cookies[i].trim().split('=')[0] =='Language')
             lang=cookies[i].trim().split('=')[1];
    }
    return lang;
}