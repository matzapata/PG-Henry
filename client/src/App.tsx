import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import TournamentsPage from "./pages/Tournaments";
import SignUpPage from "./pages/SingUp";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Switch>
      <Route exact path="/torneos" component={TournamentsPage} />
      <Route exact path="/auth/login" component={LoginPage} />
      <Route exact path="/auth/signup" component={SignUpPage} />
      <Route exact path="/" component={HomePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
