import View from "./view";

class PreviewView extends View {
  _parentElement = document.querySelector(".results");

  _generateMarkup() {
    return `
    <li class="preview" data-id="${this._data.id}">
      <div class="btn btn--bookmark ${
        this._data.bookmarked ? "bookmark-active" : ""
      }" title="Bookmark it">
        <svg>
          <use xlink:href="#bookmark"></use>
        </svg>
      </div>
      <div class="btn btn--toggle preview__btn" title="toggle book">
        <svg>
          <use xlink:href="#x"></use>
        </svg>
      </div>
      <div class="preview__main">
        <h3 class="preview__title">${
          this._data.title.length > 40
            ? this._data.title.slice(0, 40) + "..."
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
          <img src="${this._data.cover ? this._data.cover : "#"}" alt="${
      this._data.title
    } cover" />
        </figure>
      </div>
    </li>
    `;
  }
}

export default new PreviewView();
