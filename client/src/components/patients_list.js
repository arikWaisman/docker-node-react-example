import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import Input from './forms/input';

class PatientList extends Component {
  state = {
    firstName: '',
    lastName: '',
  };

  componentDidMount() {
    const { user, token } = this.props;

    if (!user || !token) {
      return null;
    }

    this.props.fetchPatients(user.id, token);
  }

  onFilterFieldsChange = e => {
    this.setState({
      [e.target.name]: e.target.value.trim(),
    });
  };

  onFilterSubmit = e => {
    const { user, token } = this.props;

    if (!user || !token) {
      return null;
    }

    const { firstName, lastName } = this.state;

    this.props.fetchPatients(user.id, token, {
      firstName,
      lastName,
    });
  };

  renderPatientsList = () => {
    const { patients, patientsById, filters } = this.props;

    if (!patients && filters) {
      return 'No matching patients found';
    }

    if (!patients || !patientsById.length) {
      return null;
    }

    return patientsById.map(patientIds => {
      const patient = patients[patientIds];
      return (
        <div key={patient.id} className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <p>First name: {patient.firstName}</p>
              <p>Last name: {patient.lastName}</p>
              <p>Age: {patient.age}</p>
            </div>
            <div className="card-action">
              <Link to={`/patient/${patient.UserId}/detail`}>See More</Link>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <>
        <div className="row">
          <h3>Search by</h3>
          <Input
            label=""
            name="firstName"
            type="text"
            placeholder="First name"
            wrapperClass="col s12 m6"
            onChange={this.onFilterFieldsChange}
          />
          <Input
            label=""
            name="lastName"
            type="text"
            placeholder="Last name"
            wrapperClass="col s12 m6"
            onChange={this.onFilterFieldsChange}
          />
          <div className="input-field col s12">
            <button
              className="btn waves-effect waves-light center right"
              type="submit"
              name="action"
              onClick={this.onFilterSubmit}
            >
              Filter
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
        {this.renderPatientsList()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
  patients: state.patient.patients,
  patientsById: state.patient.patientsById,
  filters: state.patient.filters,
});

export default connect(
  mapStateToProps,
  actions,
)(PatientList);
