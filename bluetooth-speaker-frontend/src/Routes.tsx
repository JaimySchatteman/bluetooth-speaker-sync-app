import React, { FunctionComponent } from "react";
import Login from "./Login/Login";
import { BrowserRouter as Router } from "react-router-dom";
// @ts-ignore
import { Navigation, Route, glide } from "react-tiger-transition";
import MusicRoom from "./Devices/MusicRoom";
import Register from "./Register/Register";

const Routes: FunctionComponent = () => {
  return (
    <Router>
      <Navigation>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/musicroom">
          <MusicRoom />
        </Route>
      </Navigation>
    </Router>
  );
};

export default Routes;
