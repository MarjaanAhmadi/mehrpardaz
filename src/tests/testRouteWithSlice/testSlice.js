import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { curClient } from "api/masterApi";

const postsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
});
// const userAdapter = createEntityAdapter({
//   // sortComparer: (a, b) => b.date.localeCompare(a.date),
// });

const initialState = {
  status: "idle",
  error: null,
  posts: postsAdapter.getInitialState({}),
  users: postsAdapter.getInitialState({}),
};

// async thunks by create async

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await curClient("get")("/posts")(null)(null);
  return response;
});

// create slice

const postsSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    addPosts: {
      reducer(state, action) {
        state.posts = action.payload;
      },
    },
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";

      postsAdapter.upsertMany(state.posts, action.payload.data);
      // state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

// actions
export const { addPosts, postAdded, postUpdated } = postsSlice.actions;

// own created thunks

// selectors
// export const selectPostById = (postId) => (state) =>
//   state.test.posts && state.test.posts.find((post) => post.id === postId)

// export const selectAllPosts = (state) => {
//   return state.test.posts || []
// }

// export const selectPostByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.user === userId)
// )

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectEntities: selPostsEntities,
  selectTotal: selPostTotal,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.test.posts);

export const selectPostByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user.id === userId)
);

// reducer
export default { test: postsSlice.reducer };
