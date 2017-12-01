import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { amber800 } from "material-ui/styles/colors";
import Team from "material-ui/svg-icons/social/group";
import { Link } from "react-router-dom";

const styles = {
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: "pointer",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    opacity: 0
  }
};

const Teambtn = () => (
  <div>
    <Link to={{ pathname: "/team" }}>
      <RaisedButton
        label="About the Team"
        icon={<Team />}
        style={styles.button}
        backgroundColor={amber800}
      />
    </Link>
  </div>
);

export default Teambtn;
