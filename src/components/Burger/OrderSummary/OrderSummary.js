import React from "react";
import Button from "../../UI/Button/Button";
const orderSummary = props => {
  let ingredientSumary = [];
  for (let key in props.ingredients) {
    ingredientSumary.push(
      <li key={`${key}__orderSummary`}>
        <span style={{ textTransform: "capitalize" }}>{key}</span> :{" "}
        {props.ingredients[key]}
      </li>
    );
  }
  return (
    <React.Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with following ingredients</p>
      <ul>{ingredientSumary}</ul>
      <p>Total Price is : {props.totalPrice.toFixed(2)}</p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </React.Fragment>
  );
};

export default orderSummary;
