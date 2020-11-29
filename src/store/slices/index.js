import { createSlice } from "@reduxjs/toolkit";
// import { curClient } from "api/masterApi";
// import { curCatcherLoader as loaderClient } from 'src/api/masterApi'

const initialState = {
  status: "init",
  vals: {},
  user: {},
  loading: false,
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { actions } = baseSlice;
export const { setLoading } = actions;

// selectors

export const selUser = (state) => state.base.user;
export const selBaseStatus = (state) => state.base.status;
export const selLoading = (state) => state.base.loading;
const reducer = {
  base: baseSlice.reducer,
};
export default reducer;
