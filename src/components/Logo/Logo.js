import React from "react";
import logoPath from "../../assets/burger-logo.png";
import classes from "./Logo.css";
//import PropTypes from "prop-types";

const logo = function logo(props) {
  return <img className={classes.Logo} src={logoPath} alt="Burger-logo" />;
};

logo.propTypes = {};

export default logo;
