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
  try {
    const { field, query } = searchView.getQuery();
    console.log(field, query);
    if (!query) return;
    await model.loadSearchResults(field, query);
    resultsView.render(model.state.search.results);
    resultsView.addHandlerBook(controlBookSelection);
  } catch (err) {}
};
const controlBookSelection = async function (e) {
  try {
    console.log(e.target);
    if (e.target.classList.contains("preview__btn")) {
      const bookEl = e.target.closest(".preview");
      if (!bookEl.classList.contains("preview--active")) {
        await model.loadBook(bookEl.dataset.id);
        resultsView.updateMarkup(bookEl, model.state.book);
      }
      bookEl.classList.toggle("preview--active");
    }
    if (e.target.classList.contains("preview__link")) {
      window.open(e.target.href, "_blank").focus();
    }
  } catch (err) {}
};

const init = function () {
  searchView.addHandlerSearch(controlBookLoading);
};

init();
