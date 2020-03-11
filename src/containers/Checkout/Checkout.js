import React, { Component } from "react";
//import PropTypes from "prop-types";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import classes from "./Checkout.css";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import queryString from "query-string";
import { Route } from "react-router-dom";
import ContactData from "../ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    loading: false,
    error: null
  };
  static propTypes = {};

  orderCancelledHandler = () => {
    this.props.history.goBack();
  };

  orderSentHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let checkoutSummary = null;
    if (this.state.ingredients) {
      checkoutSummary = (
        <CheckoutSummary
          ingredients={this.state.ingredients}
          orderCancelled={this.orderCancelledHandler}
          orderSent={this.orderSentHandler}
        />
      );
    }
    if (this.state.loading) checkoutSummary = <Spinner />;
    if (this.state.error) checkoutSummary = <h1>{this.state.error.message}</h1>;
    return (
      <div className={classes.Checkout}>
        {checkoutSummary}
        <Route
          path={this.props.match.path + "/contact-data"}
          component={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
  loadData = () => {
    const data = queryString.parse(this.props.location.search);
    let allowedIngredients = ["bacon", "meat", "cheese", "salad", "totalPrice"];
    for (let key in data) {
      if (!allowedIngredients.includes(key))
        this.setState({ error: new Error("Invalid ingredients") });
    }
    return data;
  };
  componentDidMount() {
    let data;
    if (!this.state.error) {
      data = this.loadData();
      this.setState({
        ingredients: {
          bacon: data.bacon,
          salad: data.salad,
          meat: data.meat,
          cheese: data.cheese
        },
        totalPrice: data.totalPrice
      });
    }
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

export default withErrorHandler(Checkout, axios);
