import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    errorClosedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} modalClosed={this.errorClosedHandler}>
            <p>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
    componentWillMount() {
      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }
    componentWillUnmount() {
      console.log("Component will unmount", this.resInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }
  };
};
export default withErrorHandler;
