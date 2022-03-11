import React from "react";
import usePostService from "../models/Posts";

const Posts: React.FC<{}> = () => {
  const service = usePostService();

  console.log(service);

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
        service.payload.posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
    </div>
  );
};

export default Posts;