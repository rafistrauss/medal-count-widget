import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MedalWidget from "./MedalWidget";
import { sortMethods, goldSort } from "./constants";

var widget = {};
widget.initialize = (id, sortMethod = null) => {
    const initialSortMethod = sortMethod ? sortMethods[sortMethod] : goldSort;
    ReactDOM.render(
        <MedalWidget sortMethod={initialSortMethod} />,
        document.getElementById(id)
    );
};

widget.initialize('root', 'silver')