import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

export default function(ComposedComponent) {
  class AuthenticatedUser extends Component {
    state = {
      tokenChecked: false,
    };

    componentDidMount() {
      if (this.props.authLoadedIntoState) {
        this.checkToken();
      }
    }

    componentDidUpdate() {
      this.checkToken();
    }

    checkToken = () => {
      if (!this.props.token || !this.props.isLoggedIn) {
        return this.props.history.replace('/signin');
      }

      if (!this.state.tokenChecked) {
        this.props.checkToken(this.props.token);
        this.setState({ tokenChecked: true });
      }
    };

    render() {
      const { isLoggedIn, tokenChecked, token } = this.props;

      if (!tokenChecked || !isLoggedIn || !token || !this.state.tokenChecked) {
        return null;
      }

      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    authLoadedIntoState: state.auth.authLoadedIntoState,
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    user: state.auth.user,
    tokenChecked: state.auth.tokenChecked,
  });

  return connect(
    mapStateToProps,
    actions,
  )(AuthenticatedUser);
}
