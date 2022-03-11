import React, { Component, FC } from 'react'
import Select from 'react-select'
import Category from '../models/Category';

interface PropsSelector {
    categories: String[],
    onCategoriesChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const CategoriesSelector: React.FC<PropsSelector> = (props) => {
    const categories = props.categories;
        
    return (
        <select
        multiple={true}
        onChange={props.onCategoriesChange}
          >
        <option value="React">React</option>
        <option value="Angular">Angular</option>
        <option value="Vue">Vue</option>
      </select>
    );
  }

