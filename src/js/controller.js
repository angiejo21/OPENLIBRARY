import model from "./model.js";
import view from "./view.js";

import "../scss/main.scss";
import cover from "../img/cover-example.jpg";
import sprite from "../img/sprite.svg";

/*-----------------------------------
            CONTROLLER    
-----------------------------------*/

const coverImg = document.querySelector("img");

coverImg.src = cover;

console.log("gotcha");
