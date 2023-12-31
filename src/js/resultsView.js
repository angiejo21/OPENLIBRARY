import View from "./view";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "We couldn't find any book corresponding to your query.<br> Please check the search parameters or try again :)";
  _message =
    "You haven't bookmarked any book yet, as soon as you do, you'll find them all here :)";
  _initMarkup = `
    <div class="message">
      <div>
        <svg><use xlink:href="#globe"></use>                
      </div>
      <p>OpenLibrary aspires to record every book ever published.<br>Search their catalogue by <strong>genre</strong>, <strong>author</strong> or <strong>title</strong></p>
      <div>
        <svg><use xlink:href="#pen-tool"></use>
      </div>
    </div>
    `;

  //Concatenates markups for each result in the array
  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }

  //Updates book markup data and toggles active class
  updateMarkup(book) {
    const bookAttr = `[data-id='${book.id}']`;
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
    cover.addEventListener("load", () => {
      cover.style.opacity = 1;
    });
    element.classList.toggle("preview--active");
    element.querySelector(".btn--toggle").classList.remove("loader");
  }

  //Event Handler
  addHandlerBook(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const bookEl = e.target.closest(".preview");
      const btn = e.target.closest(".btn");

      if (e.target.classList.contains("preview__link")) {
        handler("link", e.target.href);
      }

      if (!btn) return;

      if (btn.classList.contains("btn--toggle")) {
        if (!bookEl.classList.contains("preview--active")) {
          btn.classList.add("loader");
          handler("toggle", bookEl.dataset.id);
        } else bookEl.classList.toggle("preview--active");
      }

      if (btn.classList.contains("btn--bookmark")) {
        handler("bookmark", bookEl.dataset.id);
        bookEl.classList.toggle("bookmark--active");
        btn.innerHTML = `
        <svg>
          <use xlink:href="#${
            bookEl.classList.contains("bookmark--active") ? "book" : "bookmark"
          }"></use>
        </svg>
        `;
      }
    });
  }
}

export default new ResultsView();
