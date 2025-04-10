import React from "react"; //allows to use the React library for building user interfaces in a React application
import ReactDOM from "react-dom"; //allows to use the ReactDOM library, which is a part of React, for rendering React components to the DOM (Document Object Model) in a web application.
import App from "./components/App";//imports the App component from a file located in the "components" folder of the current directory. This allows you to use the App component in the current file and use it as part of your React application.

//Renders the main component App into the HTML element with the ID "root"
ReactDOM.render(<App />, document.getElementById("root"));

