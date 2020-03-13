import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.css";
const Input = props => {
  let inputElement;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          onChange={props.changed}
          {...props.elementConfig}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option
                value={option.value}
                key={classes.Input + `__${option.value}`}
              >
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;

    default:
      inputElement = (
        <input className={classes.InputElement} {...props.elementConfig} />
      );
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {};

export default Input;
