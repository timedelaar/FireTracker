import React, { Component } from "react";
import "./App.css";
import StartPage from "./StartPage";
import AboutTheTeam from "./AboutTheTeam";
import AboutTheProject from "./AboutTheProject";
import Demo from "./Demo";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "./Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Header />
            <hr />
            <Route exact path="/" component={StartPage} />
            <Route path="/team" component={AboutTheTeam} />
            <Route path="/project" component={AboutTheProject} />
            <Route path="/demo" component={Demo} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
