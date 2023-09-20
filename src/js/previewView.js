import View from "./view";

class PreviewView extends View {
  _parentElement = document.querySelector(".results");

  _generateMarkup() {
    return `
    <li class="preview" data-id="${this._data.id}">
      <div class="btn btn--bookmark" title="Bookmark it">
        <svg>
          <use xlink:href="#bookmark"></use>
        </svg>
      </div>
      <div class="btn preview__btn" title="Open / Close book">
        <svg>
          <use xlink:href="#x"></use>
        </svg>
      </div>
      <div class="preview__main">
        <h3 class="preview__title">${this._data.title}</h3>
        <h4 class="preview__subtitle">${this._data.author}</h4>
      </div>
      <div class="preview__content">
        <div class="preview__description">
          <p class="preview__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Odit vitae blanditiis quos voluptatem, commodi eius!
          </p>
          <a href="#" class="preview__link"
            >Read more <span>&#707;</span></a
          >
        </div>
        <figure class="preview__fig">
          <img src="../src/img/cover-example.jpg" alt="example cover" />
        </figure>
      </div>
    </li>
    `;
  }
}

export default new PreviewView();
