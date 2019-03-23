import React, { Component } from 'react';
import { connect } from 'react-redux';

class PatientDetail extends Component {
  componentDidMount() {
    const { patients, user, token } = this.props;

    if (!user || !token || patients) {
      return null;
    }

    this.props.fetchPatients(user.id, token);
  }

  render() {
    const {
      match: { params },
      patients,
    } = this.props;

    if (!patients) {
      return null;
    }

    const patient = patients[params.userId];
    return (
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <p>First name: {patient.firstName}</p>
            <p>Last name: {patient.lastName}</p>
            <p>Age: {patient.age}</p>
            <p>Mailing Address 1: {patient.mailingAdress1}</p>
            <p>Mailing Address 2: {patient.mailingAdress2}</p>
            <p>Phone: {patient.phone}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patient.patients,
  patientsById: state.patient.patientsById,
});
export default connect(mapStateToProps)(PatientDetail);
