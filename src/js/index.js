import generateJoke from "./generateJoke";
import "../scss/main.scss";
import cover from "../img/cover-example.jpg";

const coverImg = document.querySelector("img");
coverImg.src = cover;

console.log(generateJoke());
