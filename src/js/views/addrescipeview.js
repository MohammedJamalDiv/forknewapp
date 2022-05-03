import icons from 'url:../../img/icons.svg';
import view from './View';
import Previews from './preview';
class AddRescipeViews extends view {
  _sucessMessage = 'Recipe Was uploaded succesfully Thank You :)';
  _partentElement = document.querySelector('.upload');
  _Window = document.querySelector('.add-recipe-window');
  _Overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  togglemethod() {
    this._Overlay.classList.toggle('hidden');
    this._Window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.togglemethod.bind(this));
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.togglemethod.bind(this));
    this._Overlay.addEventListener('click', this.togglemethod.bind(this));
  }

  addhandlerSumbit(handler) {
    this._partentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataarr = [...new FormData(this)];
      const data = Object.fromEntries(dataarr);
      console.log(data);
      handler(data);
    });
  }
}
export default new AddRescipeViews();
