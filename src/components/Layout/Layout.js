import React, { Component } from "react";
import classes from "./Layout.css";
import Toolbar from "../UI/Navigation/Toolbar/Toolbar";
import SideDrawer from "../UI/Navigation/SideDrawer/SideDrawer";
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
        <div>Toolbar,SideDrawer,Backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
