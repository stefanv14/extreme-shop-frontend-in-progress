import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./Redux/Store/Store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
