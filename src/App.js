import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import { BrowserRouter as Router } from "react-router-dom";
import "@material-ui/core/";
import BaseRouter from "./routes";
import ButtonAppBar from "./containers/navbar";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  //<ButtonAppBar {...this.props}>
  //</ButtonAppBar>
  render() {
    return (
      <div>
        <Router>
          <BaseRouter />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
