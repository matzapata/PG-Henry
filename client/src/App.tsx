import React from "react";
import { Route, Switch } from "react-router-dom";
import FormSingUp from "./components/formSingUp";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={Home} />
      <Route exact path="/singup" component={FormSingUp} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
