import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Loading } from './LoadingComponent';
import M from 'materialize-css';
import Score from './ScorePage';
import { Link } from 'react-router-dom';

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: "",
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            userScore: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: {},
            prevButton : false,
            nextButton :true, 
            quizEnd: null
        };
    }

    componentDidMount() {
        const url =
            'https://opentdb.com/api.php?amount=10&category=18&type=multiple';
        fetch(url)
            .then((res) => res.json())
            .then(data => {
                this.setState({
                    questions: data.results,
                    currentQuestion: data.results[this.state.currentQuestionIndex]
                    
                })
                console.log(this.state.questions);
            });

    }

    handleNext=()=>{

        if(this.state.currentQuestionIndex === 9) {
            this.setState({
                currentQuestionIndex : 0
            });
        }
        else {
            this.setState({
                currentQuestionIndex : this.state.currentQuestionIndex + 1,
                currentQuestion : this.state.questions[this.state.currentQuestionIndex]
            });
            
        }
        

    }
    handlePrevious=()=>{
        if(this.state.currentQuestionIndex === 0) {
            this.setState({
                currentQuestionIndex : 9
            });
        }
        else{
            this.setState({
                currentQuestionIndex : this.state.currentQuestionIndex - 1
            });
        }
        
    }
    handleQuit= (e) => {
 alert("Thankyou for playing");
    }
    
    handleAnswer= (e) =>{
        if(e.target.innerHTML === this.state.questions[this.state.currentQuestionIndex].correct_answer){
            this.correctAnswer();
        }
        else{
            this.wrongAnswer();
        }

        console.log(this.state.userScore);
        if(this.state.currentQuestionIndex === 9) {
            this.setState({
                currentQuestionIndex : 0
            });
        }
        else {
            this.setState({
                currentQuestionIndex : this.state.currentQuestionIndex + 1,
                currentQuestion : this.state.questions[this.state.currentQuestionIndex]
            });
            
        }

    }

    correctAnswer = () => {
        M.toast({
            html: "Correct Answer",
            classes: 'toast-valid',
            displayLength:1500
        });
        if(this.state.userScore!== 10){
            this.setState({
                userScore : this.state.userScore + 1,
                correctAnswers : this.state.correctAnswers + 1
            }
            );
        }
       
    }
    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: "Wrong Answer",
            classes: 'toast-invalid',
            displayLength:1000
        });
        this.setState({
            userScore : this.state.userScore,
            wrongAnswers : this.state.wrongAnswers + 1

        });
    }


    render() {
        if (this.state.questions.length>0) {
            let currQuestion = this.state.questions[this.state.currentQuestionIndex];
            console.log(currQuestion);

            const answers = [currQuestion.correct_answer,
            ...currQuestion.incorrect_answers].sort( ()=>
            Math.random() - 0.5);

            
            return (
                <>
                    <Helmet>Mini Quiz-Page</Helmet>

                    <div className="question-div">
                        <h2 align="center">Quiz Mode</h2>
                        <p>
                            <span className="left ml-3">{this.state.currentQuestionIndex + 1 } of 10</span>
                            <span className="right mr-3"><i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>unlimited</span>
                        </p>
                        <div className="question" dangerouslySetInnerHTML={{ __html: currQuestion.question}}>
                        </div>
                        <div className="row">
                            <div onClick = {this.handleAnswer} className="col-12 col-md-6 mx-auto">
                            <div onClick = {this.handleAnswer} className="options">{answers[0]}</div>
                                <div className="options">{answers[1]}</div>
                            </div>
                            <div className="col-12 col-md-6 mx-auto">
                                <div onClick = {this.handleAnswer} className="options">{answers[2]}</div>
                            <div onClick = {this.handleAnswer} className="options">{answers[3]}</div>
                            </div>
                        </div>
                    </div>
                    <Score score={this.state.userScore}/>

                    <div className="button-container">
                        <ButtonWrapper onClick={this.handlePrevious}>Previous</ButtonWrapper>
                        <ButtonWrapper onClick={this.handleNext}>Next</ButtonWrapper>
                        <ButtonWrapper quit onClick={this.handleQuit}>Quit</ButtonWrapper>
                            
                    </div>
                    
                </>
            );
        }

        else {
            return <Loading />      
        }
    }
}

const ButtonWrapper = styled.button`
color: white;
background-color :${props => props.quit ? "#f74343" : "#38ebeb"}; ;
border-color:${props => props.quit ? "#f74343" : "#38ebeb"};
&:hover{
	background:white;
	color:${props => props.quit ? "#f74343" : "#38ebeb"};
}
text-align: center;
border-radius: 2px;
padding: 10px;
margin-left: 20px;
margin-right : 20px;
font-size: 20px;
font-weight: 700;
align-self:left ;
transition: all .75s ease-in-out;
`;


