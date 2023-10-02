import View from "./view";

class HeaderView extends View {
  _parentElement = document.querySelector("header");
  _initMarkup = `
    <h1 class="header__title">
      What should<br />
      I read <span class="accent">NXT</span>?
    </h1>
    <h2 class="header__subtitle">
      powered by <span>OpenLibrary APIs</span>
    </h2>
    `;

  _footer = document.querySelector("footer");
  initalize() {
    this._footer.innerHTML = `Copyright © <span>${new Date().getFullYear()}</span> - <a href="https://bello.codes" class="preview__link">Angela Bellò</a>`;
  }
}

export default new HeaderView();
