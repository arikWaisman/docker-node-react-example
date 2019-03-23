import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import Input from './input';
import { required } from '../../includes/validation';

class PatientEdit extends Component {
  componentDidMount() {
    const { user, token } = this.props;

    if (!user || !token) {
      return null;
    }

    this.props.fetchPatientDetail(user.id, token);
  }

  handleOnFormSubmit = formValues => {
    const { user, token } = this.props;

    if (!user || !token) {
      return null;
    }

    this.props.updatePatientDetails(user.id, token, formValues);
  };

  render() {
    const {
      handleSubmit,
      invalid,
      pristine,
      submitting,
      updated,
      isFetchingCurrentPatient,
    } = this.props;

    if (isFetchingCurrentPatient) {
      return null;
    }

    return (
      <div className="row">
        <form
          className="col m12 l6 offset-l3"
          onSubmit={handleSubmit(this.handleOnFormSubmit)}
        >
          <h3 className="center-align">Edit your details</h3>
          {updated && <p>Your details have been updated</p>}
          <div className="row">
            <Field
              label="First name"
              name="firstName"
              type="text"
              placeholder=""
              wrapperClass="col s12"
              validate={[required]}
              component={Input}
            />
            <Field
              label="Last name"
              name="lastName"
              type="text"
              placeholder=""
              wrapperClass="col s12"
              validate={[required]}
              component={Input}
            />
            <Field
              label="Age"
              name="age"
              type="text"
              placeholder=""
              wrapperClass="col s12"
              validate={[required]}
              component={Input}
            />
            <Field
              label="Mailing address 1"
              name="mailingAdress1"
              type="text"
              placeholder=""
              wrapperClass="col s12"
              validate={[required]}
              component={Input}
            />
            <Field
              label="Mailing address 2"
              name="mailingAdress2"
              type="text"
              placeholder=""
              wrapperClass="col s12"
              validate={[]}
              component={Input}
            />
            <Field
              label="Phone"
              name="phone"
              type="text"
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
                Save
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

PatientEdit = reduxForm({ form: 'patientEdit' })(PatientEdit);

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  initialValues: state.patient.currentPatient,
  isFetchingCurrentPatient: state.patient.isFetchingCurrentPatient,
  updated: state.patient.updated,
});

export default connect(
  mapStateToProps,
  actions,
)(PatientEdit);
