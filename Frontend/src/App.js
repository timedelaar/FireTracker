import React, { Component } from 'react';
import logo from './ring.png';
import ftlogo from './ftlogo.png';
import './App.css';
import StartPage from './StartPage';
import AboutTheTeam from './AboutTheTeam';
import AboutTheProject from './AboutTheProject';
import Demo from './Demo';
import Startbutton from './Components/Startbutton';
import Githubbtn from './Components/Githubbtn';
import Teambtn from './Components/Teambtn';
import Projectbtn from './Components/Projectbtn';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { BrowserRouter as Router, Route } from "react-router-dom";

injectTapEventPlugin();

class App extends Component {
  render() {

    const StartPageRoute = () =>
    <div>
      {<StartPage />}
    </div>;

  const TeamRoute = () =>
    <div>
      {<AboutTheTeam />}
    </div>;

  const ProjectRoute = () =>
    <div>
      {<AboutTheProject />}
    </div>;

  const DemoRoute = () =>
    <div>
      {<Demo />}
    </div>;


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
