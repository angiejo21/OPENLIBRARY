import { createQuery } from "./helpers.js";

class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const field = document.querySelector(".search--field").value;
    const query = createQuery(document.querySelector(".search--query").value);
    this._clearInput();
    return { field, query };
  }
  _clearInput() {
    this._parentElement.querySelector(".search--query").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
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
