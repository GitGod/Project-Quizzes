import React, {useContext, useEffect, useState} from 'react';
import {deleteNumber,randomNewQuestion} from "./RandomAnswers";
import {
    AnswersContext,
    AnswersPoll,
    CorrectAnswerContext,
    LeftAnswers,
    NumberQuestion,
    PointsContext
} from "../MyContext";


const Answers = ({listOfFlags}) => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const {numberQuestion, setNumberQuestion} = useContext(NumberQuestion)
    const question = numberQuestion + " Jakiego kraju to flaga?";
    const {points, setPoints} = useContext(PointsContext);
    const {answers, setAnswers} = useContext(AnswersContext);
    const {correctAnswer, setCorrectAnswer} = useContext(CorrectAnswerContext);
    const {answersPoll, setAnswersPoll} = useContext(AnswersPoll);
    const {leftAnswers, setLeftAnswers} = useContext(LeftAnswers);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer === answersPoll[Object.keys(answersPoll).at(correctAnswer)]) {
            setPoints(points + 1);
        }
        setNumberQuestion(numberQuestion + 1);
        console.log(leftAnswers)
        randomNewQuestion(setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers)

    };
    useEffect(() => {
        deleteNumber(leftAnswers, setLeftAnswers, correctAnswer);
        console.log(`Count has changed to: ${correctAnswer}`);
    }, [correctAnswer]);

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