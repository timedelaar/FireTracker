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
  constructor(props) {
    super(props);

    this.state = {
      value: "Receive value",
      temp: 0
    };
    this.setState.bind(this);
  }

  getInformation(t) {
    fetch(
      "http://localhost:7579/Mobius/Firetracker/Gwanggaeto_gwan/F1/ML_box_5/cnt_temp/latest",
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
        console.log("logger", responseJson["m2m:cin"].con);
        t.setState(prevState => {
          return { prevState, temp: responseJson["m2m:cin"].con };
        });
      })
      .catch(error => {
        console.error("Error in informationservice", error);
      });
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
                    value={this.state.sensor2}
                    onChange={event =>
                      this.setState({ sensor2: event.target.value })
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
                    value={this.state.sensor3}
                    onChange={event =>
                      this.setState({ sensor3: event.target.value })
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
