import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import {Card, CardTitle, CardText} from 'material-ui/Card';

class AboutTheProject extends Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={2}>
            </Col>
            <Col xs={8}>
           
            <Card>

    <CardTitle title="About the project of Team Firetrackers" subtitle="In the lecture 'Open Source Software Design' by Prof. Song" />
    <CardText>
      <p>
    The main Idea for a smarter campus solution is to implement a smart fire recognition and warning. 
    </p>
    <p>
Thinking of a fire in a large building, with the help of a smart sensors construction, a mobile app can send push notifications while forwarding the alarm to everyone inside and outside the building.
Measurement and lighting box could contains several sensors measuring the environment. It also contains a lighting element to guide people down with the intention to help to trace the safest route outside the building and track people who are trapped.
This information could be used furthermore not only for the people in the building but also for firefighters to trace those who are currently inside and get an overview about the exact location & strength of the fire.
In case of a fire in the Gwanggeto Building, such an application could make a huge difference in lives lost during fire.
</p>
<p>
For the MVP we decided to focus on a prototype-project which consists in a hardware perspective of a raspberry with multiple sensors and actuators, for instance a temperature sensor, a gas sensor, an ADC convertor, an Infrared human detector and two lights (green and red). Our software receives the data of the sensors and in case they exceed a certain value, a trigger will be send. Our detailed procedures are explained in the following chapters.

</p>
    </CardText>
  </Card>
  </Col>
  <Col xs={2}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AboutTheProject;


