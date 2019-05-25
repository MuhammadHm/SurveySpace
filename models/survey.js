const fs=require('fs');
const path=require('path');
const user=require('./user');
const util=require('util');
module.exports=class Survey{

    constructor(){ }
    async addSurvey (survey_id , user_id , title , welcomeMessage ,questionsArray){
        let d=new Date();
        this.user_id=user_id;
        this.id=survey_id;   
        this.title=title;
        this.welcomeMessage=welcomeMessage;
        this.regDate= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate() +" "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        this.questionsArray=questionsArray;
        
        user.addSurvey(user_id,this.id,this.title);
        let jsonSurvey=JSON.stringify(this);
        console.log("writing survey whith id " ,this.id);

        await fs.writeFileSync(path.join(__dirname,'..','dataBase','survey',`${this.id}.json`),jsonSurvey);
        
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