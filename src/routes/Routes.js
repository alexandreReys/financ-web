import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "pages/admin/login/Login";
import Notifications from "pages/admin/notifications/Notifications";

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute path="/notifications" component={Notifications} />
    <Route component={Notifications} />
  </Switch>
);

export default Routes;
