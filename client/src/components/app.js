import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import '../sass/main.scss';
import * as actions from '../actions';
import { connect } from 'react-redux';
import requireAuth from '../require_auth';
import requireUserOfTypes from '../require_user_type';
import UserSignin from './forms/user_signin';
import PatientEdit from './forms/patient_edit';
import PatientDetails from './patient_details';
import PatientList from './patients_list';

const PatientListWithAuth = requireAuth(
  requireUserOfTypes(PatientList, ['doctor']),
);

const PatientDetailsWithAuth = requireAuth(
  requireUserOfTypes(PatientDetails, ['doctor']),
);

const PatientEditWithAuth = requireAuth(
  requireUserOfTypes(PatientEdit, ['patient']),
);

class App extends Component {
  signOut = () => {
    this.props.signOutUser();
  };

  renderHomeComponent = () => {
    const { user } = this.props;

    const userType = (user && user.UserType) || null;

    if (userType && userType === 'doctor') {
      return (
        <>
          <h2>Hello, {this.props.user.userName}</h2>
          <Link to={`/patients/`}>View patients</Link>
        </>
      );
    }

    if (userType && userType === 'patient') {
      return (
        <>
          <h2>Hello, {this.props.user.userName}</h2>
          <Link to={`/patient/${user.id}/edit`}>View your details</Link>
        </>
      );
    }

    return (
      <div className="section">
        <Link to="/signin">Log in to go to your dashboard</Link>
      </div>
    );
  };

  renderSignInOrSignOut() {
    return this.props.isLoggedIn ? (
      <a href="#" onClick={this.signOut}>
        Sign Out
      </a>
    ) : (
      <Link to="/signin">Sign In</Link>
    );
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <nav>
            <div className="nav-wrapper container">
              <Link to="/" className="brand-logo left">
                Patient/Doctor
              </Link>
              <ul id="nav-mobile" className="right">
                <li>{this.renderSignInOrSignOut()}</li>
              </ul>
            </div>
          </nav>
          <main className="container">
            <Switch>
              <Route path="/" exact component={this.renderHomeComponent} />
              <Route path="/signin" component={UserSignin} />
              <Route path="/patients" component={PatientListWithAuth} />
              <Route
                path="/patient/:userId/detail"
                component={PatientDetailsWithAuth}
              />
              <Route
                path="/patient/:userId/edit"
                component={PatientEditWithAuth}
              />
              <Route path="*" render={() => <h1>Not Found</h1>} />
            </Switch>
          </main>
        </BrowserRouter>
      </>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
  loadAuthFromStorage: state.auth.loadAuthFromStorage,
});
export default connect(
  mapStateToProps,
  actions,
)(App);
