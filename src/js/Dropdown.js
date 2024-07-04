import React, {useState} from 'react';
import {useMediaQuery} from 'react-responsive';
import '../scss/main.scss';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery({maxWidth: 800});

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu">
            {isMobile ? (
                <div className="menuDropdown">
                    <button className="dropdownToggle" onClick={toggleDropdown}>
                        Menu
                    </button>
                    {isOpen && (
                        <ul className="dropdownList">
                            <li><a onClick={toggleDropdown} href="#/Kraje">Kraje</a></li>
                            <li><a onClick={toggleDropdown} href="#/KrajeEuropa">Kraje Europa</a></li>
                            <li><a onClick={toggleDropdown} href="#/ranking"><i className="fas fa-trophy"></i> Ranking</a></li>
                        </ul>
                    )}
                </div>
            ) : (
                <ul className="menuList">
                    <li><a href="#/Kraje">Kraje</a></li>
                    <li><a href="#/KrajeEuropa">Kraje Europa</a></li>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;