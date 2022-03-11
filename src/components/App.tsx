import React from "react";
import { useState } from "react";
import Posts from "./Posts";
import { CategoriesSelector } from "./Select"

export const App: React.FunctionComponent = () => {
    // This holds the selected values
    const [categories, setCategories] = useState<String[]>([]) 

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
        <CategoriesSelector categories={categories} onCategoriesChange={onChangeHandler}></CategoriesSelector>
        { categories.map( category => 
        <p>{category}</p>
          )}
        <Posts></Posts>
      </div>
      );
  
}

export default App;