import React, { PureComponent } from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

// const controls = [
//   { label: "Meat", type: "meat" },
//   { label: "Salad", type: "salad" },
//   { label: "Cheese", type: "cheese" },
//   { label: "Bacon", type: "bacon" }
// ];

class BuildControls extends PureComponent {
  render() {
    return (
      <div className={classes.BuildControls}>
        {this.props.types.map(type => (
          <BuildControl
            key={type}
            type={type}
            increase={this.props.increase}
            decrease={this.props.decrease}
            disabled={this.props.disabledInfo[type]}
          />
        ))}
      </div>
    );
  }
}

export default BuildControls;
