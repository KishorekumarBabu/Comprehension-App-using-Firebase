import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './Components/layout/NavBar';
import Dashboard from './Components/dashboard/Dashboard';
import ContestantsDetails from './Components/contestants/contestantsDetails';
import CreateContestant from './Components/contestants/createContestant';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/SignUp';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/contestant/:id' component={ContestantsDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateContestant} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
