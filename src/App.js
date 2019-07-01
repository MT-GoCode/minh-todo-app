import React from 'react';
import './App.css';
import TodoList from './Todo'
import CreateAccount from './auth/CreateAccount'
import Login from './auth/Login'
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store";

function App() {
  return (
    <div className="App">
    <Router>
        <div >
          <Route exact path="/" component={CreateAccount} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/todo" component={TodoList} />
        </div>
      </Router>
    </div>
  );
}

export default App;
