import React, { Component, FC, useState } from 'react'
import useCategoriesService from "../models/Categories";
//import "../styles/checkbox.css"

interface PropsSelector {
    categories: String[],
    setCategories: React.Dispatch<React.SetStateAction<String[]>>
}

export const CategoriesSelector: React.FC<PropsSelector> = (props) => {
    const service = useCategoriesService();
    const [categoriesSelected, setCategegoriesSelected] = useState<String[]>([])

    // Handle the onChange event of the checkbox
  const selectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newCategories = props.categories
    const selectedCategory = event.target.value;

    // Check if "ids" contains "selectedIds"
    // If true, this checkbox is already checked
    // Otherwise, it is not selected yet
    if (props.categories.includes(selectedCategory)) {
      newCategories = newCategories.filter((category) => category !== selectedCategory);
      props.setCategories(newCategories);
      setCategegoriesSelected(newCategories);
    } else {
      newCategories.push(selectedCategory);
      props.setCategories(newCategories);
      setCategegoriesSelected(newCategories);
    }
  };


    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                <div>
                    {service.payload.categories.map(category => (
                         <div className="box" key={category.id}>
                        <input
                            type="checkbox"
                            value={category.name}
                            onChange={selectCategory}
                            checked={categoriesSelected.includes(category.name) ? true : false}
                            key={category.id}
                        />
                        <span className="check"></span>
                        <label>{category.name}</label>
                        </div>))}

                </div>
            }

            {service.status === 'error' && (
                <div>Error, the backend moved to the dark side.</div>
            )}
        </div>

    );
}

