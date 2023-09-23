/*-----------------------------------
              VIEW     
-----------------------------------*/
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderSpinner() {}
  renderError(message = this._errorMessage) {
    console.error(message);
  }
  renderMessage() {}

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
