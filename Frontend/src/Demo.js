import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import arch_wr from "./arch_wr.png";
import firesmall from "./firesmall.png";
import Sensors from "./Sensors";
import RaisedButton from "material-ui/RaisedButton";
import { amber600 } from "material-ui/styles/colors";

class Demo extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <br />
          <br />
          <br />
          <Row>
            <Col xs={6}>
              <Sensors />
            </Col>
            <Col xs={6}>
            <RaisedButton
             label="Room1"
             backgroundColor={amber600}
            />
              <img src={arch_wr} alt="architecture" />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Demo;
