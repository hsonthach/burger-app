import React from "react";
import classes from "./BackDrop.css";
const backDrop = props => {
  if (props.show)
    return <div className={classes.BackDrop} onClick={props.clicked}></div>;
  return null;
};

export default backDrop;
