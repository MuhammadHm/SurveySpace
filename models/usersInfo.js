const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');

exports.getUsersInfo= (userEmail)=>{

    fs.readFile(path.join(__dirname,'..','dataBase','emails',`usersInfo.json`),(err,data)=>{
        let emails=[];
        emails.push(JSON.parse(data));
        console.log(emails);

        if(emails)
        {
            let userInfo=emails.find(val=>{ return val.email === userEmail });
            if(userInfo)
                return userInfo;
            return false;    
        }
    });
    
}
exports.addUserInfo=(userEmail)=>{
    let emails=[];
    fs.readFileSync(path.join(__dirname,'..','dataBase','emails',`emails.json`),(err,data)=>{
        emails=[...data];
        console.log(emails);
        if (emails === undefined || emails.length == 0) {
            let userInfo={
                email: userEmail,
                id : 0  
            }
            emails.push(userInfo);
        }
        else{
            let userInfo={
                email: userEmail,
                id : (emails[emails.length-1].id)+1  // get the last id
            }
            emails.push(userInfo);
        }
    });
    fs.writeFileSync(path.join(__dirname,'..','dataBase','emails',`emails.json`),emails);
}