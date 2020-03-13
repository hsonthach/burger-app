import React from "react";
//import PropTypes from "prop-types";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";
const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
};

navigationItems.propTypes = {};

export default navigationItems;
