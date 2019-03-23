import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import * as urls from '../../includes/urls';
import Input from './input';
import { required } from '../../includes/validation';

class UserSignin extends Component {
  componentDidUpdate() {
    const { user, isLoggedIn } = this.props;

    if (isLoggedIn && user) {
      const userType = (user && user.UserType) || null;
      const userId = (user && user.id) || null;
      const redirectTo = urls.getDashboardByUserType(userType, userId);
      this.props.history.push(redirectTo);
    }
  }

  handleOnFormSubmit = formValues => {
    this.props.signInUser(formValues);
  };

  render() {
    const { handleSubmit, invalid, pristine, submitting } = this.props;

    return (
      <div className="row">
        <form
          className="col m12 l6 offset-l3"
          onSubmit={handleSubmit(this.handleOnFormSubmit)}
        >
          <h3 className="center-align">Sign in to view dashboard</h3>
          <div className="row">
            <Field
              label="Username"
              name="userName"
              type="text"
              placeholder=""
              wrapperClass="col s12"
              validate={[required]}
              component={Input}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              placeholder=""
              wrapperClass="col s12"
              validate={[required]}
              component={Input}
            />

            <div className="input-field col s12">
              <button
                className="btn waves-effect waves-light center right"
                type="submit"
                name="action"
                disabled={invalid || submitting || pristine}
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

UserSignin = reduxForm({ form: 'checkoutForm' })(UserSignin);

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  actions,
)(UserSignin);
