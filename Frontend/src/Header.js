import React, { Component } from 'react';
import logo from './ring.png';
import ftlogo from './ftlogo.png';
import './App.css';
import Startbutton from './Components/Startbutton';
import Githubbtn from './Components/Githubbtn';
import Teambtn from './Components/Teambtn';
import Projectbtn from './Components/Projectbtn';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';


class Header extends Component {
  render() {
    return (
      <MuiThemeProvider>
       <Grid >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Team Firetrackers</h1>
          <Row>
          <Col xs={12}>
    <Row center="xs">
    <Teambtn />
    <Githubbtn />
    <Projectbtn />
    </Row>
  </Col>
       
</Row >

        </header>
        </div>
      </Grid>   
      </MuiThemeProvider>
  
    );
  }
}

export default Header;
