import React, { FunctionComponent, useState } from "react";
import "./App.less";
import WithLayout from "./Layout/withLayout";
import Routes from "./Routes";

const App: FunctionComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <WithLayout isWrapping={isLoggedIn}>
        <Routes />
      </WithLayout>
    </div>
  );
};

export default App;
