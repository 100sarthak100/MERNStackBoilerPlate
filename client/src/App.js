import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';

function App() {
  return (
    <>
     <Switch>
       <Route path="/about" component={About} />
       <Route path="/login" component={Login} />
       <Route path="/" component={Home} />
     </Switch>
    </>
  );
}

export default App;
