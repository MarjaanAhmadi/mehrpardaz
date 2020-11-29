import React, { useReducer, createContext, useContext } from "react";

export default function useDContext(props = {}) {
  const { reducer = defaultReducer } = props;
  const GridContext = createContext();
  const DispatchGridContext = createContext();

  const DProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, props.initVal);

    const value = React.useMemo(() => ({ ...state }), [state]);
    return (
      <GridContext.Provider value={value}>
        <DispatchGridContext.Provider value={dispatch}>
          {props.children}
        </DispatchGridContext.Provider>
      </GridContext.Provider>
    );
  };

  const useDContext = () => useContext(GridContext);
  const useDispatch = () => useContext(DispatchGridContext);

  return { DProvider, useDContext, useDispatch };
}

const defaultReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state };

    case "REMOVE":
      return { ...state };

    case "TOGGLE":
      return { ...state };

    case "RESET":
      return { ...state };

    case "edit":
      return { ...state };

    default:
      return { ...state };
  }
};
