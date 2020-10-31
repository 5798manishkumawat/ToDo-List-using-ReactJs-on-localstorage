import React from "react";
import "./App.css";
import LOGIN from "./componenets/login";
import {
	BrowserRouter as Router,
	Route
  } from "react-router-dom";
  
function App() {
	return (
		<Router>
		<div className="bg">
			<Route path="/"><LOGIN /></Route>
		</div>
		</Router>
	);
}

export default App;
