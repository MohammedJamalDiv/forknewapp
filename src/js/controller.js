const recipeContainer = document.querySelector('.recipe');
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import icons from 'url:../img/icons.svg';
import SearchView from './views/SearchView';
import ResultView from './views/ResultView';
import bookMarks from './views/bookMarks';
import pagenationView from './views/pagenationView';
import AddRescipeViews from './views/addrescipeview';
import addrescipeview from './views/addrescipeview';
import { modal_close_second } from './config';

console.log(icons);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderspinner();
    ResultView.update(model.getSearchResultPage());

    bookMarks.update(model.state.bookMarks);
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery();
    if (!query) return;
    ResultView.renderspinner();
    await model.loadSearchResult(query);

    ResultView.render(model.getSearchResultPage());
    pagenationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};
const controlservings = function (newServing) {
  // update the repice servings (instate)
  model.updateServings(newServing);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
  // update the recipe View
};
const ControlPagenation = function (GotoPage) {
  ResultView.render(model.getSearchResultPage(GotoPage));
  pagenationView.render(model.state.search);
  // render the bookmarks
};
const controllerrenderbookmarks = function () {
  bookMarks.render(model.state.bookMarks);
};
const controlAddBookmarks = function () {
  // add and removee bookmarks
  if (!model.state.recipe.bookMarked) model.BookMarking(model.state.recipe);
  else model.removeBookMarking(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookMarks.render(model.state.bookMarks);
};
const controladdrecipe = async function (newrecipe) {
  try {
    addrescipeview.renderspinner();
    await model.uploadRecipe(newrecipe);
    bookMarks.render(model.state.bookMarks);
    recipeView.render(model.state.recipe);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    addrescipeview.rendermessage();
    setTimeout(function () {
      addrescipeview.togglemethod();
    }, modal_close_second * 1000);
  } catch (err) {
    addrescipeview.renderError(err.message);
  }
};
const init = function () {
  bookMarks.addHandlerRender(controllerrenderbookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerbookmarks(controlAddBookmarks);
  SearchView.addHandlerSearch(controlSearchResults);
  pagenationView._addHandlerClick(ControlPagenation);
  recipeView.addHandlerServing(controlservings);
  addrescipeview.addhandlerSumbit(controladdrecipe);
  console.log('wlc');
};
init();
