import React, {Component, useState, useEffect, useContext} from "react";
import {createRoot} from "react-dom/client";
import {
    AnswersContext,
    AnswersPoll,
    CorrectAnswerContext,
    LeftAnswers,
    NumberQuestion,
    PointsContext,
    TimeContext
} from "./MyContext";


// STYLES
import '../scss/main.scss';
import Header from "./Header";
import {HashRouter, Route, Routes} from "react-router-dom";
import Ranking from "./Ranking";
import Game from "./Game/Game";
import {flags} from "./Api/Flags";
import Footer from "./Footer";
import MainPage from "./MainPage";


// APP
const App = () => {
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState([""]);
    const [points, setPoints] = useState(0);
    const [time, setTime] = useState(300);
    const [answersPoll, setAnswersPoll] = useState(new Map());
    const [leftAnswers, setLeftAnswers] = useState([]);
    const [numberQuestion, setNumberQuestion] = useState(1);

    return (
        <PointsContext.Provider value={{points, setPoints}}>
            <AnswersContext.Provider value={{answers, setAnswers}}>
                <CorrectAnswerContext.Provider value={{correctAnswer, setCorrectAnswer}}>
                    <TimeContext.Provider value={{time, setTime}}>
                        <AnswersPoll.Provider value={{answersPoll, setAnswersPoll}}>
                            <LeftAnswers.Provider value={{leftAnswers, setLeftAnswers}}>
                                <NumberQuestion.Provider value={{numberQuestion, setNumberQuestion}}>
                                    <HashRouter>
                                        <Header/>
                                        <Routes>
                                            <Route path="/ranking" element={<Ranking/>}/>
                                            <Route path="/" element={<MainPage/>}/>
                                            <Route path="/Flagi" element={<Game name={"Flagi"}/>}/>
                                            <Route path="/FlagiEuropa" element={<Game name={"Flagi Europa"}/>}/>
                                        </Routes>
                                        <Footer/>
                                    </HashRouter>
                                </NumberQuestion.Provider>
                            </LeftAnswers.Provider>
                        </AnswersPoll.Provider>
                    </TimeContext.Provider>
                </CorrectAnswerContext.Provider>
            </AnswersContext.Provider>
        </PointsContext.Provider>
    )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);