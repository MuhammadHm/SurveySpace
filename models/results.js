const fs=require('fs');
const path=require('path');
const survey=require('./survey');

module.exports=class Result{

    constructor(){ }

    async addanswer (survey_id , user_id , answers){
        console.log(answers);
        // readFileResult 
        let path1=path.join(__dirname,'..','dataBase','results',`${survey_id}.json`);
        let answerVisitor=[];
        fs.readFile(path1,(err,content)=>{
            answerVisitor=JSON.parse(content);
            answerVisitor.answer.push(answers);
                for (let i=0;i<answers.length;i++)
                    {  if (answers[i].answer != undefined)
                        {   
                            answerVisitor.result[i].count++;
                            if (answers[i].questionType === "textbox" || answers[i].questionType == "essay" && answerVisitor.result[i].report !=undefined )
                                answerVisitor.result[i].report.push(answers[i].answer);
                            else if (answers[i].questionType ==="checkbox" || answers[i].questionType ==="mulchoice")  
                            {   
                                for (let j=0;j<answers[i].answer.length;j++)
                                {
                                    if(answers[i].answer[j].checked === true)
                                        answerVisitor.result[i].check[j].count++; 
                                }
                            }   
                            else if (answers[i].questionType ==="scale")
                                    answerVisitor.result[i].scale+=parseInt(answers[i].answer.value);
                            else if (answers[i].questionType === "date")
                                    answerVisitor.result[i].date.push(answers[i].answer);       
                        }
                    }   
                    console.log(answerVisitor);
            answerVisitor=JSON.stringify(answerVisitor);
            fs.writeFileSync(path1,answerVisitor);
            });
    }   
    static async createReport(survey_id){
        let path1=path.join(__dirname,'..','dataBase','results',`${survey_id}.json`);
        let path2=path.join(__dirname,'..','dataBase','survey',`${survey_id}.json`);
        let report ={};
        let data1= fs.readFileSync(path1)
        let r=JSON.parse(data1);
        let data2= fs.readFileSync(path2)
        let s=JSON.parse(data2);
        let path3=path.join(__dirname,'..','dataBase','users',`${s.user_id}.json`);
        let data3 = fs.readFileSync(path3);
        let user=JSON.parse(data3);
        report.username=user.name;
        report.user_id=s.user_id;
        report.title=s.title;
        report.WeMe=s.welcomeMessage;
        report.regDate=s.regDate;
        report.result=r.result;
        report.answer=r.answer;
        //console.log(report);
        
        return report;
    }



}