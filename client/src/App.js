import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/signup" component={Signup} />
        <Route exact={true} path="/signin" component={Signin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
