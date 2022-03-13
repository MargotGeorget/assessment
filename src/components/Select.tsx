import React, { Component, FC, useState } from 'react'
import useCategoriesService from "../models/Categories";
import '../styles/checkbox.css'

//import "../styles/checkbox.css"

interface PropsSelector {
    categories: String[],
    selectCategory: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CategoriesSelector: React.FC<PropsSelector> = (props) => {
    const service = useCategoriesService();

    return (
        <div>
            {service.status === 'loading' && <div>Loading...</div>}
            {service.status === 'loaded' &&
                <div className='selector'>
                    <h4>Filter posts by categories</h4>
                    {service.payload.categories.map(category => (

                        <label className="container" key={category.id}>{category.name}
                        <input
                            type="checkbox"
                            value={category.name}
                            onChange={props.selectCategory}
                            checked={props.categories.includes(category.name) ? true : false}
                            key={category.id}
                        />
                        <span className="checkmark"></span>
                        </label>))}

                </div>
            }

            {service.status === 'error' && (
                <div>Error, the backend moved to the dark side.</div>
            )}
        </div>

    );
}

