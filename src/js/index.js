// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

/** GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipe object
 * - Shoping list object
 * - Liked recipes
 */
const state = {};


/* SEARCH CONTROLLER */
const controlSearch = async () => {
   // 1) Get query from the view
   const query = searchView.getInput(); // TODO

   if(query) {
      // 2) New search object and add it to state
      state.search = new Search(query);

      // 3) Prepare UI for results
      searchView.clearInput();
      searchView.clearResults();
      renderLoader(elements.results);

      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResult(state.search.result);
   }
}

elements.searchForm.addEventListener(`submit`, event => {
   event.preventDefault();
   controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');
   if(btn) {
      const goToPage = parseInt(btn.dataset.goto, 10);
      searchView.clearResults();
      searchView.renderResult(state.search.result, goToPage)
   }
})

/* RECIPE CONTROLLER */
const controlRecipe = async () => {
   // Get id from URl
   const id = window.location.hash.replace('#', '');
   console.log(id);

   if(id) {
      // Prepare UI for changes
      renderLoader(elements.recipeList);
      recipeView.clearRecipe()

      // Create new Recipe object
      state.recipe = new Recipe(id);
      window.r = state.recipe;

      // Hightlight selected search item
      if(state.search) {
         searchView.highlightSelected(id);
      } 
      // Get Recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcServings();
      state.recipe.calcTime();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
   }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));