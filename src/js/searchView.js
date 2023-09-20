class SearchView {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = document.querySelector(".search--query").value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentElement.querySelector(".search--query").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
