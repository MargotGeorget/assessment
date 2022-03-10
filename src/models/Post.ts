export interface Post {
    id: string, 
    title: string, 
    publishDate: string
    author: Author,
    summary: string,
    categories: [Category]

}