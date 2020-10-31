import React from "react";
import "./App.css";
import LOGIN from "./componenets/login";

import {
	BrowserRouter as Router,
	Route
  } from "react-router-dom";
  
  
  
const App = () => {
	return (
			<Router>
			<Route path="/"><LOGIN /></Route>
			</Router>
		
	);
}

export default App;
