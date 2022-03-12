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
  
function displayDate( date: string): string {
  let result = ""
  var splitted = date.split("-", 2); 
  switch (splitted[1]) {
    case '01': {
      result = "January "
      break;
    }
    case '02': {
      result = "February "
      break;
    }
    case '03': {
      result = "March "
      break;
    }
    case '04': { 
      result = "April "
      break;
    }
    case '05': {
      result = "May "
      break;
    }
    case '06': {
      result = "June "
      break;
    }
    case '07': {
      result = "July "
      break;
    }
    case '08': {
      result = "August "
      break;
    }
    case '09': {
      result = "September "
      break;
    }
    case '10': {
      result = "October "
      break;
    }
    case '11': {
      result = "November "
      break;
    }
    case '12': {
      result = "December "
      break;
    }
  }
  return result.concat(splitted[0])
}

export const PostRow = ({ id, title, publishDate, author, summary, categories }: Post) => {
    return (
            <div className="blog_post">
                <div className="postRow">
                    <h3>{displayDate(publishDate)}</h3>
                    <h1>{title}</h1>
                    <span>
                    {
                      categories.map(category => (
                        <span className="badge" key={category.id}>{category.name}</span>
                    ))}
                    </span>
                    <p>{summary}</p>
                    <AuthorRow name={author.name} avatar={author.avatar}></AuthorRow>
                </div> 
            </div> 
    );
  }