import React, { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
//@ts-ignore
import { Route } from "react-tiger-transition";
import useAuthentication from "../../User/useAuthentication";

type TransitionProperties = {
  classNames: string;
  timeout: number;
};

type PrivateRoutePops = {
  path: string;
  exact: boolean;
  children: JSX.Element;
  transitionProps: TransitionProperties;
};

const PrivateRoute: FunctionComponent<PrivateRoutePops> = ({
  path,
  exact,
  children,
  transitionProps,
}: PrivateRoutePops) => {
  const { isLoggedIn } = useAuthentication();

  return !isLoggedIn ? (
    <Redirect to="/login" />
  ) : (
    <Route path={path} exact={exact} transitionProps={transitionProps}>
      {children}
    </Route>
  );
};
export default PrivateRoute;
