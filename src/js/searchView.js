import View from "./view";
import paginationView from "./paginationView.js";
import { createQuery } from "./config.js";

class SearchView extends View {
  _parentElement = document.querySelector(".search");
  _initMarkup = `            
    <div class="select search__select">
      <select
        name="field"
        id="field"
        class="search--field search__field"
      >
        <option value="subjects">Genre</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
      </select>
      <svg>
        <use xlink:href="#chevron-down"></use>
      </svg>
    </div>
    <div class="input">
      <input
        type="text"
        name="query"
        id="query"
        placeholder="What's on your mind?"
        class="search--query search__query"
      />
      <button class="btn btn--search" title="Search" type="submit">
        <svg>
          <use xlink:href="#search"></use>
        </svg>
      </button>
    </div>
    <button class="btn btn--all-bookmarks" title="See all bookmarks">
      <svg>
        <use xlink:href="#book"></use>
      </svg>
    </button>
    `;

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
