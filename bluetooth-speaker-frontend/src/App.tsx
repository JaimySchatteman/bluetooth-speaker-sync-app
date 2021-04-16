import React, { FunctionComponent } from "react";
import "./App.less";
import WithLayout from "./Layout/withLayout";
import Routes from "./Routes";
import { useRecoilValue } from "recoil";
import AccessTokenState, { AccessToken } from "./GlobalState/AccesToken";

const App: FunctionComponent = () => {
  const { accessToken } = useRecoilValue<AccessToken>(AccessTokenState);

  return (
    <div className="App">
      <WithLayout isWrapping={accessToken !== ""}>
        <Routes />
      </WithLayout>
    </div>
  );
};

export default App;
