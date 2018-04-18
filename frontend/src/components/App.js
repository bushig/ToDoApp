import React from "react";
import ReactDOM from "react-dom";

import Header from './common/Header'
import ToDoList from './ToDoList'

import 'bootstrap/dist/css/bootstrap.css';
import '../css/main.css'

const App = () => {
    return (
        <div>
            <Header/>
            <ToDoList/>
        </div>);
};

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;