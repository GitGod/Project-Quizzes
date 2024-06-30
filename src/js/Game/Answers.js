import React, {useContext, useState} from 'react';
import {getRandomElement, randomAnswers} from "./RandomAnswers";
import {AnswersContext, CorrectAnswerContext, PointsContext} from "../MyContext";


const Answers = ({listOfFlags}) => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const question = "Jakiego kraju to flaga?";
    //const { points, setPoints } = useContext(MyContext);
    const { points, setPoints } = useContext(PointsContext);
    const { answers, setAnswers } = useContext(AnswersContext);
    const { correctAnswer, setCorrectAnswer } = useContext(CorrectAnswerContext);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if(answer === listOfFlags[Object.keys(listOfFlags).at(correctAnswer)]){
            setPoints(points + 1);
        }
        let x = randomAnswers(listOfFlags)
        setAnswers([listOfFlags[Object.keys(listOfFlags).at(x[0])], listOfFlags[Object.keys(listOfFlags).at(x[1])], listOfFlags[Object.keys(listOfFlags).at(x[2])], listOfFlags[Object.keys(listOfFlags).at(x[3])]]);
        setCorrectAnswer(getRandomElement(x));
    };


    return (
        <div className="quiz-container">
            <h2>{question}</h2>
            <div className="answers-container">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(answer)}
                        className="answerButton"
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Answers;