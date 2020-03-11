import React from "react";
import PropTypes from "prop-types";
import classes from "./NavigationItem.css";
import { NavLink } from "react-router-dom";
const navigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={props.link} exact activeClassName={classes.active}>
        {props.children}
      </NavLink>

      {/* <a href={props.link} className={props.active ? classes.active : null}>
        {props.children}
      </a> */}
    </li>
  );
};

navigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string
};

export default navigationItem;
