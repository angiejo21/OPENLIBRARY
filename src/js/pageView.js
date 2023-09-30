class PageView {
  _header = document.querySelector("header");
  _footer = document.querySelector("footer");
  init() {
    this._header.innerHTML = `
    <h1 class="header__title">
      What should<br />
      I read <span class="accent">NXT</span>?
    </h1>
    <h2 class="header__subtitle">
      powered by <span>OpenLibrary APIs</span>
    </h2>
    `;

    this._footer.innerHTML = `Copyright © <span>${new Date().getFullYear()}</span> - <a href="https://bello.codes" class="preview__link">Angela Bellò</a>`;
  }
}

export default new PageView();
