import React, { Component, useState, useEffect, useContext  } from "react";
import { createRoot } from "react-dom/client";


// STYLES
import '../scss/main.scss';


// APP
const App = () => {
    return (
        <h1>Start</h1>
    )
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);