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

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  updatePurchasable = ingredients => {
    let purchasable = false;
    for (let key in ingredients) {
      if (ingredients[key] > 0) purchasable = true;
    }
    return purchasable;
  };

  addIngredientHandler = type => {
    this.props.addIngredient(type);
  };

  removeIngredientHandler = type => {
    this.props.removeIngredient(type);
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  cancelPurchasingHandler = () => {
    this.setState({ purchasing: false });
  };
  continuePurchasingHandler = () => {
    let params = [];
    for (let key in this.props.ingredients) {
      params.push(
        encodeURIComponent(key) +
          "=" +
          encodeURIComponent(this.props.ingredients[key])
      );
    }
    params.push(
      encodeURIComponent("totalPrice") +
        "=" +
        encodeURIComponent(this.props.totalPrice)
    );
    let query = "?" + params.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: query
    });
  };

  render() {
    let disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.state.error ? (
        <p>{this.state.error.message}</p>
      ) : (
        <Spinner />
      ),
      orderSumary = null;

    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            types={Object.keys(this.props.ingredients)}
            increase={this.addIngredientHandler}
            decrease={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ingredients)}
            purchasing={this.purchasingHandler}
          />
        </React.Fragment>
      );
      orderSumary = (
        <OrderSumary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.cancelPurchasingHandler}
          purchaseContinued={this.continuePurchasingHandler}
          totalPrice={this.props.totalPrice}
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
  ingredients: state.reducer.ingredients,
  totalPrice: state.reducer.totalPrice
});

const mapDispatchToProps = dispatch => ({
  addIngredient: (type, funcs) =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientType: type, funcs }),
  removeIngredient: (type, funcs) =>
    dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientType: type,
      funcs
    }),
  setIngredients: ingredients =>
    dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients })
});

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder),
  axios
);
