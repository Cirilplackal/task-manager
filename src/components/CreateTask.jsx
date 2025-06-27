import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/postSlice";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Optional loading state
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title.trim() && form.content.trim()) {
      setIsLoading(true);
      await dispatch(createPost(form)); // Assuming createPost returns a Promise
      setForm({ title: "", content: "" });
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({ title: "", content: "" });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="animate-bounce-in">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full h-full min-h-24 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-dashed border-emerald-200 rounded-xl flex flex-col items-center justify-center hover:from-emerald-100 hover:to-green-100 hover:border-emerald-300 transition-all duration-300 group"
        >
          <div
            size={24}
            className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-emerald-600 font-medium">Add New Post</span>
        </button>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Create New Post</h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter post title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              required
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              rows={4}
              value={form.content}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setForm({ ...form, content: e.target.value });
                }
              }}
              placeholder="Enter post content..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
              required
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {100 - form.content.length} characters left
            </p>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            type="submit"
            disabled={isLoading || !form.title.trim() || !form.content.trim()}
            className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 disabled:bg-emerald-500 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating...
              </div>
            ) : (
              "Create Post"
            )}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
