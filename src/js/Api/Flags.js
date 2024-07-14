import React, {useContext, useEffect, useState} from "react";
import { fetchResp } from "./utils";
import {AnswersPoll} from "../MyContext";

export const flags = () => {

    const { answersPoll, setAnswersPoll} = useContext(AnswersPoll);

    useEffect(() => {
        fetch(`https://flagcdn.com/pl/codes.json`)
            .then(fetchResp)
            .then((data) => setAnswersPoll(data))
            .catch((err) => console.log(err));
    },[]);

    return answersPoll;
};

