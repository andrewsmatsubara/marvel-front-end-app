import React from "react";
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./src/App";
import { store } from './src/redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"));
