import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/postSlice";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title.trim() && form.content.trim()) {
      setIsLoading(true);
      await dispatch(createPost(form));
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
      <div>
        <button onClick={() => setIsOpen(true)}>Add New Post</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create New Post</h3>

      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="content">Content (max 100 chars):</label>
        <textarea
          id="content"
          rows={4}
          value={form.content}
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setForm({ ...form, content: e.target.value });
            }
          }}
          required
        />
        <div>{100 - form.content.length} characters left</div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button
          type="submit"
          disabled={isLoading || !form.title.trim() || !form.content.trim()}
        >
          {isLoading ? "Creating..." : "Create Post"}
        </button>
        <button type="button" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </button>
      </div>
    </form>
  );
}
