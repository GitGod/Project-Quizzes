import React from "react";
import {useNavigate} from "react-router-dom";
import Dropdown from "./Dropdown";
import {useMediaQuery} from "react-responsive";

const Header = () => {

    const navigate = useNavigate();
    const isMobile = useMediaQuery({maxWidth: 800});

    const goToRanking = () => {
        navigate('/ranking');
    };

    return (

        <header className="header">
            <div className="left-items">
                <a href="#/" className="header-title">Quizzes</a>
                {!isMobile &&
                    <button className="rankingButton" onClick={goToRanking}><i className="fas fa-trophy"></i>Ranking</button>}
            </div>
            <Dropdown/>
        </header>


    );
}

export default Header;
