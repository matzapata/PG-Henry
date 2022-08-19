import React from "react";
import { Route, Switch } from "react-router-dom";
import FormSingUp from "./pages/SingUp";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Tournaments from "./pages/Tournaments";
import Login from "./pages/Login";

function App() {
  return (
    <Switch>
      <Route exact path="/torneos" component={Tournaments} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/singup" component={FormSingUp} />
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
