import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import store from "./store/index";
import * as Types from "./store/actions/actionTypes";
import setAuthToken from "./utils/setAuthToken";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const token = localStorage.getItem("auth_token");
setAuthToken(token);

if (token) {
  let decode = jwtDecode(token);
  store.dispatch({
    type: Types.SET_USER,
    payload: {
      user: decode
    }
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
