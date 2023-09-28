import paginationView from "./paginationView.js";
import { createQuery } from "./config.js";

class SearchView {
  _parentElement = document.querySelector(".search");

  //Collects the search parameters and creates the query
  getQuery() {
    const field = document.querySelector(".search--field").value;
    const query = createQuery(document.querySelector(".search--query").value);
    this._clearInput();
    return { field, query };
  }

  //Empties text input
  _clearInput() {
    this._parentElement.querySelector(".search--query").value = "";
  }

  //Event Handler
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      paginationView._clear();
      const btn = e.target.closest(".btn");
      if (!btn) return;
      if (btn.classList.contains("btn--search")) {
        handler("search");
      }
      if (btn.classList.contains("btn--all-bookmarks")) {
        handler("bookmarks");
      }
    });
  }
}

export default new SearchView();
