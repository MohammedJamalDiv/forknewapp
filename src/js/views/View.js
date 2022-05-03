import icons from 'url:../../img/icons.svg';
export default class view {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._partentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const oldElements = Array.from(this._partentElement.querySelectorAll('*'));
    newElements.forEach((Element, i) => {
      const currentElement = oldElements[i];
      if (
        !Element.isEqualNode(currentElement) &&
        Element.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = Element.textContent;
      }
      if (Element.isEqualNode(currentElement)) {
      }
      if (!Element.isEqualNode(currentElement)) {
        console.log(Element.attributes);
        Array.from(Element.attributes).forEach(el =>
          currentElement.setAttribute(el.name, el.value)
        );
      }
    });
  }
  _clear() {
    console.log(this._partentElement);
    this._partentElement.innerHTML = '';
  }

  renderspinner = function () {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
    this._clear();
    console.log(this._partentElement);
    this._partentElement.insertAdjacentHTML('afterbegin', markup);
  };
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this._partentElement.innerHTML = '';
    this._partentElement.insertAdjacentHTML('afterbegin', markup);
  }
  rendermessage(message = this._sucessMessage) {
    const markup = `<div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `;
    this._partentElement.innerHTML = '';
    this._partentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
