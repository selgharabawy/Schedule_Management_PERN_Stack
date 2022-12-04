//import './stylesheets/index.css';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import createBrowserHistory from 'history'
//import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";


ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


 //"start": "HOST='127.0.0.1' PORT='5000' react-scripts start",
