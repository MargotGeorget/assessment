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

  const service = usePostService();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (service.status === "loaded") {
      if (pageNumber * 10 + 10 < service.payload.posts.length) {
        setPosts(service.payload.posts.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10))
      } else {
        setPosts(service.payload.posts.slice((pageNumber - 1) * 10))
      }
    }
  };

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
        <div>
          <CategoriesSelector categories={categories} setCategories={setCategories}></CategoriesSelector>
          {categories.map(category =>
            <p key={categories.indexOf(category)}>{category}</p>
          )}
          {posts.length == 0 && setPosts(service.payload.posts.slice(0, 10))}
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