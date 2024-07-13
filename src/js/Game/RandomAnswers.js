import {useContext, useEffect} from "react";
import {LeftAnswers} from "../MyContext";

let numbersEu = [0, 5, 11, 16, 19, 21, 35, 42, 55, 56, 58, 63, 67, 70, 74, 75, 77, 79, 80, 81, 87, 93, 102, 104, 106, 113, 114, 133, 137, 138, 139, 142, 143, 144, 148, 157, 170, 171, 183, 188, 193, 194, 195, 201, 204, 206, 208, 229, 234, 291, 300]

export const randomAnswers = (listOfFlags, leftAnswers, setCorrectAnswer, name) => {

    //let numbersEu = [0, 5, 11, 16, 19, 21, 35, 42, 55, 56, 58, 63, 67, 70, 74, 75, 77, 79, 80, 81, 87, 93, 102, 104, 106, 113, 114, 133, 137, 138, 139, 142, 143, 144, 148, 157, 170, 171, 183, 188, 193, 194, 195, 201, 204, 206, 208, 229, 234, 291, 300]
    let numbers = [];
    let number = 0;
    if (name === "Flagi") {
        number = Math.floor(Math.random() * Object.keys(listOfFlags).length);
    } else {
        number = Math.floor(Math.random() * Object.keys(numbersEu).length);
    }
    let correctNumber = Math.floor(Math.random() * Object.keys(leftAnswers).length);

    numbers.push(leftAnswers[correctNumber]);
    setCorrectAnswer(leftAnswers[correctNumber]);
    for (let i = 0; i < 3; i++) {
        if (name === "Flagi") {
            while (numbers.includes(number)) {
                number = Math.floor(Math.random() * Object.keys(listOfFlags).length);
            }
            numbers.push(number)
        } else {
            while (numbers.includes(numbersEu[number])) {
                number = Math.floor(Math.random() * numbersEu.length);
            }
            numbers.push(numbersEu[number])
        }
    }

    numbers = randomFilter(numbers);
    return numbers;
}

export const setNumbers = (listOfFlags, name) => {
    const {leftAnswers, setLeftAnswers} = useContext(LeftAnswers);
    let numbers = [];
   // let numbersEu = [0, 5, 11, 16, 19, 21, 35, 42, 55, 56, 58, 63, 67, 70, 74, 75, 77, 79, 80, 81, 87, 93, 102, 104, 106, 113, 114, 133, 137, 138, 139, 142, 143, 144, 148, 157, 170, 171, 183, 188, 193, 194, 195, 201, 204, 206, 208, 229, 234, 291, 300]

    useEffect(() => {
        if (name === "Flagi") {
            for (let i = 0; i < Object.keys(listOfFlags).length; i++) {
                numbers.push(i);
            }
            setLeftAnswers(numbers);
        } else if (name === "Flagi Europa") {
            setLeftAnswers(numbersEu)
        }

    }, [listOfFlags, name]);
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

export const randomNewQuestion = (setAnswers, answersPoll, setAnswersPoll, setCorrectAnswer, correctAnswer, leftAnswers, quizName) => {
    let randomAnswersQuiz = randomAnswers(answersPoll, leftAnswers, setCorrectAnswer, quizName)
    setAnswers([answersPoll[Object.keys(answersPoll).at(randomAnswersQuiz[0])], answersPoll[Object.keys(answersPoll).at(randomAnswersQuiz[1])], answersPoll[Object.keys(answersPoll).at(randomAnswersQuiz[2])], answersPoll[Object.keys(answersPoll).at(randomAnswersQuiz[3])]]);

};



