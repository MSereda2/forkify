// Global app controller
import Search from './models/Search';
import {elements} from './views/base';
import * as searchView from './views/searchView';

/** GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipe object
 * - Shoping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
   // 1) Get query from the view
   const query = searchView.getInput(); // TODO

   if(query) {
      // 2) New search object and add it to state
      state.search = new Search(query);

      // 3) Prepare UI for results
      searchView.clearInput()
      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      console.log(state.search.result);
      console.log(state);
      searchView.renderResult(state.search.result)
   }
}

elements.searchForm.addEventListener(`submit`, event => {
   event.preventDefault();
   controlSearch();
})


