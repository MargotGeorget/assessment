import React from "react";
import usePostService from "../models/Posts";
import { PostRow } from "./PostRow";

const Posts: React.FC<{}> = () => {
  const service = usePostService();

  console.log(service);

  return (
    <div className="wrapper">
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
        service.payload.posts.map(post => (
          <PostRow id={post.id} title={post.title}
          publishDate={post.publishDate}
          author={post.author}
          summary={post.summary}
          categories={post.categories}/> 
        ))}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  );
};

export default Posts;