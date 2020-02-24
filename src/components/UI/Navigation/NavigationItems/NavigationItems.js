import React, { memo } from "react";
//import PropTypes from "prop-types";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";
const navigationItems = memo(function navigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active={true}>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/" active={false}>
        Check out
      </NavigationItem>
    </ul>
  );
});

navigationItems.propTypes = {};

export default navigationItems;
