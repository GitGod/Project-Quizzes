import {useContext, useEffect} from "react";
import {LeftAnswers} from "../MyContext";

export const randomAnswers = (listOfFlags, leftAnswers, setCorrectAnswer) => {

    let numbers = [];
    let number = Math.floor(Math.random() * Object.keys(listOfFlags).length);
    let correctNumber = Math.floor(Math.random() * Object.keys(leftAnswers).length);
    numbers.push(leftAnswers[correctNumber]);
    setCorrectAnswer(leftAnswers[correctNumber]);
    for (let i = 0; i < 3; i++) {
        while (numbers.includes(number)) {
            number = Math.floor(Math.random() * Object.keys(listOfFlags).length)
        }
        numbers.push(number)
    }

    console.log(numbers);
    numbers = randomFilter(numbers);
    console.log(numbers);
    return numbers;
}

export const setNumbers = (listOfFlags) => {
    const {leftAnswers, setLeftAnswers} = useContext(LeftAnswers);
    let numbers = [];

    useEffect(() => {
        for (let i = 0; i < Object.keys(listOfFlags).length; i++) {
            numbers.push(i);
        }
        setLeftAnswers(numbers);
    }, [listOfFlags]);
    return leftAnswers;
}


export const deleteNumber = (leftAnswers, setLeftAnswers, valueToRemove) => {
    const filteredArray = leftAnswers.filter(item => item !== valueToRemove);
    setLeftAnswers(filteredArray);
}

const randomFilter = (array) => {
    return array.sort(() => 0.5 - Math.random());
};

export const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length); // Losowy indeks
    return array[randomIndex]; // Zwraca element o losowym indeksie
};

export const randomNewQuestion = (setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers) => {
    let randomAnswersQuiz = randomAnswers(answersPoll, leftAnswers, setCorrectAnswer)
    setAnswers([answersPoll[Object.keys(answersPoll).at(randomAnswersQuiz[0])], answersPoll[Object.keys(answersPoll).at(randomAnswersQuiz[1])], answersPoll[Object.keys(answersPoll).at(randomAnswersQuiz[2])], answersPoll[Object.keys(answersPoll).at(randomAnswersQuiz[3])]]);
    console.log(answersPoll)

};



