import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../features/postSlice";
import { formatDate } from "../utils/functions";

const Card = ({ post, onDelete }) => {
  const [checked, setChecked] = useState(post.completed);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const handleSave = (field) => {
    if (
      (field === "title" && editTitle !== post.title) ||
      (field === "content" && editContent !== post.content)
    ) {
      dispatch(
        updatePost({
          id: post.id,
          data: {
            ...(field === "title" ? { title: editTitle } : {}),
            ...(field === "content" ? { content: editContent } : {}),
          },
        })
      );
    }
    setEditingField(null);
  };

  // Focus input on edit
  const handleEdit = (field) => {
    setEditingField(field);
    setTimeout(() => {
      if (field === "title" && titleRef.current) titleRef.current.focus();
      if (field === "content" && contentRef.current) contentRef.current.focus();
    }, 0);
  };

  return (
    <div
      key={post.id}
      className={`
                group relative bg-white rounded-xl shadow-md border border-gray-200 opacity-70 hover:opacity-100
                hover:shadow-lg hover:border-gray-300 transition-all duration-300 
                animate-fade-in p-5
            ${checked ? "bg-emerald-50" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between w-full">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            dispatch(
              updatePost({
                id: post.id,
                data: { completed: !checked },
              })
            );
          }}
          className="accent-emerald-600 w-5 h-5 cursor-pointer rounded p-4"
        />

        <button
          onClick={onDelete}
          className={`
                        p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100
                        hover:bg-red-100 hover:text-red-600 text-gray-400
                        ${isHovered ? "translate-x-0" : "translate-x-2"}
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
          title="Delete post"
        >
          <img src="trash.png" alt="Delete" className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col space-y-2">
        {/* Editable Title */}
        {editingField === "title" ? (
          <input
            ref={titleRef}
            className="text-lg font-semibold text-gray-900 border-b border-blue-300 outline-none"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={() => handleSave("title")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave("title");
              }
            }}
          />
        ) : (
          <h3
            className="text-lg font-semibold text-gray-900 line-clamp-1 cursor-pointer"
            onDoubleClick={() => handleEdit("title")}
            title="Double click to edit title"
          >
            {editTitle}
          </h3>
        )}

        {/* Editable Content */}
        {editingField === "content" ? (
          <>
            <textarea
              ref={contentRef}
              className="text-sm text-gray-600 border-b border-blue-300 outline-none resize-none"
              value={editContent}
              rows={3}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setEditContent(e.target.value);
                }
              }}
              onBlur={() => handleSave("content")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSave("content");
                }
              }}
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {100 - editContent.length} characters left
            </p>
          </>
        ) : (
          <p
            className="text-sm text-gray-600 line-clamp-3 cursor-pointer"
            onDoubleClick={() => handleEdit("content")}
            title="Double click to edit content"
          >
            {editContent}
          </p>
        )}
      </div>
      {/* Timestamp */}
      <div className="mt-4 text-xs text-gray-400 font-medium">
        {formatDate(post.createdAt)}
        {post.updatedAt && ` (Updated: ${formatDate(post.updatedAt)})`}
      </div>
    </div>
  );
};

export default Card;
