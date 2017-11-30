import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import {Card, CardTitle, CardText} from 'material-ui/Card';

class AboutTheProject extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={12}>
            <Card>

    <CardTitle title="About the project of Team Firetrackers" subtitle="In the lecture 'Open Source Software Design' by Prof. Song" />
    <CardText>
      
      to be written

    </CardText>
  </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AboutTheProject;


