import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    totalPrice: 4
  };

  increaseIngredientHandler = type => {
    const newIngredients = { ...this.state.ingredients };
    let additionalPrice = 0;
    for (const name in newIngredients) {
      if (name === type) {
        newIngredients[name]++;
        additionalPrice = INGREDIENT_PRICES[name];
      }
    }

    this.setState((prevState, props) => {
      return {
        ingredients: newIngredients,
        totalPrice: this.state.totalPrice + additionalPrice
      };
    });
  };

  decreaseIngredientHandler = type => {
    const newIngredients = { ...this.state.ingredients };
    let decreasePrice = 0;
    for (const name in newIngredients) {
      if (name === type && newIngredients[name] !== 0) {
        newIngredients[name]--;
        decreasePrice = INGREDIENT_PRICES[name];
      }
    }

    this.setState((prevState, props) => {
      return {
        ingredients: newIngredients,
        totalPrice: this.state.totalPrice - decreasePrice
      };
    });
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <div className={classes.BurgerBuilder}>
        <Burger ingredients={this.state.ingredients} />
        <p>Total Price : {this.state.totalPrice}</p>
        <BuildControls
          types={Object.keys(this.state.ingredients)}
          increase={this.increaseIngredientHandler}
          decrease={this.decreaseIngredientHandler}
          disabledInfo={disabledInfo}
        />
      </div>
    );
  }
}
