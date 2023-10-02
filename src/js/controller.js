import * as model from "./model.js";
import searchView from "./searchView.js";
import resultsView from "./resultsView.js";
import paginationView from "./paginationView.js";
import headerView from "./headerView.js";
import footerView from "./footerView.js";
import "../scss/main.scss";
import _ from "lodash-es";
import cover from "../img/cover.png";
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

//Render helper (checks for empty results array)
const controlRender = function () {
  if (!model.state.search.results || _.isEmpty(model.state.search.results))
    throw new Error();
  resultsView.render(model.getPageResults());
  paginationView.render(model.state.search);
};

//Form controller (all-bookmarks & search btns)
const controlLoading = async function (target) {
  try {
    if (target === "search") {
      //Collects search parameters
      const { field, query } = searchView.getQuery();
      if (!query) return;
      //Renders spinner
      resultsView.renderSpinner();
      //Loads search data
      await model.loadSearchResults(field, query);
      //Renders data
      controlRender();
    }
    if (target === "bookmarks") {
      //If no bookmarks, renders message
      if (_.isEmpty(model.state.bookmarks)) {
        resultsView.renderMessage();
        return;
      }
      //Saves bookmarks as search results
      model.showBookmarks();
      //Renders bookmarks
      controlRender();
    }
  } catch (err) {
    resultsView.renderError();
    console.error(`💥: ${err}`);
  }
};

//Preview controller (toggle/bookmark btns and link)
const controlBookSelection = async function (target, value) {
  try {
    //If link opens new tab (value:href)
    if (target === "link") window.open(value, "_blank").focus();
    //If toggle loads data & updates markup (value: selected id)
    if (target === "toggle") {
      await model.loadBook(value);
      resultsView.updateMarkup(model.state.book);
    }
    //If bookmark adds/removes from array
    if (target === "bookmark") {
      await model.loadBook(value);
      if (model.state.book.bookmarked) model.deleteBookmark(model.state.book);
      else model.addBookmark(model.state.book);
    }
  } catch (err) {
    resultsView.renderError();
    console.error(`💥: ${err}`);
  }
};

//Pagination control (previous & next btns)
const controlPagination = function (moveTo) {
  //Renders new results slice
  resultsView.render(model.getPageResults(moveTo));
  //Updates pagination
  paginationView.render(model.state.search);
};

/*-----------------------------------
            INITIALIZATION    
-----------------------------------*/

const init = function () {
  model.initStorage();
  headerView.init();
  searchView.init();
  resultsView.init();
  footerView.init();
  searchView.addHandlerSearch(controlLoading);
  resultsView.addHandlerBook(controlBookSelection);
  paginationView.addHandlerPagination(controlPagination);
};
init();
