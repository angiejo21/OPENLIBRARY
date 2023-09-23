import View from "./view";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "";
  _message = "";
  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
  updateMarkup(element, book) {
    const text = element.querySelector(".preview__text");
    const link = element.querySelector(".preview__link");
    const cover = element.querySelector(".preview__fig img");
    text.innerHTML = `${
      book.description.length > 550
        ? book.description.slice(0, 550) + "..."
        : book.description
    }`;
    link.href = book.url;
    cover.src = book.cover;
  }
  addHandlerBook(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      handler(e);
    });
  }
}

export default new ResultsView();
