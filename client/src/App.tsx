import React from "react";
import { Route, Switch } from "react-router-dom";
import FormSignUp from "./components/formSingUp";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Tournaments from "./pages/Tournaments";
import Login from "./pages/Login";

function App() {
  return (
    <Switch>
      <Route exact path="/torneos" component={Tournaments} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={FormSignUp} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
