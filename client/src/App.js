import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
