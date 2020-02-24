import React from "react";
import classes from "./DrawerToggle.css";

const drawerToggle = function drawerToggle(props) {
  return (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

drawerToggle.propTypes = {};

export default drawerToggle;
