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
        let answervisitor=[];
        //this.ansVisitor_id=[];
        this.createresultfile();
        
        //user.addSurvey(user_id,this.id,this.title,this.welcomeMessage);
        let jsonSurvey=JSON.stringify(this);
        await fs.writeFileSync(path.join(__dirname,'..','dataBase','survey',`${this.id}.json`),jsonSurvey);
        
    }
    async saveAsTemplate(survey_id , user_id , title , welcomeMessage ,questionsArray){
        let d=new Date();
        this.user_id=user_id;        
        this.title=title;
        this.welcomeMessage=welcomeMessage;
        this.regDate= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate() +" "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        this.questionsArray=questionsArray;

        let files =await fs.readdirSync(path.join(__dirname,'..','dataBase','templates'))
        let id=files.length+1; 
        this.id=id;

        user.addTemplate(user_id,this.id,this.title,this.welcomeMessage);
        
        let jsonSurvey=JSON.stringify(this);
        
        await fs.writeFileSync(path.join(__dirname,'..','dataBase','templates',`${this.id}.json`),jsonSurvey);
      
    }
    static async editSurvey(survey_id ,user_id ,title ,welcomeMessage,questionsArray){
        let path1=path.join(__dirname,'..','dataBase','survey',`${survey_id}.json`);
        let read=util.promisify(fs.readFile);    
        let survey =await read(path1);
        survey=JSON.parse(survey);
        
        let d=new Date();
        survey.user_id=user_id;
        survey.id=survey_id;   
        survey.title=title;
        survey.welcomeMessage=welcomeMessage;
        survey.regDate= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate() +" "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        survey.questionsArray=questionsArray;
        //TODO add create result file
        let jsonSurvey=JSON.stringify(survey);
        await fs.writeFileSync(path.join(__dirname,'..','dataBase','survey',`${survey_id}.json`),jsonSurvey);

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
        return info;
    }
    async createresultfile(){
        let result=[];
         this.questionsArray.forEach( element  =>  {
            let oneresult ={};
            oneresult.questionbody=element.body;
            oneresult.answerType=element.answerType;
            oneresult.count=0;
            if (element.answerType === "textbox" || element.answerType == "essay")
                  oneresult.report=[];  
            else if (element.answerType ==="checkbox" || element.answerType ==="mulchoice")  
                {   oneresult.check ={};
                    element.answers.forEach(elements =>{
                    oneresult.check [elements.body]=0;
                    });
                }   
            else if (element.answerType ==="scale")
                    oneresult.scale=0;
            else if (element.answerType === "date")
                    oneresult.date =[]; 
            result.push(oneresult); 
        });
        // writeFileResult 
        let path1=path.join(__dirname,'..','dataBase','results',`${this.id}.json`);
        let answerVisitor={
            result :result,
            answer:[]
        };        
        answerVisitor=JSON.stringify(answerVisitor);
        fs.writeFileSync(path1,answerVisitor);
           
    }
};