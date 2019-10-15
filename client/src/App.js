import React from 'react';
import Dashboard from './views/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Dashboard/>
        </Route>
      </Switch>
    </Router>
  );
}
