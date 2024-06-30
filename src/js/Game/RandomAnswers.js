import React, { useEffect, useState } from "react";
import flags from "../Api/Flags";


export const randomAnswers = (listOfFlags) => {

    let numbers =[];
    let number = Math.floor(Math.random()*Object.keys(listOfFlags).length);
    for (let i = 0; i < 4; i++) {
        while(numbers.includes(number)){
            number = Math.floor(Math.random()*Object.keys(listOfFlags).length)
        }
        numbers.push(number)
    }



    return numbers;
}

export const getRandomElement = (array) => {

    const randomIndex = Math.floor(Math.random() * array.length); // Losowy indeks
    return array[randomIndex]; // Zwraca element o losowym indeksie
};




