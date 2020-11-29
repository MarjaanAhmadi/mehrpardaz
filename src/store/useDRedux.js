import React from "react";

import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

export default function DRedux(reducer) {
  const MyContext = React.createContext(null);
  const myStore = configureStore({
    reducer,
  });

  function MyProvider({ children }) {
    return (
      <Provider context={MyContext} store={myStore}>
        {children}
      </Provider>
    );
  }

  const useStore = createStoreHook(MyContext);
  const useDispatch = createDispatchHook(MyContext);
  const useSelector = createSelectorHook(MyContext);

  return [MyProvider, useStore, useDispatch, useSelector];
}
