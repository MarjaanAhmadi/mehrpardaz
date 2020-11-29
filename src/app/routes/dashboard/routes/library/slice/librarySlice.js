import { createSlice } from "@reduxjs/toolkit";
// import { dNormalizer } from "util";
import * as R from "ramda";

import { WAITING } from "./constants";

// const contentAdapter = createEntityAdapter({});

const setCurrentFolder = (state, action) => {
  const content = action.payload;
  state.content = content;
};

const initialState = {
  status: WAITING,
  roads: {},
  navs: [],
  unPublished: [],
  drawerContent: {},
  showType: "grid",
  content: {
    current: {},
    files: [],
    folders: [],
    contents: [],
    deleted: [],
  },
};

const serachProp = (prop, val) =>
  R.compose(R.includes(val), R.toLower, R.prop(prop));

// const sortByPropDate = (prop, asc) =>
//   asc
//     ? R.sortWith([R.ascend(R.compose((item) => new Date(item), R.prop(prop)))])
//     : R.sortWith([
//         R.descend(R.compose((item) => new Date(item), R.prop(prop))),
//       ]);

const sortByPropTitle = (prop, asc) =>
  asc
    ? R.sortWith([R.ascend(R.compose(R.toLower, R.prop(prop)))])
    : R.sortWith([R.descend(R.compose(R.toLower, R.prop(prop)))]);

const byIsFolder = R.groupBy((content) => {
  const { is_folder, is_deleted } = content;
  return is_deleted ? "deleted" : is_folder ? "folders" : "files";
});

function setContentBySearch(state, action) {
  const { type, val, asc = true, search } = action.payload;

  const { contents } = state.content;
  let newContents = [];
  switch (type) {
    case "all":
      newContents = contents;
      // newContents = R.filter((item) => !item.is_deleted)(contents);
      break;
    case "sort":
      newContents = sortByPropTitle(val, asc)(contents);

      break;
    default:
      newContents = R.filter(serachProp("title", search))(contents);
      newContents = sortByPropTitle(val, asc)(newContents);
      break;
  }

  const dividedContents = byIsFolder(newContents);

  state.content.files = dividedContents.files;
  state.content.folders = dividedContents.folders;
}

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setContents: setCurrentFolder,

    setRoute: (state, action) => {
      const { content, idx } = action.payload;
      if (idx === "push") {
        state.navs.push(content);
      } else {
        state.navs = R.slice(0, idx + 1, state.navs);
      }
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setShowType: (state, action) => {
      state.showType = action.payload;
    },
    setUnpublishedContenst: (state, action) => {
      state.unPublished = action.payload;
    },
    setDrawerContent: (state, action) => {
      state.drawerContent = action.payload;
    },
    searchContent: setContentBySearch,
  },
});

export const { actions } = librarySlice;
export const {
  setContents,
  setRoute,
  setStatus,
  setShowType,
  setDrawerContent,
  searchContent,
} = actions;

// selectors

export const selLibraryStatus = (state) => state.library.status;
export const selContent = (state) => state.library.content;
export const selDeleted = (state) => state.library.content.deleted;
export const selNavs = (state) => state.library.navs;
export const selUnpublished = (state) => state.library.unPublished;
export const selShowType = (state) => state.library.showType;
export const selDrawerContent = (state) => state.library.drawerContent;

const reducer = {
  library: librarySlice.reducer,
};

export default reducer;
