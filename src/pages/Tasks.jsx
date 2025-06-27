import React, { useEffect } from "react";
import { fetchPosts } from "../features/postSlice";
import { useDispatch, useSelector } from "react-redux";

const Tasks = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return <div>Tasks
  
  {loading ? (
    <p>Loading...</p>
  ) : (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="border p-4 mb-2">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  )}
  </div>;
};

export default Tasks;
