import View from "./view";

class PreviewView extends View {
  _parentElement = document.querySelector(".results");

  //Creates markup for a single result
  _generateMarkup() {
    const length = window.innerWidth < 400 ? 25 : 35;
    return `
    <li class="preview ${
      this._data.bookmarked ? "bookmark--active" : ""
    }" data-id="${this._data.id}">
      <div class="btn btn--bookmark" title="Bookmark it">
      <svg>
        <use xlink:href="#${this._data.bookmarked ? "book" : "bookmark"}"></use>
      </svg>
      </div>
      <div class="btn btn--toggle" title="toggle book">
        <svg>
          <use xlink:href="#x"></use>
        </svg>
      </div>
      <div class="preview__main">
        <h3 class="preview__title">${
          this._data.title.length > length
            ? this._data.title.slice(0, length) + "..."
            : this._data.title
        }</h3>
        <h4 class="preview__subtitle">${this._data.author}</h4>
      </div>
      <div class="preview__content">
        <div class="preview__description">
          <p class="preview__text">${
            this._data.description ? this._data.description : " "
          }</p>
          <a href="${
            this._data.url ? this._data.url : "#"
          }" class="preview__link"
            >Read more <span>&#707;</span></a
          >
        </div>
        <figure class="preview__fig">
          <img src="${this._data.cover}" alt="${this._data.title} cover" />
        </figure>
      </div>
    </li>
    `;
  }
}

export default new PreviewView();
