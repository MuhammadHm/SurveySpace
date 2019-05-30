const fs=require('fs');
const path=require('path');
const survey=require('./survey');

module.exports=class Result{

    constructor(){ }

    async addanswer (survey_id , user_id , answers){
        //Attributes    
        this.answers = answers;
        // readFileResult 
        let path1=path.join(__dirname,'..','dataBase','results',`${survey_id}.json`);
        let answerVisitor=[];
        fs.readFile(path1,(err,content)=>{
            answerVisitor=JSON.parse(content);
            answerVisitor.answer.push(this);
            answerVisitor=JSON.stringify(answerVisitor);
            fs.writeFileSync(path1,answerVisitor);
        });
    }
}