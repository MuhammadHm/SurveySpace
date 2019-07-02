const fs=require('fs');
const path=require('path');
const util=require('util');
module.exports=class question{
    
    constructor(){
        this.id = null;
        this.content = null;
        this.isRequired=false;
        this.design=null;
        this.answerType=null;
        this.answer=null;
    }
    createQuestion(id ,content , desgin ,answerType , answer ){
        //let d=new Date();
        this.id=id;
        this.content=content;
        this.answerType=answerType;
        this.design=desgin;
        this.answer=answer;

    }

};
