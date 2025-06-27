import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../features/postSlice";
import Card from "../components/Card";
import CreateTask from "../components/CreateTask";
import CardLoader from "../components/CardLoader";
import { BASE_FILTER_OPTIONS, DEFAULT_CARDS } from "../constants/constants";
import { getFilterOptions } from "../utils/functions";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filter";

export default function Tasks() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("status") || "all";

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleFilterClick = (status) => {
    setSearchParams({ status: status });
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "completed") return post.completed;
    if (filter === "pending") return !post.completed;
    return true;
  });

  const stats = {
    completed: posts.filter((t) => t.completed).length,
    pending: posts.filter((t) => !t.completed).length,
    total: posts.length,
  };
  const filterOptions = getFilterOptions(BASE_FILTER_OPTIONS, stats, filter);
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
            </p>{" "}
            {/* Filter Buttons */}
            <Filters
              options={filterOptions}
              active={filter}
              onFilterChange={handleFilterClick}
            />
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
            : filteredPosts.map((post) => (
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
