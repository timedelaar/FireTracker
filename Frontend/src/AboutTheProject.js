import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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


