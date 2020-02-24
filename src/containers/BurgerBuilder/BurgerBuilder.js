import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder";
import Modal from "../../components/UI/Modal/Modal";
import OrderSumary from "../../components/Burger/OrderSummary/OrderSummary";

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
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchasable = ingredients => {
    for (let key in ingredients) {
      if (ingredients[key]) return this.setState({ purchasable: true });
    }
    this.setState({ purchasable: false });
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
    this.updatePurchasable(newIngredients);
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
    this.updatePurchasable(newIngredients);
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };
  continuePurchasingHandler = () => {
    alert("Continue");
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    // let modal = this.state.purchasing ? (

    // ) : null;
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <div className={classes.BurgerBuilder}>
        <Modal
          show={this.state.purchasing}
          cancelPurchasing={this.cancelPurchasingHandler}
        >
          <OrderSumary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.cancelPurchasingHandler}
            purchaseContinued={this.continuePurchasingHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          types={Object.keys(this.state.ingredients)}
          increase={this.increaseIngredientHandler}
          decrease={this.decreaseIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchasing={this.purchasingHandler}
        />
      </div>
    );
  }
}
