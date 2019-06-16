const fs=require('fs');
const path=require('path');
const survey=require('./survey');

module.exports=class Result{

    constructor(){ }

    async addanswer (survey_id , user_id , answers){
        // readFileResult 
        let path1=path.join(__dirname,'..','dataBase','results',`${survey_id}.json`);
        let answerVisitor=[];
        fs.readFile(path1,(err,content)=>{
            answerVisitor=JSON.parse(content);
            answerVisitor.answer.push(answers);
                for (let i=0;i<answers.length;i++)
                    {  if (answers[i].answer != undefined)
                        {   answerVisitor.result[i].count++;
                            if (answers[i].questionType === "textbox" || answers[i].questionType == "essay")
                                answerVisitor.result[i].report.push(answers[i].answer);
                            else if (answers[i].questionType ==="checkbox" || answers[i].questionType ==="mulchoice")  
                            {   
                                answers[i].answer.forEach(element =>{
                                    if(element.checked === true)
                                        answerVisitor.result[i].check[element.body]++; 
                                });
                            }   
                            else if (answers[i].questionType ==="scale")
                                    answerVisitor.result[i].scale+=parseInt(answers[i].answer.value);
                            else if (answers[i].questionType === "date")
                                    answerVisitor.result[i].date.push(answers[i].answer);       
                        }
                    }   
            answerVisitor=JSON.stringify(answerVisitor);
            fs.writeFileSync(path1,answerVisitor);
            });
    }
    
    async  createReport(survey_id){
        let path1=path.join(__dirname,'..','dataBase','results',`${survey_id}.json`);
        let path2=path.join(__dirname,'..','dataBase','survey',`${survey_id}.json`);
        let report ;
        fs.readFile(path1,async (err,data1) =>{
            let r=JSON.parse(data1);
            fs.readFile(path2,(err,data2) =>{
                let s=JSON.parse(data2);
                let path3=path.join(__dirname,'..','dataBase','users',`${s.user_id}.json`);
                fs.readFile(path3,(err,data3)=>{
                    let user=JSON.parse(data3);
                    report="Username is "+user.name+"\n"+"Survey Title is "+s.title+
                    "\n"+"WelcomeMessage  :"+s.welcomeMessage+"\n"+"regDate in :"+s.regDate+"\n";
                    for (let i=0;i<s.questionsArray.length;i++)
                        {   report+=(i+1)+"-question:"+s.questionsArray[i].body+".\n answer : \t";
                        if (r.result[i].count > 0 )
                        {   if (r.result[i].answerType === "textbox" || r.result[i].answerType == "essay")
                                {   let j=1;
                                    r.result[i].report.forEach(element =>{
                                    report+=j+"-"+element+"\n";
                                    j++;
                                });
                                }        
                            else if (r.result[i].answerType ==="checkbox" || r.result[i].answerType ==="mulchoice")  
                            {   s.questionsArray[i].answers.forEach(elements =>{
                                       report+=elements.body+" : "+r.result[i].check[elements.body]+
                                       "   persent      "+((r.result[i].check[elements.body]/r.result[i].count)*100)+"%\n";
                            });    
                            }   
                            else if (r.result[i].answerType ==="scale")
                                     report+= r.result[i].scale/r.result[i].count+"\n";
                            else if (r.result[i].answerType === "date")
                                        r.result[i].date.forEach(elements =>{
                                        report+="day  "+elements.day +"  month  "+elements.month +"  year  "+elements.year+"\n"
                                    });
                        }
                        }
                        report+="End of Report"
                        console.log("m.result.js  "+report);
                });
            });
        });
    }



}