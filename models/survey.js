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
        //add ID survey to userinfo
        user.addSurvey(user_id,this.id,this.title);
        
        let jsonSurvey=JSON.stringify(this);
        console.log("writing survey whith id " ,this.id);
        
        //create file for rueslt survey
        let jsonAnswer=JSON.stringify(answervisitor);
        console.log(jsonAnswer);
        await fs.writeFileSync(path.join(__dirname,'..','dataBase','results',`${this.id}.json`),jsonAnswer);

       

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

    async createresultfile(){
        let result=[];
         this.questionsArray.forEach( element  =>  {
            let oneresult ={};
            oneresult.answerType=element.answerType;
            oneresult.count=0;
            console.log(element);
            if (element.answerType === "textbox" || element.answerType == "essay")
                  oneresult.report=[];  
            else if (element.answerType ==="checkbox" || element.answerType ==="mulchoice")  
                {   oneresult.check ={};
                    element.answers.forEach(elements =>{
                        console.log("first");
                    oneresult.check [elements.body]=0;
                    });
                }   
            else if (element.answerType ==="scale")
                    oneresult.scale=0;
            else if (element.answerType === "date")
                    oneresult.date =[]; 
            result.push(oneresult); 
        });
        console.log("survey.js models result", result);
        // readFileResult 
        let path1=path.join(__dirname,'..','dataBase','results',`${this.id}.json`);
        let answerVisitor={
            result :result,
            answer:[]
        };
        let answerVisitors=JSON.stringify(answerVisitor);
        console.log( "2",answerVisitors);

       await fs.writeFileSync(path1,answerVisitor);
           
    }
};