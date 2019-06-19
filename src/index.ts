import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";

const targetElem = document && document.getElementById("example");

if (targetElem) {
    ReactDOM.render(
        React.createElement(App),
        targetElem
    );
} else {
    console.error( document 
        ? "no target element found in document"
        : "no document"
    );
}