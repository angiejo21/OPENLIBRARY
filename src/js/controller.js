import * as model from "./model.js";
import searchView from "./searchView.js";
import resultsView from "./resultsView.js";

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

const controlBookLoading = async function () {
  const query = searchView.getQuery();
  if (!query) return;
  await model.loadSearchResults(query);
  resultsView.render(model.state.search.results);
  //TODO:
  resultsView.addHandlerBook(controlBookSelection);
};
const controlBookSelection = async function (e) {
  console.log(e.target);
  if (e.target.classList.contains("preview__btn")) {
    console.log("open", e.target.closest(".preview"));
    e.target.closest(".preview").classList.toggle("preview--active");
  }
};

const init = function () {
  searchView.addHandlerSearch(controlBookLoading);
};

init();
