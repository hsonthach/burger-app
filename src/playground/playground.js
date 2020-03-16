// redux
import { connect } from "react-redux";

//redux map
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
const rootReducer = combineReducers({
  //
});

const store = createStore(rootReducer);
