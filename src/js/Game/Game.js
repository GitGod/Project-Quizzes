import React, {useContext, useEffect, useRef, useState} from 'react';
import Answers from "./Answers";
import Picture from "./Picture";
import Timer from "./Timer";
import Points from "./Points";
import timer from "./Timer";
import {flags} from "../Api/Flags";
import {getRandomElement, randomAnswers} from "./RandomAnswers";
import {AnswersContext, CorrectAnswerContext, PointsContext,TimeContext} from "../MyContext";
import {useMediaQuery} from "react-responsive";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {fetchResp} from "../Api/utils";

const Game = ({name}) => {

    const isMobile = useMediaQuery({maxWidth: 800});
    //let gameStatus = false;
    const [gameStatus, setGameStatus] = useState("chooseLevel");
    const [isHard, setLevel] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [image, setImage] = useState([""]);
    const [correctAnswer, setCorrectAnswer] = useState([""]);
    const [points, setPoints] = useState(0);
    const [time, setTime] = useState(300);
    const [playerName, setPlayerName] = useState('');

    // let element=0;
    let listOfFlags = flags();
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
        let x = randomAnswers(listOfFlags)
        setAnswers([listOfFlags[Object.keys(listOfFlags).at(x[0])], listOfFlags[Object.keys(listOfFlags).at(x[1])], listOfFlags[Object.keys(listOfFlags).at(x[2])], listOfFlags[Object.keys(listOfFlags).at(x[3])]]);
        setCorrectAnswer(getRandomElement(x));
    };

    useEffect(() => {
        if(time === 0){
           setGameStatus("ended")
        }
    }, [time]);
    const endGame = () => {
        //handleOpen()
        setGameStatus("ended");
    };
    const handleInputChange = (event) => {
        setPlayerName(event.target.value);
    };
    const submitName = () => {
       let timeLeft = 300 - time;
      //  let inputName = document.querySelector(".nameInput").value();
            fetch(`http://localhost:3000/rankings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ playerName,
                    points,
                    timeLeft,
                    name })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Successfully added:', data);
                    reset(); // Reset input field after successful submission
                })
                .catch(error => {
                    console.error('Error:', error);
                });

           // .then((ranking) => saveRanking(ranking))
           // .catch((err) => console.log(err));
        setGameStatus("chooseLevel")
    };






    return (
        <>
            <PointsContext.Provider value={{points, setPoints}}>
                <AnswersContext.Provider value={{answers, setAnswers}}>
                    <CorrectAnswerContext.Provider value={{correctAnswer, setCorrectAnswer}}>
                        <TimeContext.Provider value={{time, setTime}}>

                            {gameStatus === "started" ? (
                                <div className="mainGameContainer">
                                    {!isMobile && <Timer/>}
                                    <div className="gameContainer">
                                        <Picture
                                            srcImg={'https://flagcdn.com/160x120/' + Object.keys(listOfFlags).at(correctAnswer) + '.png'}/>
                                        {isHard ? (
                                            <>
                                                <input className="hardGameInput"/>
                                            </>
                                        ) : (
                                            <Answers listOfFlags={listOfFlags}/>
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
                                    <div className="startGameButtons">
                                        <input className="nameInput"  value={playerName}   onChange={handleInputChange}/>
                                        <button className="submitName" onClick={() => submitName()}>-></button>
                                    </div>
                                </div>
                            )}
                        </TimeContext.Provider>
                    </CorrectAnswerContext.Provider>
                </AnswersContext.Provider>
            </PointsContext.Provider>
        </>


    );
};

export default Game;