import React from "react";
import { useState } from "react";
import Posts from "./Posts";
import { CategoriesSelector } from "./Select"
import { Pagination } from "./Pagination";
import usePostService from "../models/Posts";
import { Post } from "../models/Post";

export const App: React.FunctionComponent = () => {
  // This holds the selected values
  const [categories, setCategories] = useState<String[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsDisplayed, setPostsDisplayed] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const nbElementsInPage = 5;

  const service = usePostService();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    updatePostsDisplayed(pageNumber, filteredPosts);
  };

  const updatePostsDisplayed = (pageNumber: number, newPostsFiltered: Post[]) => {
    if (filteredPosts.length > 0) {
      if ((pageNumber - 1) * nbElementsInPage + nbElementsInPage < filteredPosts.length) {
        setPostsDisplayed(newPostsFiltered.slice((pageNumber - 1) * nbElementsInPage, (pageNumber - 1) * nbElementsInPage + nbElementsInPage));
      } else {
        setPostsDisplayed(newPostsFiltered.slice((pageNumber - 1) * nbElementsInPage));
      }
    }
    
  }

  // Handle the onChange event of the checkbox
  const selectCategory = async (event: React.ChangeEvent<HTMLInputElement>) => {
    var newCategories = categories
    const selectedCategory = event.target.value;

    // Check if "ids" contains "selectedIds"
    // If true, this checkbox is already checked
    // Otherwise, it is not selected yet
    if (categories.includes(selectedCategory)) {
      newCategories = newCategories.filter((category) => category !== selectedCategory);
      await setCategories(newCategories);
    } else {
      newCategories = newCategories.filter((category) => category !== selectedCategory);
      newCategories.push(selectedCategory);
      await setCategories(newCategories);
    }
    // TODO: mettre une fonction pour remettre à jours la liste 
    filteringPosts(newCategories);
  };

  const filteringPosts = (newCategories: String[]) => {
    var newFilteredPosts: Post[] = []
    if (service.status === "loaded") {
      if (newCategories.length === 0) {
        newFilteredPosts = service.payload.posts
      } else {
        newFilteredPosts = service.payload.posts.filter((post) => {
          var isValid = false;
          post.categories.map(category => {
            if (newCategories.indexOf(category.name) != -1) { isValid = true } 
          })
          return isValid;
        })
      }
    }
    setFilteredPosts(newFilteredPosts);
    updatePostsDisplayed(currentPage, newFilteredPosts);
  }


  return (
    <div>
      <h1 className="title">Assessment Lizard global</h1>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
        <div>
          <CategoriesSelector categories={categories} selectCategory={selectCategory}></CategoriesSelector>
          {categories.map(category =>
            <p key={categories.indexOf(category)}>{category}</p>
          )}
          {postsDisplayed.length == 0 && setPostsDisplayed(service.payload.posts.slice(0, 5))}
          {filteredPosts.length == 0 && setFilteredPosts(service.payload.posts)}
          <Posts posts={postsDisplayed}></Posts>
          <div>
            <Pagination
              currentPage={currentPage}
              totalItems={filteredPosts.length}
              pageSize={nbElementsInPage}
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