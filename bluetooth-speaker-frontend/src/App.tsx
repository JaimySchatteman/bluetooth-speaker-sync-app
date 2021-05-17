import React, { FunctionComponent } from "react";
import "./App.less";
import WithLayout from "./Common/Layout/withLayout";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import useAuthentication from "./User/useAuthentication";
import BackgroundAnimation from "./Common/BackgroundAnimation/BackgroundAnimation";

const App: FunctionComponent = () => {
  const { isLoggedIn } = useAuthentication();

  return (
    <div className="App">
      <WithLayout isWrapping={isLoggedIn}>
        <Router>
          <Routes />
        </Router>
      </WithLayout>
    </div>
  );
};

export default App;
