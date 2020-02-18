import React, { memo } from "react";
import classes from "./BuildControl.css";
const buildControl = props => {
  console.log("object");
  const label = props.type
    .split("")
    .map((char, i) => {
      if (i === 0) return char.toUpperCase();
      return char;
    })
    .join("");
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
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

export default memo(buildControl);
