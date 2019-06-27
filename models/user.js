const fs=require('fs');
const path=require('path');
const bcrypt=require('bcrypt');
const userInfo=require('./usersInfo');
const util=require('util');
const cookie = require('cookie');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey'); 
module.exports=class User{

    constructor(){ }
    async addUser(name,email,password){
        let d=new Date();
        this.name=name;
        console.log("name in user.js",this.name);
        this.email=email;
        this.password=bcrypt.hashSync(password,12);
        this.regDate= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate() +" "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        this.surveys=[];
        this.templates=[];
     
        let userInf=new userInfo();
        userInf.addUserInfo(email); 
    
        await fs.readdir(path.join(__dirname,'..','dataBase','users'), (err, files) => {
            let id=files[files.length-1];  //must be files.length-1
            if (id !== undefined)
                {   id =id.split('.');
                    id= parseInt(id)+1;
                }
            else
                id =1;
            this.id=id;
            console.log("name in user.js",this);
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
    static async deleteUser(id){
        //deleting file
        let path1=path.join(__dirname,'..','dataBase','users',`${id}.json`);
        fs.unlink(path1);
        //delete from usersInfo file
        let read = util.promisify(fs.readFile);
        let data = await read(path.join(__dirname,'..','dataBase','emails','usersInfo.json'));
        let info = JSON.parse(data);
        for(let i = info.length - 1; i >= 0; i--) {
            if(info[i].id === id) {
               info.splice(i, 1);
            }
        }   
        let json=JSON.stringify(info);
        await fs.writeFileSync(path.join(__dirname,'..','dataBase','emails','usersInfo.json'),json);  
    }  
    static addSurvey(id_admin,id_survey,titleSurvey,welcomeMessage){
        let path1=path.join(__dirname,'..','dataBase','users',`${id_admin}.json`);
        let read=util.promisify(fs.readFile);
        let user;
        let array ={id :id_survey,title :titleSurvey , welcomeMessage : welcomeMessage }; 
        read(path1)
            .then((data)=>{
                user=JSON.parse(data);
                user.surveys.push(array);
                user=JSON.stringify(user);
                fs.writeFileSync(path.join(__dirname,'..','dataBase','users',`${id_admin}.json`),user);
            })
            .catch(err=>{console.log(err);});
    }
    static async getLastSurvey(){
        
        let files =await fs.readdirSync(path.join(__dirname,'..','dataBase','users'))
        let id=files.length; 


        let read=util.promisify(fs.readFile);    
        let user =await read(path.join(__dirname,'..','dataBase','users',`${id}.json`));
        user=JSON.parse(user);

        let surveyInfo=user.surveys[user.surveys.length-1]
        
        return {id ,surveyInfo};
           
    }
    static addTemplate(id_admin,id_template,titleSurvey,welcomeMessage){
        let path1=path.join(__dirname,'..','dataBase','users',`${id_admin}.json`);
        let read=util.promisify(fs.readFile);
        let user;
        let template = {id : id_template,title : titleSurvey , welcomeMessage : welcomeMessage }; 
        read(path1)
            .then((data)=>{
                user=JSON.parse(data);
                user.templates.push(template);
                user=JSON.stringify(user);
                fs.writeFileSync(path.join(__dirname,'..','dataBase','users',`${id_admin}.json`),user);
            })
            .catch(err=>{console.log(err);});
    }
    static async IsAuthUser(req,res){
       if (req.session.user === undefined && cookie.parse(req.headers.cookie || '').user !== undefined )
            {
                let id =cryptr.decrypt(cookie.parse(req.headers.cookie || '').user);
                let read = util.promisify(fs.readFile);
                let data=await read(path.join(__dirname, '..', 'dataBase', 'users', `${id}.json`));
                let user=JSON.parse(data);
                // user is Authenticated
                req.session.isAuth = true;
                req.session.user=user;
                res.cookie("user",cryptr.encrypt(id),{maxAge :2592000000});
             }

    }
    
};