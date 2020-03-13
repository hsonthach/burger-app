import React from "react";
import classes from "./Order.css";
import PropTypes from "prop-types";

const Order = props => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push(
      <span
        key={props.id + "__" + key}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          border: "1px solid #ccc",
          margin: "0 1px",
          padding: "5px"
        }}
      >
        {key} ({props.ingredients[key]})
      </span>
    );
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients :{ingredients} </p>
      <p>
        Price: <strong> USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

Order.propTypes = {};

export default Order;
