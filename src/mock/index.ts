import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    // Creation of a route in the API to retrieve the list of the different categories
    this.get('/categories', () => {
      var categoriesJSON: { categories :{id: string, name: string}[]} = { categories: []}
      data.posts.map( post => 
        post.categories.forEach( category => {
          if ( contain(categoriesJSON.categories, category) === false ){
            categoriesJSON.categories.push(category)
          }
        }))
      return categoriesJSON;
    });
  },
});

function contain(categories: {id: string, name: string}[], category: {id: string, name: string}): boolean {
  var contain = false;
  categories.forEach( cat => {
    if (cat.name === category.name) {
        contain = true;
    }
  });
  return contain; 
}