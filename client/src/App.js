import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


function App() {
  return (
    <div className="App">
    <Router>
    <Switch>
      <Route path='/' exact component={SignIn}/>
      <Route path='/SignUp' exact component={SignUp}/>
    </Switch>
    </Router>
    </div>
  );
}



export default App;
