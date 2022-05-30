import React from "react";
import reactDom from "react-dom";
import { Provider } from "react-redux";
import App from "./src/App";
import { store } from './src/redux/store';

reactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"));

  // creating basic redux setup