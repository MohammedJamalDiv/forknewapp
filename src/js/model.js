export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerpage: Res_Per_Page,
    page: 1,
  },
  bookMarks: [],
};
import { ajaxCall } from './Helpers';
import { API_Url } from './config';
import { Res_Per_Page } from './config';
import { KeyRecipe } from './config';

const TransfromRecipeDataObj = function (data) {
  const { recipe } = data.data;
  return {
    title: recipe.title,
    id: recipe.id,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await ajaxCall(`${API_Url}${id}?key=${KeyRecipe}`);
    state.recipe = TransfromRecipeDataObj(data);

    if (state.bookMarks.some(b => b.id === id)) state.recipe.bookMarked = true;
    else state.recipe.bookMarked = false;
  } catch (err) {
    throw err;
  }
};
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await ajaxCall(`${API_Url}?search=${query}&key=${KeyRecipe}`);

    console.log(data);
    state.search.results = data.data.recipes.map(el => {
      return {
        title: el.title,
        id: el.id,
        ingredients: el.ingredients,
        publisher: el.publisher,
        image: el.image_url,
        ...(el.key && { key: el.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerpage;
  const end = page * state.search.resultPerpage;
  return state.search.results.slice(start, end);
};
export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach(element => {
    element.quantity = (element.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};
const perisitbookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};
export const BookMarking = function (recipe) {
  // add bookmarks
  state.bookMarks.push(recipe);
  // Mark the current recipe
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;

  perisitbookmarks();
};
export const removeBookMarking = function (id) {
  const index = state.bookMarks.findIndex(el => el.id === id);
  state.bookMarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookMarked = false;
  perisitbookmarks();
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookMarks = JSON.parse(storage);
};
init();

const clearbookmarks = function () {
  localStorage.clear('bookmarks');
};

export const uploadRecipe = async function (newrecipe) {
  try {
    console.log(newrecipe);
    const ingredients = Object.entries(newrecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Please the the right fromat there needs to be 3 elements here :) '
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newrecipe.title,
      source_url: newrecipe.sourceUrl,
      image_url: newrecipe.image,
      publisher: newrecipe.publisher,
      cooking_time: +newrecipe.cookingTime,
      servings: +newrecipe.servings,
      ingredients,
    };
    const data = await ajaxCall(`${API_Url}?key=${KeyRecipe}`, recipe);

    state.recipe = TransfromRecipeDataObj(data);
    BookMarking(state.recipe);
  } catch (err) {
    throw err;
  }
};
