import { render } from "@testing-library/react";
import React from "react";
import { Post } from "../models/Post";
import './App.css';

class App extends React.Component {

    state = {
        posts: [],
        dataIsLoaded: false, 
        error: false
    };


// ComponentDidMount is used to
// execute the code 
componentDidMount() {
    fetch("https://localhost:3000/api/posts")
    .then(response => response.json())
    .then(response => this.setState({ 
      posts: response.results,
      loading: false
    }))
    .catch(error => this.setState({ 
      loading: false, 
      error: true 
    }));
}
render() {
  const { posts, dataIsLoaded, error } = this.state;
  if (!dataIsLoaded) return 
    <div>
      <h1> Pleses wait some time.... </h1> 
    </div> ;
  if (error) return 
    <div>Error message</div>
  return (
    <div className = "App">
      <h1> Fetch data from an api in react </h1>  {
          posts.map((post) => ( 
          <ol key = { post.id } >
              
          </ol>
          ))
      }
    </div>
);
}
}

export default App;
