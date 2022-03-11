import { createServer } from 'miragejs';
import Category from '../models/Category';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/categories', () => {
      var categoriesJSON: { categories :{id: string, name: string}[]} = { categories: []}
      data.posts.map( post => 
        post.categories.map( category => {
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
  categories.map( cat => {
    if (cat.name == category.name) {
        contain = true;
    }
  });
  return contain; 
}