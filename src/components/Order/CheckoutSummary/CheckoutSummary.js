import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
//import PropTypes from 'prop-types'

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h3 style={{ color: "green", display: "block" }}>
        Continue to order this delicious burger!
      </h3>
      <div className={classes.Burger}>
        <Burger
          ingredients={props.ingredients}
          cssStyle={{ overflow: "hidden" }}
        />
      </div>

      <Button btnType="Danger" clicked={props.orderCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.orderSent}>
        CONTINUE
      </Button>
    </div>
  );
};

checkoutSummary.propTypes = {};

export default checkoutSummary;
