import View from "./view";

class FooterView extends View {
  _parentElement = document.querySelector("footer");
  _initMarkup = `Copyright © <span>${new Date().getFullYear()}</span> - <a href="https://bello.codes" class="preview__link">Angela Bellò</a>`;
}

export default new FooterView();
