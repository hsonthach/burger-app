import React from "react";
import classes from "./BuildControl.css";

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label} style={{ textTransform: "capitalize" }}>
        {props.type}
      </div>
      <button
        className={classes.Less}
        onClick={props.decrease.bind(this, props.type)}
        disabled={props.disabled}
      >
        Less
      </button>
      <button
        className={classes.More}
        onClick={props.increase.bind(this, props.type)}
      >
        More
      </button>
    </div>
  );
};

export default buildControl;
