import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import people from './people.png';



class AboutTheTeam extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
          <Col xs={3} />
            <Col xs={2} >  
            <br/>
            <br/>
            <br/>
               <img src={people} /> 
            </Col>
          <Col xs={2} />
            
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AboutTheTeam;


