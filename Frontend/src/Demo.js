import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import arch_wr from "./arch_wr.png";
import onfire from "./onfire.png";
import Sensors from "./Sensors";
import RaisedButton from "material-ui/RaisedButton";


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
              <img src={arch_wr} alt="architecture" />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Demo;

/*
<Col xs={6}>
          <img src={onfire} alt="room is burning" />
</Col>
*/