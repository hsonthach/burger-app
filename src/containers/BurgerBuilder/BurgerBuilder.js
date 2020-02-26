import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import classes from "./BurgerBuilder";
import Modal from "../../components/UI/Modal/Modal";
import OrderSumary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

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
    //alert("Continue");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, // The price should not be sent in production in case users manipulate code
      customer: {
        name: "Test",
        address: {
          street: "None",
          zipCode: "9999",
          country: "VietNam"
        },
        email: "test@test.com",
        deliveryMethod: "fastest"
      }
    };
    this.setState({ loading: true });
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(e => {
        this.setState({ loading: false });
      });
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.state.error ? <p>{this.state.error}</p> : <Spinner />,
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
          loading={this.props.loading}
        >
          {orderSumary}
        </Modal>
        {burger}
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(e => {
        this.setState({ error: `Can't load the ingredients from server` });
      });
  }
}

export default withErrorHandler(BurgerBuilder, axios);
