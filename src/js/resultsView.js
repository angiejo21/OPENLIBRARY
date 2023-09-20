import View from "./view";
import previewView from "./previewView.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "💥 ups";
  _message = "";
  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
  addHandlerBook(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      handler(e);
    });
  }
}

export default new ResultsView();
