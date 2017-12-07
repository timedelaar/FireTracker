import React, { Component } from "react";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Grid, Row, Col } from "react-flexbox-grid";
import { grey900, amber900 } from "material-ui/styles/colors";

const styles = {
  errorStyle: {
    color: grey900
  },
  underlineStyle: {
    borderColor: amber900
  },
  floatingLabelStyle: {
    color: grey900
  },
  floatingLabelFocusStyle: {
    color: grey900
  }
};

class Sensors extends Component {

  constructor(props, building, floor, box, element) {
    super(props);

    this.info = {
      building: building,
      floor: floor,
      box: box
    }

    this.state = {
      value: "Receive value",
      temp: 0,
      smoke: 0,
      people: 0
    };
    this.setState.bind(this);
  }

  getValue(t, value, building, floor, box, container) {
    fetch(
      "http://localhost:7579/Mobius/Firetracker/" + building + "/" + floor + "/" + box + "/" + container + "/latest",
      {
        method: "GET",
        headers: {
          "X-M2M-RI": "12345",
          "X-M2M-Origin": "SOrigin",
          Accept: "application/json"
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        t.setState(prevState => {
          if (responseJson["m2m:cin"]) {
            console.log('holaaa')
            return { prevState, [value]: responseJson["m2m:cin"].con };
          } else {
            return { prevState }
          }
        });
      })
      .catch(error => {
        console.error("Error in informationservice", error);
      });
  }

  getInformation(t) {
    t.getValue(t, 'temp', this.info.building, this.info.floor, this.info.box, "cnt_temp");
    t.getValue(t, 'smoke', this.info.building, this.info.floor, this.info.box, "cnt_smoke");
    t.getValue(t, 'people', this.info.building, this.info.floor, this.info.box, "cnt_people");
  }

  componentDidMount() {
    this.getInformation(this);

    setInterval(this.getInformation, 1000, this);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Grid>
          <br />
          <br />
          <Row>
            <Col xs={12}>
              <div>
                <Row center="xs">
                  <TextField
                    id="sensor1"
                    label="Temperature Sensor"
                    hintText="Placeholder for value"
                    errorText="Temperature Sensor"
                    errorStyle={styles.errorStyle}
                    value={this.state.temp}
                    onChange={event =>
                      this.setState({ sensor1: event.target.value })
                    }
                    margin="normal"
                  />
                  <br />
                  <br />
                  <br />
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <div>
                <Row center="xs">
                  <TextField
                    id="sensor2"
                    label="Smoke Sensor"
                    hintText="Placeholder for value"
                    errorText="Smoke Sensor"
                    errorStyle={styles.errorStyle}
                    value={this.state.smoke}
                    onChange={event =>
                      this.setState({ smoke: event.target.value })
                    }
                    margin="normal"
                  />

                  <br />
                  <br />
                  <br />
                </Row>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <div>
                <Row center="xs">
                  <TextField
                    id="sensor3"
                    label="Infrared Sensor"
                    hintText="Placeholder for value"
                    errorText="Infrared Sensor"
                    errorStyle={styles.errorStyle}
                    value={this.state.people}
                    onChange={event =>
                      this.setState({ people: event.target.value })
                    }
                    margin="normal"
                  />
                  <br />
                  <br />
                  <br />
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default Sensors;
