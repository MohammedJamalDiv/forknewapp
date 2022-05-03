import view from './View';
import icons from 'url:../../img/icons.svg';

class pagenationView extends view {
  _partentElement = document.querySelector('.pagination');
  _addHandlerClick(handler) {
    this._partentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const GotoPage = +btn.dataset.goto;
      console.log(GotoPage);
      handler(GotoPage);
    });
  }
  _generateMarkup() {
    const CurrentPage = this._data.page;
    const numpages = Math.ceil(
      this._data.results.length / this._data.resultPerpage
    );
    // page 1
    if (CurrentPage === 1 && numpages > 1) {
      return `<button data-goto="${
        CurrentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>page ${CurrentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // page 2 - 5
    if (CurrentPage < numpages && CurrentPage > 1) {
      return `<button data-goto="${
        CurrentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${CurrentPage - 1}</span>
    </button>
    <button data-goto="${
      CurrentPage + 1
    }"class="btn--inline pagination__btn--next">
    <span>Page ${CurrentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    }
    // last page
    if (CurrentPage === numpages && numpages > 1) {
      return `<button data-goto="${
        CurrentPage - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${CurrentPage - 1}</span>
    </button>
   
    `;
    }
    // only one page for the result
    return '';
  }
}
export default new pagenationView();
