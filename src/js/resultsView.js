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

  updateMarkup(bookId, book) {
    const bookAttr = `[data-id='${bookId}']`;
    const element = document.querySelector(bookAttr);
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
    element.classList.toggle("preview--active");
  }

  addHandlerBook(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const bookEl = e.target.closest(".preview");
      const btn = e.target.closest(".btn");
      if (e.target.classList.contains("preview__link")) {
        handler("link", e.target.href);
      }
      if (btn.classList.contains("btn--toggle")) {
        if (!bookEl.classList.contains("preview--active")) {
          handler("toggle", bookEl.dataset.id);
        } else bookEl.classList.toggle("preview--active");
      }
      if (btn.classList.contains("btn--bookmark")) {
        handler("bookmark");
        btn.classList.toggle("bookmark-active");
      }
    });
  }
}

export default new ResultsView();
