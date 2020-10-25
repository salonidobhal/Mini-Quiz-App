import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';


const Home = () => (
    <React.Fragment>
        <Helmet><title>Mini Quiz - Home</title></Helmet>
        <div id="home">
            <div className="text">
            Take this short <br/>QUIZ <br/> on Computers
            </div>            
            <div className="play-button-container">
                <ButtonWrapper>
                    <Link className="link" to='/quiz'>Start quiz</Link>
                </ButtonWrapper>

            </div>
        </div>

    </React.Fragment>
);
export default Home;

const ButtonWrapper = styled.div`
background-color : ;
border: 4px solid white;
text-align: center;
margin-top: 7em;
margin-left: 10rem;
width:27%;
padding: 15px 5px 0px 5px;
height: 80px;
border-radius: 40px;
font-size: 20px;
font-weight: 700;
align-self:left ;
transition: all .75s ease-in-out;
&:hover{
    transform: scale(1.05);
}
`;


