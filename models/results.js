const fs=require('fs');
const path=require('path');

module.exports=class Result{

    constructor(){ }

    async addResult (survey_id , user_id , answers){
       
        // getting id 
        let files =await fs.readdirSync(path.join(__dirname,'..','dataBase','results'));
        let id = files.length+1;  

        //Attributes    
        this.survey_id=survey_id;
        this.user_id = user_id;
        this.answers = answers;
        this.id = id;
        
        let jsonResult=JSON.stringify(this);
        fs.writeFileSync(path.join(__dirname,'..','dataBase','results',`${this.id}.json`),jsonResult);

    }


}