import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import TournamentsPage from "./pages/Tournaments";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import Perfil from "./pages/Perfil";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { refreshToken } from "./redux/slices/authThunk";
import PrivateRoute from "./utils/routePrivate";
import TournamentCreate from "./pages/TournamentCreate";
import TournamentDetailPage from "./pages/TournamentDetail";
import About from "./pages/About";
import PaymentSuccess from "./pages/SuccessPayment";
import Admin from "./pages/Admin";

function App() {
  const dispatch = useAppDispatch();
  const jwtToken = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!jwtToken) dispatch(refreshToken());
  }, []);

  return (
    <Switch>
      <Route exact path="/admin" component={Admin} />
      <PrivateRoute exact path="/torneos/crear" component={TournamentCreate} />
      <PrivateRoute
        exact
        path="/torneos/:id"
        component={TournamentDetailPage}
      />
      <PrivateRoute exact path="/torneos" component={TournamentsPage} />
      <Route exact path="/auth/login" component={LoginPage} />
      <Route exact path="/auth/signup" component={SignUpPage} />
      <PrivateRoute exact path="/auth/perfil" component={Perfil} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={About} />
      <Route path="/success/:id" component={PaymentSuccess} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
