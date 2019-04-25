const fs=require('fs');
const path=require('path');
const bcrypt=require('bcrypt');
const userInfo=require('./usersInfo');
const util=require('util');
module.exports=class User{

    constructor(){ }
    addUser(name,email,password){
        let d=new Date();
        this.name=name;
        this.email=email;
        this.password=bcrypt.hashSync(password,12);
        this.regDate= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate() +" "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        let userInf=new userInfo();
        userInf.addUserInfo(email); 
        userInfo.getLastID(id=>{
            let jsonUser=JSON.stringify(this);
            fs.writeFileSync(path.join(__dirname,'..','dataBase','users',`${id}.json`),jsonUser);
        });
    }
    
    static editeUser(id,nName,nEmail,nPassword){
        let path1=path.join(__dirname,'..','dataBase','users',`${id}.json`);
        let user;
        fs.readFile(path1,(err,content)=>{
            user=content;
            user.name=nName;
            user.email=nEmail;
            user.password=nPassword;
            user.regDate=Date.now();
        }).then(() => {
            user=JSON.stringify(user);
            fs.writeFileSync(path.join(__dirname,'..','dataBase','users',`${id}.json`),user);
        });

    }
    static removeUser(id){
        let path1=path.join(__dirname,'..','dataBase','users',`${id}.json`);
        fs.unlink(path1,err => {
            console.log(`${id} deleted`);
        });
    }
   

};