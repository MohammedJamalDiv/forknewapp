import icons from 'url:../../img/icons.svg';
import view from './View';
import Previews from './preview';

class ResultView extends view {
  _partentElement = document.querySelector('.results');
  _errorMessage = 'No recipes Found For Your Query ! Please Try again';
  _generateMarkup() {
    console.log(this._data);
    return this._data.map(result => Previews.render(result, false)).join('');
  }
}
export default new ResultView();
