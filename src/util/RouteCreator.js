import React from "react";
import { Route } from "react-router-dom";

export default (props) => {
  const { routes, base = "" } = props;
  return (
    <>
      {routes.map((route, index) => {
        const [path, Component] = route;
        return (
          <Route
            key={`route_${path}_${index}_${base}`}
            exact
            path={`${base}${path}`}
            component={Component}
          />
          //   <Component />
          // </Route>
        );
      })}
    </>
  );
};
