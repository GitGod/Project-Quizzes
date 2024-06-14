import React, { useState, useContext } from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Dropdown from "./Dropdown";
import Ranking from "./Ranking";



const Header = () => {

    const navigate = useNavigate();
    const goToRanking = () => {
        navigate('/ranking');
    };

    return (

        <header className="header" >
            <div class="left-items">
                <a href="/" className="header-title">Quizzes</a>
                <button className="ranking" onClick={goToRanking} ><i class="fas fa-trophy"></i>Ranking</button>
            </div>
            <Dropdown />
        </header>


    );
}

export default Header;
