import { createServer } from 'miragejs';
import { CategoriesSelector } from '../components/Select';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/categories', () => {
      var categories: {id: string, name: string}[] = []
      data.posts.map( post => 
        post.categories.map( category => {
          if (categories.indexOf(category) == -1){
            categories.push(category)
          }
        }))
      return categories;
    });
  },
});
