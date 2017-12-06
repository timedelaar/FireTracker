import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import room from "./arch_wr.png";
import onfire from "./onfire.png";
import Sensors from "./Sensors";



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
              <img src={room} alt="architecture" />
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