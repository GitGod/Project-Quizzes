import React, {useContext, useEffect,useState} from 'react';
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


const Game = ({name}) => {

    const isMobile = useMediaQuery({maxWidth: 800});

    const [gameStatus, setGameStatus] = useState("chooseLevel");
    const [numberOfQuestions, setNumberOfQuestions] = useState(100);
    const [isHard, setLevel] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const {points, setPoints} = useContext(PointsContext);
    const {answers, setAnswers} = useContext(AnswersContext);
    const {correctAnswer, setCorrectAnswer} = useContext(CorrectAnswerContext);
    const {time, setTime} = useContext(TimeContext);
    const {answersPoll, setAnswersPoll} = useContext(AnswersPoll);
    const {leftAnswers, setLeftAnswers} = useContext(LeftAnswers);
    const {numberQuestion, setNumberQuestion} = useContext(NumberQuestion);


    let listOfFlags = flags();
    let listX = setNumbers(answersPoll);



    const reset = () => {
        setPlayerName('');
        setCorrectAnswer([""]);
        setTime(300);
        setPoints(0)
    };

    const startGame = (level) => {
        setGameStatus("started");
        if (level === "hard") {
            setLevel(true)
        }
        setNumberOfQuestions(leftAnswers.length);
        randomNewQuestion(setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers)
    };


    useEffect(() => {
        if (time === 0) {
            setGameStatus("ended")
        }
    }, [time]);
    useEffect(() => {
        if (leftAnswers.length === 0 && numberQuestion > numberOfQuestions && gameStatus === "started") {
            setGameStatus("ended")
        }
    }, [leftAnswers, numberQuestion, numberOfQuestions, gameStatus]);
    const endGame = () => {
        setGameStatus("ended");
    };
    const handleInputChange = (event) => {
        setPlayerName(event.target.value);
    };
    const submitName = () => {
        let timeLeft = 300 - time;
        fetch(`http://localhost:3000/rankings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerName,
                points,
                timeLeft,
                name
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
    };


    return (
        <>
            {gameStatus === "started" ? (
                <div className="mainGameContainer">
                    {!isMobile && <Timer/>}
                    <div className="gameContainer">
                        <Picture
                            srcImg={'https://flagcdn.com/160x120/' + Object.keys(answersPoll).at(correctAnswer) + '.png'}/>
                        {isHard ? (
                            <>
                                <input className="hardGameInput"/>
                            </>
                        ) : (
                            <Answers listOfFlags={answersPoll}/>
                        )}
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
                    <h1>Gratulacje twój wynik wynosi: {points} . Wpisz swoją nazwe</h1>
                    <div className="endGameFields">
                        <input className="nameInput" value={playerName} onChange={handleInputChange}/>
                        <button className="submitName" onClick={() => submitName()}>-></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Game;