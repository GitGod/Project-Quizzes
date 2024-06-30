import React, {useContext, useState} from 'react';
import {PointsContext} from "../MyContext";

const Points = () => {
   // const [points, setPoints] =
    const { points, setPoints } = useContext(PointsContext);

    return (
        <div className="picture">

            <h1>Punkty: {points}</h1>
        </div>
    );
};

export default Points;