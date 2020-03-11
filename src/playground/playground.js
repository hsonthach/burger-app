// const axios = require("axios");
// axios.interceptors.response.use(
//   res => {
//     console.log("Interceptors response");
//     return res;
//   },
//   error => {
//     console.log(error.message);
//   }
// );

// axios
//   .get("https://burger-app-8b24d.firebaseio.com/ingredients.json")
//   .then(res => {
//     console.log(res.status);
//     console.log("Always run eventhough there is error");
//   })
//   .catch(e => {
//     console.log(e.message);
//     console.log("Error");
//   });

//rccp
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class playground extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return <div></div>;
  }
}

//rafcp
import React from "react";
import PropTypes from "prop-types";

const playground = props => {
  return <div></div>;
};

playground.propTypes = {};

export default playground;
