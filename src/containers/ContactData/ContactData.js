import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
//import PropTypes from 'prop-types'

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };
  static propTypes = {};
  orderHandler = event => {
    event.preventDefault();
    let submitForm = {};
    for (let key in this.state.orderForm) {
      submitForm[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice, // The price should not be sent in production in case users manipulate code
      customer: submitForm
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

  inputchangedHandler = (key, event) => {
    let orderForm = { ...this.state.orderForm };
    orderForm[key].value = event.target.value;
    this.setState(orderForm);
  };
  render() {
    let formElement = [];
    for (let key in this.state.orderForm) {
      formElement.push(
        <Input
          elementConfig={this.state.orderForm[key].elementConfig}
          value={this.state.orderForm[key].value}
          elementType={this.state.orderForm[key].elementType}
          key={key}
          changed={this.inputchangedHandler.bind(this, key)}
        />
      );
    }
    let form = (
      <React.Fragment>
        <form onSubmit={this.orderHandler}>
          <h4>Enter Your Contact Data</h4>
          {formElement}
          <Button btnType="Success">ORDER</Button>
        </form>
      </React.Fragment>
    );
    if (this.state.loading) form = <Spinner />;
    return <div className={classes.ContactData}>{form}</div>;
  }
}
