import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers/index";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import defMiddles from "./middlewares";
// import thunk from "redux-thunk";
import baseSliceReducer from "./slices";
import testSliceReducer from "tests/testRouteWithSlice/testSlice";
import librarySlice from "app/routes/dashboard/routes/library/slice/librarySlice";

const history = createBrowserHistory();
const JamboReducers = reducers(history);
const routeMiddleware = routerMiddleware(history);
// const middlewares = [routeMiddleware];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const allMiddles = [routeMiddleware, ...defMiddles];

// export default configureStore({
//   reducer: {
//     ...reducers(history),
//   },
//   middleware: (getDefaults) => getDefaults().concat(allMiddles),
// })

export default configureStore({
  reducer: {
    ...JamboReducers,
    ...baseSliceReducer,
    ...testSliceReducer,
    ...librarySlice,
  },
  middleware: (getDefaults) => getDefaults().concat(allMiddles),
});

export { history };
