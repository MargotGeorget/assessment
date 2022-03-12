import React from "react";
import { Post } from "../models/Post";
import usePostService from "../models/Posts";
import { PostRow } from "./PostRow";

const Posts: React.FC<{posts: Post[]}> = (props) => {
  const service = usePostService();

  return (
    <div className="wrapper">
        { props.posts.map(post => (
          <PostRow id={post.id} title={post.title}
          publishDate={post.publishDate}
          author={post.author}
          summary={post.summary}
          categories={post.categories}
          key={post.id}/> 
        ))}
    </div>
  );
};

export default Posts;