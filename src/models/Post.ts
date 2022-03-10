import Author from "./Author"
import Category from "./Category"

export interface Post {
    id: string, 
    title: string, 
    publishDate: string
    author: Author,
    summary: string,
    categories: [Category]

}