import React, { memo } from "react";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import PropTypes from "prop-types";
import classes from "./SideDrawer.css";
import BackDrop from "../../BackDrop/BackDrop";

const sideDrawer = memo(function sideDrawer(props) {
  let sideDrawerClass = [
    classes.SideDrawer,
    props.show ? classes.Open : classes.Close
  ].join(" ");
  return (
    <React.Fragment>
      <div className={classes.BackDrop}>
        <BackDrop show={props.show} clicked={props.toggledSideDrawer} />
      </div>
      <div className={sideDrawerClass}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
});

sideDrawer.propTypes = {
  toggledSideDrawer: PropTypes.func
};

export default sideDrawer;
