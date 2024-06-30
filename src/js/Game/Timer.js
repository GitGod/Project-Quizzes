import React, {forwardRef, useContext, useEffect, useState} from 'react';
import {PointsContext, TimeContext} from "../MyContext";

const Timer = () => {

    const [isActive, setIsActive] = useState(true);
    const {time, setTime} = useContext(TimeContext);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        if(time === 0){
            setIsActive(false)
            clearInterval(interval)
        }

        return () => clearInterval(interval);
    }, [isActive, time]);



    return (

        <div className="timer">
            <div className="time">
                {Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}
            </div>

        </div>

    );

}

export default Timer;


