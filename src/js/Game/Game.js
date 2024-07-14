import React, {useContext, useEffect, useState} from 'react';
import Answers from "./Answers";
import Picture from "./Picture";
import Timer from "./Timer";
import Points from "./Points";

import {flags} from "../Api/Flags";
import {randomNewQuestion, setNumbers} from "./RandomAnswers";
import {
    AnswersContext,
    AnswersPoll,
    CorrectAnswerContext,
    LeftAnswers,
    NumberQuestion,
    PointsContext,
    TimeContext
} from "../MyContext";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";


const Game = ({name}) => {

    const isMobile = useMediaQuery({maxWidth: 800});

    const [gameStatus, setGameStatus] = useState("chooseLevel");
    const [numberOfQuestions, setNumberOfQuestions] = useState(100);
    const [level, setLevel] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const {points, setPoints} = useContext(PointsContext);
    const {answers, setAnswers} = useContext(AnswersContext);
    const {correctAnswer, setCorrectAnswer} = useContext(CorrectAnswerContext);
    const {time, setTime} = useContext(TimeContext);
    const {answersPoll, setAnswersPoll} = useContext(AnswersPoll);
    const {leftAnswers, setLeftAnswers} = useContext(LeftAnswers);
    const {numberQuestion, setNumberQuestion} = useContext(NumberQuestion);
    const [errorMessage, setErrorMessage] = useState('');


    flags();
    setNumbers(answersPoll, name);
    const navigate = useNavigate();


    const goToRanking = () => {
        navigate('/ranking');
    };

    const reset = () => {
        setPlayerName('');
        setCorrectAnswer([""]);
        setTime(300);
        setPoints(0)
        setNumberQuestion(1);
    };

    const startGame = (level) => {
        setGameStatus("started");
        if (name === "Flagi") {
            setTime(599);
        }
        if (level === "hard") {
            setLevel("hard")
        } else if (level === "easy") {
            setLevel("easy")
        }
        setNumberOfQuestions(leftAnswers.length);
        randomNewQuestion(setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers, name)
    };


    useEffect(() => {
        if (time === 0 || (leftAnswers.length === 0 && numberQuestion > numberOfQuestions && gameStatus === "started")) {
            setGameStatus("ended")
        }
    }, [time, leftAnswers, numberQuestion, numberOfQuestions, gameStatus]);
    useEffect(() => {
        reset();
        setGameStatus("chooseLevel")
    }, [name]);

    const endGame = () => {
        setGameStatus("ended");
    };
    const handleInputChange = (event) => {
        setPlayerName(event.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitName();
        }
    };

    const submitName = (event) => {

        if (playerName.length < 3 || playerName.length > 10) {
            setErrorMessage('Nazwa powinna zawierać od 3 do 10 znaków');
        } else {
            setErrorMessage('');
            let timeSpent = 0;
            if (name === "Flagi") {
                timeSpent = 599 - time;
            } else {
                timeSpent = 300 - time;
            }

            fetch(`http://localhost:3000/rankings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerName,
                    points,
                    timeSpent,
                    name,
                    level
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Successfully added:', data);
                    reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            setGameStatus("chooseLevel")
            goToRanking();
        }
    };


    return (
        <div className="container game">
            {gameStatus === "started" ? (
                <div className="mainGameContainer">
                    {!isMobile && <Timer/>}
                    <div className="gameContainer">
                        <Picture
                            srcImg={'https://flagcdn.com/160x120/' + Object.keys(answersPoll).at(correctAnswer) + '.png'}/>

                        <Answers level={level} name={name}/>

                    </div>
                    {isMobile ? (
                        <>
                            <div className="mobileTimer">
                                <Timer/>
                                <Points/>
                            </div>
                            <button className="surrenderButton" onClick={() => endGame()}>Poddaj się</button>
                        </>
                    ) : (
                        <div className="mobileTimer">
                            <Points/>
                            <button className="surrenderButton" onClick={() => endGame()}>Poddaj się</button>
                        </div>
                    )}
                </div>
            ) : gameStatus === "chooseLevel" ? (
                <div className="startQuizContainer">
                    <h1>Witaj w quizie {name}. <br></br> Wybierz poziom aby rozpocząć</h1>
                    <div className="startGameButtons">
                        <button className="easyButton" onClick={() => startGame("easy")}>Łatwy</button>
                        <button className="hardButton" onClick={() => startGame("hard")}>Trudny</button>
                    </div>
                </div>


            ) : (
                <div className="endGame">
                    <h1>Gratulacje twój wynik wynosi: {points} . Wpisz swoją nazwe:</h1>
                    <div className="endGameFields">
                        <input className="nameInput" value={playerName} onChange={handleInputChange}
                               onKeyDown={handleKeyDown}/>
                        <button className="submitName" onClick={(e) => submitName(e)}>-></button>
                    </div>
                    {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default Game;