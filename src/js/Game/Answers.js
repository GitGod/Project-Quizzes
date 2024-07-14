import React, {useContext, useEffect, useState} from 'react';
import {deleteNumber, randomNewQuestion} from "./RandomAnswers";
import {
    AnswersContext,
    AnswersPoll,
    CorrectAnswerContext,
    LeftAnswers,
    NumberQuestion,
    PointsContext
} from "../MyContext";


const Answers = ({level, name}) => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const {numberQuestion, setNumberQuestion} = useContext(NumberQuestion)
    const question = numberQuestion + ". Czego to flaga?";
    const {points, setPoints} = useContext(PointsContext);
    const {answers, setAnswers} = useContext(AnswersContext);
    const {correctAnswer, setCorrectAnswer} = useContext(CorrectAnswerContext);
    const {answersPoll, setAnswersPoll} = useContext(AnswersPoll);
    const {leftAnswers, setLeftAnswers} = useContext(LeftAnswers);
    const [hardInput, setHardInput] = useState('');

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
        if (answer === answersPoll[Object.keys(answersPoll).at(correctAnswer)]) {
            setPoints(points + 1);
        }
        setNumberQuestion(numberQuestion + 1);
        if (leftAnswers.length > 0) {
            randomNewQuestion(setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers, name)
        }

    };
    useEffect(() => {
        deleteNumber(leftAnswers, setLeftAnswers, correctAnswer);
    }, [correctAnswer]);
    const handleHardInputChange = (event) => {
        setHardInput(event.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    };
    const submitAnswer = () => {
        if (hardInput.toLowerCase() === answersPoll[Object.keys(answersPoll).at(correctAnswer)].toLowerCase()) {
            setPoints(points + 1);
        }
        setNumberQuestion(numberQuestion + 1);
        setHardInput('');
        if (leftAnswers.length > 0) {
            randomNewQuestion(setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers, name)
        }
    };

    return (
        <div className="quiz-container">
            <h2>{question}</h2>
            <div className="answers-container">
                {level === "hard" ? (
                    <div className="hardGameFields">
                        <input className="hardGameInput" value={hardInput} onChange={handleHardInputChange}
                               onKeyDown={handleKeyDown}/>
                        <button className="hardGameButton" onClick={() => submitAnswer()}>-></button>
                    </div>
                ) : (
                    answers.map((answer, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(answer)}
                            className="answerButton"
                        >
                            {answer}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default Answers;