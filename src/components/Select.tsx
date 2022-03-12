import React, { Component, FC, useState } from 'react'
import useCategoriesService from "../models/Categories";

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
                <div>
                    {service.payload.categories.map(category => (
                         <div className="box" key={category.id}>
                        <input
                            type="checkbox"
                            value={category.name}
                            onChange={props.selectCategory}
                            checked={props.categories.includes(category.name) ? true : false}
                            key={category.id}
                        />
                        {console.log("dans html"+ props.categories)}
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

