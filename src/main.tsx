import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/css/bootstrap.min.css";
import "./assets/css/jonny-1.2.css";
import "./assets/css/custom.css"; 
import "./contactme/css/select2.min.css";
import "./contactme/css/contactme-1.4.css";
// import "../assets/lightgallery/css/lightgallery.min.css"; //Uncomment to enable the gallery plugin 

import '@aws-amplify/ui-react/styles.css';

import App from "./App.tsx";

import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//ReactDOM.render(<App />, document.getElementById("root"));    
