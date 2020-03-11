import React, { Component } from "react";
import classes from "./Modal.css";
import BackDrop from "../BackDrop/BackDrop";
class modal extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    return prevProps.show !== this.props.show || prevProps.loading === true;
  }
  render() {
    return (
      <React.Fragment>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
        <BackDrop clicked={this.props.modalClosed} show={this.props.show} />
      </React.Fragment>
    );
  }
}

export default modal;
