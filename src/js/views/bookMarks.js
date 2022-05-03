import icons from 'url:../../img/icons.svg';
import view from './View';
import Previews from './preview';
class bookMarks extends view {
  _partentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks Found For Your Query ! Please Try again';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookMarks => Previews.render(bookMarks, false))
      .join('');
  }
}
export default new bookMarks();
