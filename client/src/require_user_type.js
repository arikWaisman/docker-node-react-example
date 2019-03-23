import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import * as urls from './includes/urls';

export default function(ComposedComponent, allowedUserType = []) {
  class UserTypePermission extends Component {
    render() {
      const { isLoggedIn, user } = this.props;

      if (!isLoggedIn || !user || !user.UserType) {
        return null;
      }

      if (allowedUserType.indexOf(user.UserType) < 0) {
        console.log(
          `Sorry ${user.UserType}'s are not allowed to access this page`,
        );

        const userType = (user && user.UserType) || null;
        const userId = (user && user.id) || null;
        const redirectTo = urls.getDashboardByUserType(userType, userId);

        this.props.history.push(redirectTo);
        return null;
      }

      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  });

  return connect(
    mapStateToProps,
    actions,
  )(UserTypePermission);
}
