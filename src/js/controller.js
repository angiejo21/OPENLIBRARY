import * as model from "./model.js";
import searchView from "./searchView.js";
import resultsView from "./resultsView.js";
import paginationView from "./paginationView.js";

import "../scss/main.scss";
import "../img/alert-triangle.svg";
import "../img/book.svg";
import "../img/bookmark.svg";
import "../img/chevron-down.svg";
import "../img/chevron-left.svg";
import "../img/chevron-right.svg";
import "../img/compass.svg";
import "../img/globe.svg";
import "../img/pen-tool.svg";
import "../img/search.svg";
import "../img/x.svg";

/*-----------------------------------
            CONTROLLER    
-----------------------------------*/

const controlRender = function () {
  console.log(model.state.search);
  if (!model.state.search.results || model.state.search.results.length === 0)
    throw new Error();
  resultsView.render(model.getPageResults());
  paginationView.render(model.state.search);
};

const controlLoading = async function (target) {
  try {
    console.log(target);
    if (target === "search") {
      paginationView._clear();
      const { field, query } = searchView.getQuery();
      console.log(field, query);
      if (!query) return;
      resultsView.renderSpinner();
      await model.loadSearchResults(field, query);
      controlRender();
    }
    if (target === "bookmarks") {
      paginationView._clear();
      if (model.state.bookmarks.length === 0) {
        resultsView.renderMessage();
        return;
      }
      model.showBookmarks();
      controlRender();
    }
  } catch (err) {
    resultsView.renderError();
    console.error(`💥: ${err}`);
  }
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
      else model.addBookmark(model.state.book);
    }
  } catch (err) {
    resultsView.renderError();
    console.error(`💥: ${err}`);
  }
};

const controlPagination = function (moveTo) {
  resultsView.render(model.getPageResults(moveTo));
  paginationView.render(model.state.search);
};

const init = function () {
  model.initStorage();
  searchView.addHandlerSearch(controlLoading);
  resultsView.addHandlerBook(controlBookSelection);
  paginationView.addHandlerPagination(controlPagination);
};

init();
