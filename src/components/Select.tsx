import React, { Component, FC } from 'react'
import useCategoriesService from "../models/Categories";

interface PropsSelector {
    categories: String[],
    onCategoriesChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const CategoriesSelector: React.FC<PropsSelector> = (props) => {
    const service = useCategoriesService();
        
    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                    <select
                        multiple={true}
                        onChange={props.onCategoriesChange}
                    >
                    <option value="">Test</option>
                    {service.payload.categories.map(category => (

                    <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                  </select>
            }
            {service.status === 'error' && (
                <div>Error, the backend moved to the dark side.</div>
            )}
        </div>
        
    );
  }

