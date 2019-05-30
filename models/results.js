const fs=require('fs');
const path=require('path');
const survey=require('./survey');

module.exports=class Result{

    constructor(){ }

    async addanswer (survey_id , user_id , answers){
        //Attributes    
        this.answers = answers;
        console.log("12",answers.answer);
        // readFileResult 
        let path1=path.join(__dirname,'..','dataBase','results',`${survey_id}.json`);
        let answerVisitor=[];
        fs.readFile(path1,async(err,content)=>{
            answerVisitor=JSON.parse(content);
            answerVisitor.answer.push(this);
                for (let i=0;i<answers.lenght();i++)
                    {  if (answers[i].answer != undefined)
                        {   answerVisitor.result[i].count++;
                            if (answers[i].questionType === "textbox" || answers[i].questionType == "essay")
                            answerVisitor.result[i].report.push(answers.answer);
                            else if (answers[i].questionType ==="checkbox" || answers[i].questionType ==="mulchoice")  
                          {   oneresult.check ={};
                              answers[i].answer.forEach(element =>{
                                if(element.checked === true)
                                answerVisitor.result[i].check[element.body]++; 
                          });
                          }   
                      else if (answers[i].questionType ==="scale")
                            answerVisitor.result[i].scale+=answers[i].answer;
                      else if (answers[i].questionType === "date")
                            answerVisitor.result[i].date.push(answer);       
                        }
                    }   
                    console.log(answerVisitor);
            answerVisitor=JSON.stringify(answerVisitor);
            await fs.writeFileSync(path1,answerVisitor);
            });
    }

    



}