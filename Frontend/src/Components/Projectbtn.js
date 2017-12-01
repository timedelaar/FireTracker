import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { amber400 } from "material-ui/styles/colors";
import Project from "material-ui/svg-icons/action/favorite-border";
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

const Projectbtn = () => (
  <div>
    <Link to={{ pathname: "/project" }}>
      <RaisedButton
        label="About the project"
        icon={<Project />}
        style={styles.button}
        backgroundColor={amber400}
      />
    </Link>
  </div>
);

export default Projectbtn;
