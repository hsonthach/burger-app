import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder";
import Modal from "../../components/UI/Modal/Modal";
import OrderSumary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

// redux
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
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
    let params = [];
    for (let key in this.state.ingredients) {
      params.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(this.state.ingredients[key])
      );
    }
    params.push(
      encodeURIComponent("totalPrice") +
        "=" +
        encodeURIComponent(this.state.totalPrice)
    );
    let query = "?" + params.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: query
    });
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    console.log(this.props);
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.state.error ? (
        <p>{this.state.error.message}</p>
      ) : (
        <Spinner />
      ),
      orderSumary = null;

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
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
        </React.Fragment>
      );
      orderSumary = (
        <OrderSumary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.cancelPurchasingHandler}
          purchaseContinued={this.continuePurchasingHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) orderSumary = <Spinner />;

    return (
      <div className={classes.BurgerBuilder}>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.cancelPurchasingHandler}
          loading={this.state.loading}
        >
          {orderSumary}
        </Modal>
        {burger}
      </div>
    );
  }

  // componentDidMount() {
  //   axios
  //     .get("/ingredients.json")
  //     .then(res => {
  //       this.setState({ ingredients: res.data });
  //     })
  //     .catch(e => {
  //       this.setState({
  //         error: new Error(`Can't load the ingredients from server`)
  //       });
  //     });
  // }
}
const mapStateToProps = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
  addIngredient: type =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientType: type }),
  setIngredients: ingredients =>
    dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients })
});

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder),
  axios
);
