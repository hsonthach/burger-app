import React, { Component } from "react";
import classes from "./Layout.css";
import Toolbar from "../../components/UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: true
  };
  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar toggledSideDrawer={this.toggleSideDrawerHandler} />
        <SideDrawer
          toggledSideDrawer={this.toggleSideDrawerHandler}
          show={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
