import {createContext} from 'react';

export const PointsContext = createContext(0);
export const AnswersContext = createContext([]);
export const CorrectAnswerContext = createContext("");
export let TimeContext = createContext([]);
export let AnswersPoll = createContext([]);
export let LeftAnswers = createContext([1]);
export let NumberQuestion = createContext(1);
//export let FlagsContext = createContext([]);