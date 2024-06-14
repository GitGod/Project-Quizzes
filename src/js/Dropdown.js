import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import '../scss/main.scss';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            {isMobile ? (
                <>
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        Quizy
                    </button>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            <li><a href="#Kraje">Kraje</a></li>
                            <li><a href="#Kraje Europa">Kraje Europa</a></li>
                        </ul>
                    )}
                </>
            ) : (
                <ul className="dropdown-list">
                    <li><a href="#Kraje">Kraje</a></li>
                    <li><a href="#Kraje Europa">Kraje Europa</a></li>
                </ul>
            )}
        </div>
    );
};

export default Dropdown;