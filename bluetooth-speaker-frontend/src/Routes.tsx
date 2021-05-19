import React, { FunctionComponent, useMemo } from "react";
import Login from "./User/Login/Login";
import { useLocation } from "react-router-dom";
// @ts-ignore
import { Navigation, Route } from "react-tiger-transition";
import "react-tiger-transition/styles/main.min.css";
import "./Common/transitions/Transitions";
import MusicRoom from "./MusicRoom/MusicRoom";
import Register from "./User/Register/Register";
import PrivateRoute from "./Common/privateRoute/privateRoute";
import MusicRooms from "./MusicRooms/MusicRooms";
import CreateMusicRoom from "./MusicRoom/CreateMusicRoom";

export type PreviousLocationState = {
  previousPath: string;
};

const Routes: FunctionComponent = () => {
  const { state } = useLocation<PreviousLocationState>();
  const { pathname } = useLocation();

  const loginRouteTransition = useMemo(() => {
    if (state?.previousPath === "/register") {
      return {
        classNames: "room-left",
        timeout: 1000,
      };
    }

    if (state?.previousPath === "/login") {
      return {
        classNames: "room-right",
        timeout: 1000,
      };
    }

    return {
      classNames: "drop-top",
      timeout: 900,
    };
  }, [state]);

  const registerRouteTransition = useMemo(() => {
    if (state?.previousPath === "/login") {
      return {
        classNames: "room-right",
        timeout: 1000,
      };
    }

    if (state?.previousPath === "/register") {
      return {
        classNames: "room-left",
        timeout: 1000,
      };
    }

    return {
      classNames: "drop-top",
      timeout: 900,
    };
  }, [state]);

  const musicRoomsRoute = useMemo(() => {
    if (state?.previousPath === "/login" || state?.previousPath === "/register") {
      return {
        classNames: "drop-bottom",
        timeout: 1000,
      };
    }

    if (state?.previousPath.slice(0, 10) === "/musicroom") {
      return {
        classNames: "glide-right",
        timeout: 1000,
      };
    }

    if (pathname.slice(0, 10) === "/musicroom") {
      return {
        classNames: "glide-left",
        timeout: 1000,
      };
    }

    if (pathname === "/create") {
      return {
        classNames: "drop-bottom",
        timeout: 1000,
      };
    }

    return {
      classNames: "glide-right",
      timeout: 1000,
    };
  }, [pathname, state?.previousPath]);

  const createMusicRoomRoute = useMemo(() => {
    if (pathname.slice(0, 10) === "/musicroom") {
      return {
        classNames: "glide-left",
        timeout: 1000,
      };
    }

    if (state?.previousPath.slice(0, 10) === "/musicroom") {
      return {
        classNames: "glide-right",
        timeout: 1000,
      };
    }

    if (state?.previousPath.slice(0, 10) === "/") {
      return {
        classNames: "drop-bottom",
        timeout: 1000,
      };
    }

    if (pathname === "/create") {
      return {
        classNames: "glide-right",
        timeout: 1000,
      };
    }

    return {
      classNames: "drop-bottom",
      timeout: 1000,
    };
  }, [pathname, state?.previousPath]);

  const musicRoomRoute = useMemo(() => {
    if (pathname === "/" || pathname === "/create") {
      return {
        classNames: "glide-right",
        timeout: 1000,
      };
    }

    return {
      classNames: "glide-left",
      timeout: 1000,
    };
  }, [pathname]);

  return (
    <Navigation>
      <Route path="/login" transitionProps={loginRouteTransition}>
        <Login />
      </Route>
      <Route exact path="/register" transitionProps={registerRouteTransition}>
        <Register />
      </Route>
      <PrivateRoute exact path="/" transitionProps={musicRoomsRoute}>
        <MusicRooms />
      </PrivateRoute>
      <PrivateRoute exact path="/create" transitionProps={createMusicRoomRoute}>
        <CreateMusicRoom />
      </PrivateRoute>
      <PrivateRoute exact path="/musicroom/:id" transitionProps={musicRoomRoute}>
        <MusicRoom />
      </PrivateRoute>
    </Navigation>
  );
};

export default Routes;
