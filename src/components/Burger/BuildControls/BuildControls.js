import React, { PureComponent } from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

class BuildControls extends PureComponent {
  render() {
    return (
      <div className={classes.BuildControls}>
        <p>
          Total Price : <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        {this.props.types.map(type => (
          <BuildControl
            key={type}
            type={type}
            increase={this.props.increase}
            decrease={this.props.decrease}
            disabled={this.props.disabledInfo[type]}
          />
        ))}
        <button
          className={classes.OrderButton}
          disabled={!this.props.purchasable}
          onClick={this.props.purchasing}
        >
          ORDER NOW
        </button>
      </div>
    );
  }
}

export default BuildControls;
