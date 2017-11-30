import React, { Component } from 'react';
import ftlogo from './ftlogo.png';
import './App.css';
import Startbutton from './Components/Startbutton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';


class Header extends Component {
  render() {
    return (
      <MuiThemeProvider>
       <Grid >
         <Row>
            <Col xs={12}>
          
              <Row center="xs">
             
                <img src={ftlogo} alt="ftlogo" />
                  <div>
                    < Startbutton />
                  </div>
              </Row>
             </Col>
             </Row>
      </Grid>   
      </MuiThemeProvider>
  
    );
  }

}


export default Header;
