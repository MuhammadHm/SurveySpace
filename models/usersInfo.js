const fs=require('fs');
const path=require('path');
const express=require('express');
const parser=require('body-parser');
const util=require('util');

module.exports =class UserInfo {

    constructor (){
        this.infos=[];
        this.info={
            id : 0,
            email : ''
        };
    }

initFile(){
    this.infos.push(this.info);
    let inf =JSON.stringify(this.infos);
    fs.writeFileSync(path.join(__dirname,'..','dataBase','emails',`usersInfo.json`),inf);
}

    static async getUsersInfo(userEmail) {
        //console.log("email in getUSerinfo", userEmail);
        let read = util.promisify(fs.readFile);
        let data = await read(path.join(__dirname, '..', 'dataBase', 'emails', `usersInfo.json`));
        let infos = JSON.parse(data);
        //console.log("data after await", infos);
        let info = infos.find(val => {
            //   console.log("val find", val);
            return val.email === userEmail
        });
        //console.log("info after find", info);
        return info;
    }
     /*.then(data=>{
     let infos=[];
     infos=JSON.parse(data);
     let info=infos.find(val=>{ return val.email ===userEmail });
     console.log('my email',info);
     cb(info);

 })
 .catch(err=>{console.log(err); });
 */


static getLastID(cb){
    let read=util.promisify(fs.readFile);
    read(path.join(__dirname,'..','dataBase','emails',`usersInfo.json`))
    .then(data=>{
        let infos=[];
        infos=JSON.parse(data);
        //let info=infos.find(val=>{ return val.email === userEmail });
        console.log("this infos",infos);
        cb(infos.length);  
    })
    .catch(err=>{console.log(err);});  
    
}
addUserInfo(userEmail){
    let read=util.promisify(fs.readFile);
    read(path.join(__dirname,'..','dataBase','emails',`usersInfo.json`))
    .then((data)=>{
        this.infos=JSON.parse(data);    
        this.info  ={
            id : (this.infos[this.infos.length-1].id)+1 , // get the last id
            email: userEmail
            }
        this.infos.push(this.info); 
        let inf =JSON.stringify(this.infos);
        fs.writeFileSync(path.join(__dirname,'..','dataBase','emails',`usersInfo.json`),inf);  
    })
    .catch(err=>{console.log(err);});
}
}