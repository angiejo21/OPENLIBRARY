import _ from "lodash-es";

/*-----------------------------------
              VIEW     
-----------------------------------*/
export default class View {
  _data;

  //Recalls the markup and returns it (render=false) or inserts it in the parent (render=true)
  render(data, render = true) {
    if (!data || (_.isArray(data) && _.isEmpty(data))) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Renders spinner in the parent
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use xlink:href="#compass"></use>
      </svg>
    </div>
    <h3>Finding my way...</h3>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  //Renders error message in the parent
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use xlink:href="#alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  //Renders message in the parent
  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use xlink:href="#book"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  //Empties parent element
  _clear() {
    this._parentElement.innerHTML = "";
  }
}
