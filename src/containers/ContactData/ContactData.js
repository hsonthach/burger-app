import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import validator from "validator";
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
        value: "",
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true,
          emailType: true
        },
        isValid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code"
        },
        value: "",
        validation: {
          postalCodeType: true
        },
        isValid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        isValid: true,
        touched: false
      }
    },
    isFormValid: false,
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

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return true;
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    if (rules.emailType) {
      isValid = validator.isEmail(value) && isValid;
    }
    return isValid;
  };

  checkForm = form => {
    let isValid = true;
    for (let key in form) {
      isValid = isValid && form[key].isValid;
    }
    return isValid;
  };

  inputchangedHandler = (key, event) => {
    let orderForm = { ...this.state.orderForm };
    orderForm[key].value = event.target.value;
    orderForm[key].isValid = this.checkValidity(
      orderForm[key].value,
      orderForm[key].validation
    );
    orderForm[key].touched = true;
    this.setState({ orderForm });
    this.setState({ isFormValid: this.checkForm(orderForm) });
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
          touched={this.state.orderForm[key].touched}
          changed={this.inputchangedHandler.bind(this, key)}
          isValid={this.state.orderForm[key].isValid}
        />
      );
    }

    let form = (
      <React.Fragment>
        <form onSubmit={this.orderHandler}>
          <h4>Enter Your Contact Data</h4>
          {formElement}
          <Button btnType="Success" disabled={!this.state.isFormValid}>
            ORDER
          </Button>
        </form>
      </React.Fragment>
    );
    if (this.state.loading) form = <Spinner />;
    return <div className={classes.ContactData}>{form}</div>;
  }
}
