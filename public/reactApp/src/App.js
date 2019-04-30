import React,{Component} from 'react';
import './App.css';
import Question from './Survey/Question';
import { whileStatement } from '@babel/types';
//import { Header } from  './Survey/Survey';

class  App extends Component {
  
  state= {
    question : {
      questions: [],
      text : 'my question'

    }
  }

  addQuestionHandler= (text,name)=>{
    console.log('add clicked');
    this.setState({
      question : {
        text : text,
        name : name
      }
    });
  }

  deleteQuestionHandler= (text,name)=>{
    console.log('dalete clicked');
    this.setState({
      question : {
        text : text
      }
    });
  }

  changeText = (event)=>{
    this.setState({
      question : {
        text : event.target.value
      }
    });
  }

  render(){

      const buttonStyle={

         padding: '3px 3px 3px',
        'font-size': '20px'    
      };
      return (
        <div className="App">
          <h1>Survey</h1>
          <div className="Questions">
            <Question text={this.state.question.text}  change={this.changeText} />
            <Question  />

            <button onClick={this.addQuestionHandler.bind(this,"new text","ahmad")} style={buttonStyle}>New Question</button>
            <button onClick={()=>this.deleteQuestionHandler('','')} style={buttonStyle}>Delete Question</button>

          </div>
        </div>
      //React.createElement('div',{className : "App"},React.createElement('h1',null,'Hello'))
    );
  }
}


export default App;
