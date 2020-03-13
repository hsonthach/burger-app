import React, { Component } from "react";
import axios from "../../axios-orders";
import PropTypes from "prop-types";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

export default withErrorHandler(
  class Orders extends Component {
    state = {
      orders: [],
      loading: true
    };
    static propTypes = {};
    componentDidMount() {
      axios
        .get("/orders.json")
        .then(res => {
          let orders = [];
          for (let key in res.data) {
            orders.push({
              id: key,
              ingredients: res.data[key].ingredients,
              price: res.data[key].price
            });
          }
          this.setState({ orders, loading: false });
        })
        .catch(e => {
          this.setState({ loading: false });
        });
    }
    render() {
      if (this.state.loading) return <Spinner />;
      let orders = this.state.orders.map(order => {
        return (
          <Order
            ingredients={order.ingredients}
            price={+order.price}
            key={order.id}
            id={order.id}
          />
        );
      });
      return <div>{orders}</div>;
    }
  },
  axios
);
