import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Request from "../api/request";

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Utility: Sort posts by createdAt descending
const sortPostsByDate = (posts) =>
  posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// Thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  await delay(1000);
  const res = await Request.get("/posts");
  return res.data;
});

export const createPost = createAsyncThunk("posts/createPost", async (post) => {
  await delay(1000);
  const now = new Date().toISOString();
  const newPost = {
    ...post,
    completed: false,
    createdAt: now,
    updatedAt: null,
  };
  const res = await Request.post("/posts", newPost);
  return res.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }, { getState }) => {
    const state = getState();
    const existingPost = state.posts.posts.find((p) => p.id === id);
    if (!existingPost) throw new Error("Post not found");

    const updatedData = {
      ...existingPost,
      ...data,
      id, // Preserve original ID
      updatedAt: new Date().toISOString(),
    };
      await delay(1000);
    const res = await Request.put(`/posts/${id}`, updatedData);
    return res.data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await delay(1000);
  await Request.delete(`/posts/${id}`);
  return id;
});

// Initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = sortPostsByDate(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = sortPostsByDate([...state.posts, action.payload]);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = sortPostsByDate(
          state.posts.map((post) =>
            post.id === action.payload.id ? action.payload : post
          )
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = sortPostsByDate(
          state.posts.filter((p) => p.id !== action.payload)
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
