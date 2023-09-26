import * as model from "./model.js";
import searchView from "./searchView.js";
import resultsView from "./resultsView.js";
import paginationView from "./paginationView.js";

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
import previewView from "./previewView.js";

/*-----------------------------------
            CONTROLLER    
-----------------------------------*/

const coverImg = document.querySelector("img");

coverImg.src = cover;

const controlRender = function () {
  resultsView.render(model.getPageResults());
  paginationView.render(model.state.search);
};

const controlBookLoading = async function () {
  try {
    const { field, query } = searchView.getQuery();
    console.log(field, query);
    if (!query) return;
    await model.loadSearchResults(field, query);
    controlRender();
  } catch (err) {}
};
const controlBookSelection = async function (target, value) {
  try {
    if (target === "link") window.open(value, "_blank").focus();
    if (target === "toggle") {
      await model.loadBook(value);
      resultsView.updateMarkup(value, model.state.book);
    }
    if (target === "bookmark") {
      if (model.state.book.bookmarked) model.deleteBookmark(model.state.book);
      if (!model.state.book.bookmarked) model.addBookmark(model.state.book);
    }
  } catch (err) {}
};

const controlPagination = function (moveTo) {
  resultsView.render(model.getPageResults(moveTo));
  paginationView.render(model.state.search);
};

const controlBookmarks = function () {
  if (model.state.bookmarks.length === 0) return;
  model.showBookmarks();
  controlRender();
};

const init = function () {
  model.initStorage();
  searchView.addHandlerSearch(controlBookLoading);
  searchView.addHandlerBookmarks(controlBookmarks);
  resultsView.addHandlerBook(controlBookSelection);
  paginationView.addHandlerPagination(controlPagination);
};

init();
