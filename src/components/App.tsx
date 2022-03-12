import React from "react";
import { useState } from "react";
import Posts from "./Posts";
import { CategoriesSelector } from "./Select"
import { Pagination } from "./Pagination";
import usePostService from "../models/Posts";
import { Post } from "../models/Post";

export const App: React.FunctionComponent = () => {
    // This holds the selected values
    const [categories, setCategories] = useState<String[]>([]) 
    const [posts, setPosts] = useState<Post[]>([])
    const [currentPage, setCurrentPage] = React.useState(1);
	  const handlePageChange = (pageNumber: number) => {
		  setCurrentPage(pageNumber);
      if (service.status === "loaded"){
        if (pageNumber*10+10 < service.payload.posts.length) {
          setPosts(service.payload.posts.slice((pageNumber-1)*10,pageNumber*10+10))
        } else {
          setPosts(service.payload.posts.slice((pageNumber-1)*10))
        }
      }
	  };

  const service = usePostService();

  // Handle the onChange event of the select
  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;

    const newCategories = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      newCategories.push(selectedOptions[i].value);
    }

    setCategories(newCategories);
  };
 
    return (
      <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
      <div>
        <CategoriesSelector categories={categories} onCategoriesChange={onChangeHandler}></CategoriesSelector>
        { categories.map( category => 
          <p>{category}</p>
        )}
        { posts.length == 0 && setPosts(service.payload.posts.slice(0,10)) }
      <Posts posts={posts}></Posts>
      <div>
        <Pagination
          currentPage={currentPage}
          totalItems={service.payload.posts.length}
          pageSize={10}
          handlePageChange={handlePageChange}
        />
      </div>
      </div>
      }
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
      );
  
}

export default App;