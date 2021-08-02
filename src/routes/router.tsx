import React from "react";
// import {HashRouter, Route} from "react-router-dom";

import {MainView} from "../views/MainView";
import {LoginView} from "../views/LoginView";
import {useAppSelector} from "../store";


export function Routes() {
  const isLoggedOut = useAppSelector(x => x.user.user === undefined);
  if (isLoggedOut) {
    return <LoginView />
  }
  return <MainView />
}