import React from 'react';
import "./Question.css";

const question=(props)=>{

    return(
        <div className="question">
            <p>{props.text}</p>
            <div className="question-text">
               <span>Question : </span> 
               
               <input type="text" placeholder="your question" onChange={props.change}></input>
               <span>{props.children}</span>
               <input type="checkbox" value="Required"/>Required
               
               </div>
           
        </div>
    );

}
export default question;
/*
exports.header=()=>{
    return(
        <div>
            <ul>
                <li>Questions</li>
                <li>Design </li>
            </ul>
        </div>
    );
}*/