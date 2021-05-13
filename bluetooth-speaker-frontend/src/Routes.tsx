import React, { FunctionComponent } from "react";
import Login from "./User/Login/Login";
import { BrowserRouter as Router } from "react-router-dom";
// @ts-ignore
import { Navigation, Route, glide } from "react-tiger-transition";
import "react-tiger-transition/styles/main.min.css";
import MusicRoom from "./MusicRoom/MusicRoom";
import Register from "./User/Register/Register";

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
