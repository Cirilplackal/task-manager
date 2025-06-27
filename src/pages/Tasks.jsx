import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../features/postSlice";
import Card from "../components/Card";
import CreateTask from "../components/CreateTask";
import CardLoader from "../components/CardLoader";
import { DEFAULT_CARDS } from "../constants/constants";

export default function Tasks() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const stats = {
    completed: posts.filter((t) => t.completed).length,
    pending: posts.filter((t) => !t.completed).length,
    total: posts.length,
  };

  return (
    <div>
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-emerald-600 mb-2">
              Task Manager
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Organize your work and life, finally. Become focused, organized,
              and calm with this task management system.
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreateTask />
          {loading
            ? Array.from({ length: posts?.length || DEFAULT_CARDS }).map(
                (_, index) => <CardLoader key={index} />
              )
            : posts.map((post) => (
                <Card
                  key={post.id}
                  post={post}
                  onDelete={() => dispatch(deletePost(post.id))}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
