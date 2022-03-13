import React from "react";
import { useState } from "react";
import Posts from "./Posts";
import { CategoriesSelector } from "./CategoriesSelector"
import { Pagination } from "./Pagination";
import usePostService from "../models/Posts";
import { Post } from "../models/Post";

export const App: React.FunctionComponent = () => {
  // List of categories selected  
  const [categories, setCategories] = useState<String[]>([]);

  // List of posts to be displayed on the page after the filter by categories
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);

  // List of posts filtered by categories
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Index of current page 
  const [currentPage, setCurrentPage] = React.useState(1);
  const nbElementsInPage = 5;

  // GET all posts from the API 
  const service = usePostService();

  // Manages navigation between pages 
  const handlePageChange = (pageNumber: number) => {
    // Update current page state
    setCurrentPage(pageNumber);
    // Update the list of posts to display 
    updateDisplayedPosts(pageNumber, filteredPosts);
  };

  // Manages the modification of the list of posts to be displayed following a 
  // modification of the selected categories or the current page
  const updateDisplayedPosts = (newPageNumber: number, newPostsFiltered: Post[]) => {
    if (newPostsFiltered.length > 0) {
      if ((newPageNumber - 1) * nbElementsInPage + nbElementsInPage < newPostsFiltered.length) {
        setDisplayedPosts(newPostsFiltered.slice((newPageNumber - 1) * nbElementsInPage, (newPageNumber - 1) * nbElementsInPage + nbElementsInPage));
      } else {
        setDisplayedPosts(newPostsFiltered.slice((newPageNumber - 1) * nbElementsInPage));
      }
    }

  }

  // Handle the onChange event of the checkbox
  const selectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newCategories = categories
    const selectedCategory = event.target.value;

    // Check if "categories" contains "selectedCategories"
    // If true, this checkbox is already checked
    // Otherwise, it is not selected yet
    if (categories.includes(selectedCategory)) {
      newCategories = newCategories.filter((category) => category !== selectedCategory);
      setCategories(newCategories);
    } else {
      newCategories = newCategories.filter((category) => category !== selectedCategory);
      newCategories.push(selectedCategory);
      setCategories(newCategories);
    }
    // Filter posts with the new list of selected categories  
    filteringPosts(newCategories);
  };

  const filteringPosts = (newCategories: String[]) => {
    var newFilteredPosts: Post[] = []
    if (service.status === "loaded") {
      if (newCategories.length === 0) {
        // Without selected categories the whole list is displayed
        newFilteredPosts = service.payload.posts
      } else {
        newFilteredPosts = service.payload.posts.filter((post) => {
          var isValid = false;
          post.categories.forEach(category => {
            if (newCategories.indexOf(category.name) !== -1) { isValid = true }
          })
          return isValid;
        })
      }
    }
    // Update state 
    setFilteredPosts(newFilteredPosts);
    // Modification of the posts to be displayed from the new list of filtered posts 
    updateDisplayedPosts(currentPage, newFilteredPosts);
  }


  return (
    <div>

      <h1 className="greentitle"> Lizard global</h1>
      <h1 className="graytitle">Assessment</h1>
      <h1 className="name">by Margot Georget</h1>

      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
        <div>

          <CategoriesSelector categories={categories} selectCategory={selectCategory}></CategoriesSelector>
          
          { /* Initialization of lists */}
          {displayedPosts.length === 0 && setDisplayedPosts(service.payload.posts.slice(0, 5))}
          {filteredPosts.length === 0 && setFilteredPosts(service.payload.posts)}

          <Posts posts={displayedPosts}></Posts>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredPosts.length}
            pageSize={nbElementsInPage}
            handlePageChange={handlePageChange}
          />

        </div>
      }

      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
      
    </div>
  );

}

export default App;