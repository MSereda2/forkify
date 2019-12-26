import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = ''
};

export const clearResults = () => {
    elements.listResults.innerHTML = '';
};

/*
 // 'Pasta with tamoto and spinsh'.split(' ') => ['pasta', 'with', 'tamoto', 'and', 'spinsh']
 //acc: 0/ acc + curr.length = 0 + 5 = 5; pasta
 //acc: 5/ 5 + 4 = 9; with
 //acc: 9/ 9 + 6 = 15; tamoto
 //acc: 15/ 15 + 3 = 18; длина больше слово это не добавится в массив and
 //acc: 18/ 18 + 6 = 24; длина больше слово это не добавится в массив spinsh
 Итог: pasta with tamoro = 15;
 */
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []; 

    if(title.length > limit) {
      title.split(' ').reduce((acc, curr) => {

        if(acc + curr.length <= limit) {
            newTitle.push(curr);
        }
        return acc + curr.length;

      }, 0)

      //return the result of reduce
      return `${newTitle.join(' ')} ...`
    }

    return title;
};

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.listResults.insertAdjacentHTML('beforeend', markup);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
};