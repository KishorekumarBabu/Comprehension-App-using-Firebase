import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./Components/layout/navBar";
import PassageList from "./Components/passage/passageList";
import PassageDetails from "./Components/passage/passageDetails";
import Dashboard from "./Components/dashboard/dashboard";
import CreatePassage from "./Components/passage/createPassage";
import SignIn from "./Components/auth/signIn";
import SignUp from "./Components/auth/signUp";
import Result from "./Components/results/resultDetails";
import ResultsList from "./Components/results/resultsList";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/user/:userId" component={Dashboard} />
            <Route exact path="/user/:userId/passage" component={PassageList} />
            <Route
              exact
              path="/user/:userId/passage/:passageId"
              component={PassageDetails}
            />
            <Route exact path="/user/:userId/result" component={ResultsList} />
            <Route
              exact
              path="/user/:userId/result/passage/:passageId"
              component={Result}
            />
            <Route
              path="/user/:userId/createPassage"
              component={CreatePassage}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
