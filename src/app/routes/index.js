import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";
import TimeLine from "./timeLine";
import Dashboard from "./dashboard";

const Routes = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}/sample-page`}
      component={asyncComponent(() => import("./SamplePage"))}
    />
    <Route path={`${match.url}/time-line`} component={TimeLine} />

    <Route path={`${match.url}/dashboard`} component={Dashboard} />
    {/*<Route component={asyncComponent(() => import("app/routes/extraPages/routes/404"))}/>*/}
  </Switch>
);

export default withRouter(Routes);
