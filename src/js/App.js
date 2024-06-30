import React, {Component, useState, useEffect, useContext} from "react";
import {createRoot} from "react-dom/client";


// STYLES
import '../scss/main.scss';
import Header from "./Header";
import {HashRouter, Route, Routes} from "react-router-dom";
import Ranking from "./Ranking";
import Game from "./Game/Game";


// APP
const App = () => {
    return (
        <HashRouter>
            <Header/>
            <Routes>
                <Route path="/ranking" element={<Ranking/>}/>
                <Route path="/" element={<Ranking/>}/>
                <Route path="/Kraje" element={<Game name={"Kraje"}/>}/>
            </Routes>
        </HashRouter>

        //  <Dropdown/>
    )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App/>);