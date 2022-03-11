import { Post } from "../models/Post";
import Author from "../models/Author";
import '../styles/App.css'

   
function AuthorRow({ name, avatar }: Author) {
    return (
      <div>
        <p className="avatar">
            <img src={avatar} alt="Avatar" />
        </p>
        <p className="authorName">
            {name}
        </p>
      </div>
    );
  }

export const PostRow = ({ id, title, publishDate, author, summary, categories }: Post) => {
    return (
        <div className="wrapper">
            <div className="blog_post">
                <div className="postRow">
                    <h3>{publishDate}</h3>
                    <h1>{title}</h1>
                    <span>
                    {
                      categories.map(category => (
                        <span className="badge">{category.name}</span>
                    ))}
                    </span>
                    <p>{summary}</p>
                    <AuthorRow name={author.name} avatar={author.avatar}></AuthorRow>
                </div> 
            </div> 
        </div>  
    );
  }