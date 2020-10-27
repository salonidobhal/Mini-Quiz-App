import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Loading } from './LoadingComponent';
import M from 'materialize-css';
import Score from './ScorePage';
import correctNotification from '../assets/audio/correct-answer.mp3';
import wrongNotification from '../assets/audio/wrong-answer.mp3';
import buttonSound from '../assets/audio/button-sound.mp3';

export default class Quiz extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: {},
            answer: null,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            userScore: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: {},
            previousButtonDisabled: true,
            nextButtonDisabled: false,
            quit: false
        };
        this.interval = null;
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
            })
            .then(this.startTimer());

    }

    handleNext = () => {
        document.getElementById('button-sound').play();

        if (this.state.currentQuestionIndex === 8) {
            this.setState({
                nextButtonDisabled: true,
                currentQuestionIndex: 9
            });
        }
        else {
            this.setState({
                previousButtonDisabled: false,
                currentQuestionIndex: this.state.currentQuestionIndex + 1,
                currentQuestion: this.state.questions[this.state.currentQuestionIndex]
            });

        }
    }
    handlePrevious = () => {
        document.getElementById('button-sound').play();

        if (this.state.currentQuestionIndex === 1) {
            this.setState({
                previousButtonDisabled: true,
                currentQuestionIndex: 0
            });
        }
        else {
            this.setState({
                nextButtonDisabled: false,
                previousButtonDisabled: false,
                currentQuestionIndex: this.state.currentQuestionIndex - 1
            });
        }

    }
    handleQuit = () => {
        this.setState({
            previousButtonDisabled: true,
            nextButtonDisabled: true,
            quit: true
        })
        this.stopTimer();
        document.getElementById('button-sound').play();
        alert("Thankyou for playing");

    }

    handleAnswer = (e) => {
        if (e.target.innerHTML === this.state.questions[this.state.currentQuestionIndex].correct_answer) {
            setTimeout(() => {
                document.getElementById('correct-sound').play();

            }, 250);
            this.correctAnswer();
        }
        else {
            setTimeout(() => {
                document.getElementById('wrong-sound').play();

            }, 250);
            this.wrongAnswer();
        }

        console.log(this.state.userScore);
        if (this.state.currentQuestionIndex === 8) {
            this.setState({
                nextButtonDisabled: true,
                currentQuestionIndex: 9
            });
        }
        else {
            this.setState({
                previousButtonDisabled: false,
                currentQuestionIndex: this.state.currentQuestionIndex + 1,
                currentQuestion: this.state.questions[this.state.currentQuestionIndex]
            });

        }

    }

    correctAnswer = () => {
        M.toast({
            html: "Correct Answer",
            classes: 'toast-valid',
            displayLength: 1000
        });
        if (this.state.userScore !== 10) {
            this.setState({
                userScore: this.state.userScore + 1,
                correctAnswers: this.state.correctAnswers + 1
            }
            );
        }

    }

    wrongAnswer = () => {
        navigator.vibrate(500);
        M.toast({
            html: "Wrong Answer",
            classes: 'toast-invalid',
            displayLength: 1000
        });
        this.setState({
            userScore: this.state.userScore,
            wrongAnswers: this.state.wrongAnswers + 1

        });
    }

    startTimer = () => {
        const countDownTime = Date.now() + 100000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / (1000));

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    },
                    nextButtonDisabled: true,
                    previousButtonDisabled: true
                }, () => {

                    alert("Quiz has ended!");
                });
            }
            else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                });
            }
        }, 1000);
    }

    stopTimer = () => {
        clearInterval(this.interval);
        this.setState({
            time : {
                minutes: 0,
                seconds: 0
            }
        })

    }

    /*shuffleQuestions = () => {
        console.log("inside shufflequestions");
        if (this.state.questions.length > 0) {
            let currQuestion = this.state.questions[this.state.currentQuestionIndex];
            console.log(currQuestion);

            const answers = [currQuestion.correct_answer,
            ...currQuestion.incorrect_answers].sort(() =>
                Math.random() - 0.5);
                console.log("shuffled questions");
                this.setState({
                    answer : answers
                });
                console.log("state set");
                console.log(this.state.answer);
        }
    }*/


    render() {
        if (this.state.questions.length > 0) {
            let currQuestion = this.state.questions[this.state.currentQuestionIndex];
           console.log(currQuestion);

            const answers = [currQuestion.correct_answer,
            ...currQuestion.incorrect_answers].sort(() =>
                Math.random() - 0.5);


            return (
                <>
                    <Helmet>Mini Quiz - Page</Helmet>
                    <React.Fragment>
                        <audio id="correct-sound"  src={correctNotification} />
                        <audio id="wrong-sound"  src={wrongNotification} />
                        <audio id="button-sound"  src={buttonSound} />
                    </React.Fragment>

                    <div className="question-div">
                        <h2 align="center">Quiz Mode</h2>
                        <p>
                            <span className="left ml-3">{this.state.currentQuestionIndex + 1} of 10</span>
                            <span className="right mr-3"><i className="fa fa-clock-o fa-lg" aria-hidden="true"></i>{this.state.time.minutes}:{this.state.time.seconds}</span>
                        </p>
                        <div className="question" dangerouslySetInnerHTML={{ __html: currQuestion.question }}>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 mx-auto">
                                <div onClick={this.handleAnswer} className='{{this.state.quit ? "disable" : ""}} options'>{answers[0]}</div>
                                <div onClick={this.handleAnswer} className='{{"disable" : this.state.quit}} options'>{answers[1]}</div>
                            </div>
                            <div className="col-12 col-md-6 mx-auto">
                                <div onClick={this.handleAnswer} className='{{"disable" : this.state.quit}} options'>{answers[2]}</div>
                                <div onClick={this.handleAnswer} className='{{"disable" : this.state.quit}} options'>{answers[3]}</div>
                            </div>
                        </div>
                    </div>
                    <Score score={this.state.userScore} />
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-3 mx-auto">
                            <ButtonWrapper disabled={this.state.previousButtonDisabled} onClick={this.handlePrevious}>Previous</ButtonWrapper>
                        </div>
                        <div className="col-12 col-md-3 mx-auto">
                            <ButtonWrapper disabled={this.state.nextButtonDisabled} onClick={this.handleNext}>Next</ButtonWrapper>    </div>
                        <div className="col-12 col-md-3 mx-auto">
                            <ButtonWrapper quit onClick={this.handleQuit}>Quit</ButtonWrapper>
                        </div>
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
background-color :${props => props.quit ? "#f74343" : "#38ebeb"};
border-color:${props => props.quit ? "#f74343" : "#38ebeb"};
&:hover{
	background:white;
	color:${props => props.quit ? "#f74343" : "#38ebeb"};
}
text-align: center;
border-radius: 2px;
margin-bottom : 4px;
padding: 10px;
font-size: 20px;
width : 100%;
pointer-events :${props => props.disabled ? "none" : ""};
font-weight: 700;
align-self:center ;
transition: all .75s ease-in-out;
background-color :${props => props.disabled ? "#ccc" : ""};
border-color:${props => props.disabled ? "#ccc" : ""};
`;


