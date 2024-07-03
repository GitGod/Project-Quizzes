import React, {useContext, useState} from 'react';
import {PointsContext} from "../MyContext";

const Points = () => {
    const {points, setPoints} = useContext(PointsContext);

    return (
        <div className="points">
            <h1>Punkty: {points}</h1>
        </div>
    );
};

export default Points;