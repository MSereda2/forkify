// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

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
const controlRecipe = () => {
   const id = window.location.hash;
   console.log(id);
};

window.addEventListener('hashchange', controlRecipe);
