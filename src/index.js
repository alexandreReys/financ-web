import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "store";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap";

import App from "./App";

import "normalize.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
