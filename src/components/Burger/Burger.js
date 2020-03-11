import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";
import PropTypes from "prop-types";

const burger = props => {
  let types = [];
  let ammount;
  for (const ingredient in props.ingredients) {
    ammount = props.ingredients[ingredient];
    for (let i = 0; i < ammount; i++) types.push(ingredient);
  }
  let burgerIngredients = types.map((type, i) => (
    <BurgerIngredient type={type} key={type + i} />
  ));
  if (burgerIngredients.length === 0)
    burgerIngredients = <p>Please start adding ingredients</p>;

  return (
    <div className={classes.Burger} style={props.cssStyle}>
      <BurgerIngredient type="bread-top" />
      {burgerIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.object
};

export default burger;
