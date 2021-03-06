import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../../../util/asyncComponent";
import { selLoading } from "store/slices";
import { useSelector } from "react-redux";

import { SimpleLoader } from "app/components/loaders";

import Library from "./routes/library";

const Dashboard = ({ match }) => {
  const loading = useSelector(selLoading);
  return (
    <>
      {loading && <SimpleLoader />}
      <div className="app-wrapper">
        <Switch>
          {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/crm`} /> */}
          <Route path={`${match.url}/library`} component={Library} />
          {/* <Route
        path={`${match.url}/tanked-fuel`}
        component={asyncComponent(() => import("./routes/tankedFuel"))}
      /> */}
          {/* <Route
        path={`${match.url}/crm`}
        component={asyncComponent(() => import("./routes/CRM"))}
      /> */}
          {/* <Route
        path={`${match.url}/users`}
        component={asyncComponent(() => import("./routes/Users"))}
      />
      <Route
        path={`${match.url}/notifications`}
        component={asyncComponent(() => import("./routes/Notifications"))}
      />
      <Route
        path={`${match.url}/flights`}
        component={asyncComponent(() => import("./routes/flights"))}
      />
      
      {/* <Route
        path={`${match.url}/files`}
        component={asyncComponent(() => import("./routes/files"))}
      />
      <Route
        path={`${match.url}/tanked-fuel`}
        component={asyncComponent(() => import("./routes/tankedFuel"))}
      />
      <Route
        path={`${match.url}/landings`}
        component={asyncComponent(() => import("./routes/landings"))}
      />
      <Route
        path={`${match.url}/fuel-alternatives`}
        component={asyncComponent(() => import("./routes/fuelAlternatives"))}
      />
      <Route
        path={`${match.url}/fuel-and-weights`}
        component={asyncComponent(() => import("./routes/fuelAndWeights"))}
      />
      <Route
        path={`${match.url}/journey-logs`}
        component={asyncComponent(() => import("./routes/journeyLog"))}
      />
      <Route
        path={`${match.url}/nav-logs`}
        component={asyncComponent(() => import("./routes/navLog"))}
      />
      <Route
        path={`${match.url}/airlines`}
        component={asyncComponent(() => import("./routes/airlines"))}
      />
      <Route
        path={`${match.url}/aircrafts`}
        component={asyncComponent(() => import("./routes/aircrafts"))}
      />
      <Route
        path={`${match.url}/files`}
        component={asyncComponent(() => import("./routes/files"))}
      />
      <Route
        path={`${match.url}/attachments`}
        component={asyncComponent(() => import("./routes/attachments"))}
      />
      <Route
        path={`${match.url}/fleets`}
        component={asyncComponent(() => import("./routes/fleets"))}
      />
      <Route
        path={`${match.url}/listing`}
        component={asyncComponent(() => import("./routes/Listing"))}
      />
      <Route
        path={`${match.url}/crypto`}
        component={asyncComponent(() => import("./routes/Crypto"))}
      />
      <Route
        path={`${match.url}/eCommerce`}
        component={asyncComponent(() => import("./routes/ECommerce"))}
      />
      <Route
        path={`${match.url}/news`}
        component={asyncComponent(() => import("./routes/News"))}
      />
      <Route
        path={`${match.url}/intranet`}
        component={asyncComponent(() => import("./routes/Intranet"))}
      />
      <Route
        path={`${match.url}/misc`}
        component={asyncComponent(() => import("./routes/Misc"))}
      /> */}
          <Route
            component={asyncComponent(() =>
              import("app/routes/extraPages/routes/404")
            )}
          />
        </Switch>
      </div>
    </>
  );
};

export default Dashboard;
