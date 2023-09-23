import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      handler(btn.dataset.page);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const totPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    return `
    <button class="btn btn--previous" data-page="previous" ${
      curPage === 1 ? "disabled" : ""
    }>
      <svg>
        <use xlink:href="#chevron-left"></use>
      </svg>
    </button>
    <div class="pagination__page">${curPage}/${totPages}</div>
    <button class="btn btn--next" data-page="next" ${
      curPage === totPages ? "disabled" : ""
    }>
      <svg>
        <use xlink:href="#chevron-right"></use>
      </svg>
    </button>
    `;
  }
}

export default new PaginationView();
