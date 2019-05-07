const fs=require('fs');
const path=require('path');
const user=require('./user');
const util=require('util');
module.exports=class Survey{

    constructor(){ }
     async addSurvey (id_admin , title , welcomeMessage ){
        let d=new Date();
        this.id_admin=id_admin;
        this.title=title;
        this.welcomeMessage=welcomeMessage;
        this.regDate= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate() +" "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        await fs.readdir(path.join(__dirname,'..','dataBase','survey'), (err, files) => {
            let id=files[files.length-1];  //must be files.length-1
            //console.log('2in syrvey.js',id[0]);
            if (id !== undefined)
                {   id =id.split('.');
                    id= parseInt(id)+1;
                }
            else
                id =1;
            this.id=id;    
            user.addSurvey(id_admin,id,this.title);
            console.log(this);
            let jsonSurvey=JSON.stringify(this);
            fs.writeFileSync(path.join(__dirname,'..','dataBase','survey',`${id}.json`),jsonSurvey);
        });
    }

    static editeSurvey(id,title ,question ,desgin ){
        let path1=path.join(__dirname,'..','dataBase','survey',`${id}.json`);
        let survey;
        fs.readFile(path1,(err,content)=>{
            survey=JSON.parse(content);
            survey.title=title;
            survey.question=question;
            survey.desgin=desgin;
            survey.regDate=Date.now();
        }).then(() => {
            survey=JSON.stringify(survey);
            fs.writeFileSync(path.join(__dirname,'..','dataBase','survey',`${id}.json`),survey);
        });

    }

    static removeSurvey(id) {
        let path1 = path.join(__dirname, '..', 'dataBase', 'survey', `${id}.json`);
        let survey;
        fs.readFile(path1, (err, content) => {
            survey=JSON.parse(content);
        }).then(() => {
            userInfo.deleteSurvey(survey.id_admin, id);
            fs.unlink(path1, err => {
                console.log(`${id} deleted`);
            });
        });
    }

    static async getSurveyInfo(id) {

        let read = util.promisify(fs.readFile);
        let data = await read(path.join(__dirname, '..', 'dataBase', 'survey', id));
        let info = JSON.parse(data);
        //console.log("info after find", info);
        return info;
    }
};