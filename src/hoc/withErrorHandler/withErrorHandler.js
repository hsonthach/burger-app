import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }
    state = {
      error: null
    };
    errorClosedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error ? true : false}
            modalClosed={this.errorClosedHandler}
          >
            <p>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
    componentWillUnmount() {
      axios.interceptors.response.eject(this.resInterceptors);
    }
  };
};
export default withErrorHandler;
