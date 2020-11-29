import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import RouteCreator from "utils/RouteCreator";

import Posts, { SinglePostPage, EditPostForm } from "./PostList";

const routes = [
  ["/posts", Posts],
  ["/posts/:postId", SinglePostPage],
  ["/editPost/:postId", EditPostForm],
];

function Test() {
  let { path } = useRouteMatch();
  return (
    <div className="Test">
      <Switch>
        <RouteCreator base={path} routes={routes} />
      </Switch>
    </div>
  );
}

export default Test;
