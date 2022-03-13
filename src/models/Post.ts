import Author from "./Author"
import Category from "./Category"

// Creation of a post interface to type the data so as not to use the any type 
export interface Post {
    id: string, 
    title: string, 
    publishDate: string
    author: Author,
    summary: string,
    categories: [Category]

}