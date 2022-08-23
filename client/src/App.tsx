import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import TournamentsPage from "./pages/Tournaments";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import Perfil from "./pages/Perfil";
import UploadFile from "./components/UploadFile";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { refreshToken } from "./redux/slices/authThunk";
import PrivateRoute from "./utils/routePrivate";
import Perfil from "./pages/Perfil";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <Switch>
      <PrivateRoute exact path="/torneos" component={TournamentsPage} />
      <Route exact path="/auth/login" component={LoginPage} />
      <Route exact path="/auth/signup" component={SignUpPage} />
      <Route exact path="/auth/perfil" component={Perfil} />
      <Route exact path="/upload" component={UploadFile} />
      <Route exact path="/" component={HomePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
