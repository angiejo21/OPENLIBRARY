import model from "./model.js";
import view from "./view.js";

import "../scss/main.scss";
import cover from "../img/cover-example.jpg";
import "../img/bookmark.svg";
import "../img/chevron-down.svg";
import "../img/chevron-left.svg";
import "../img/chevron-right.svg";
import "../img/code.svg";
import "../img/filter.svg";
import "../img/search.svg";
import "../img/x.svg";

/*-----------------------------------
            CONTROLLER    
-----------------------------------*/

const coverImg = document.querySelector("img");

coverImg.src = cover;

console.log("gotcha");
