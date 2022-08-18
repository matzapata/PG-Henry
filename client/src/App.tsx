import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./components/Login/Login";

function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={About} />
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
