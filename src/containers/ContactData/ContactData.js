import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
//import PropTypes from 'prop-types'

export default class ContactData extends Component {
  state = {
    ingredients: null,
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  static propTypes = {};
  orderHandler = event => {
    event.preventDefault();
    this.setState({
      ingredients: this.props.ingredients
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice, // The price should not be sent in production in case users manipulate code
      customer: {
        name: this.state.name,
        address: this.state.address,
        email: this.state.email,
        deliveryMethod: "fastest"
      }
    };
    this.setState({ loading: true });
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        //this.props.history.push("/");
      })
      .catch(e => {
        this.setState({ loading: false });
        throw new Error("Loading false");
      });
  };

  render() {
    let form = (
      <React.Fragment>
        <h4>Enter Your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="text" name="email" placeholder="Your Email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postalCode" placeholder="Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    if (this.state.loading) form = <Spinner />;
    return <div className={classes.ContactData}>{form}</div>;
  }
}
