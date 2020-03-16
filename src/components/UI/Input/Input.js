import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.css";
const Input = props => {
  let inputElement;
  let errorMessage = null;
  let inputClasses = [classes.InputElement];
  if (!props.isValid && props.touched) {
    inputClasses.push(classes.Invalid);
    errorMessage = (
      <p className={classes.ErrorMessage}>Please enter valid input</p>
    );
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
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
        <input className={inputClasses.join(" ")} {...props.elementConfig} />
      );
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

Input.propTypes = {};

export default Input;
