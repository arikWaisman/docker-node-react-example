import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_COMPLETE,
  FETCH_PATIENT_DETAIL_REQUEST,
  FETCH_PATIENT_DETAIL_COMPLETE,
  UPDATE_PATIENT_DETAIL_COMPLETE,
  USER_SIGNOUT_COMPLETE,
} from '../actions/action_types';

const InitialState = {
  patients: null,
  currentPatient: null,
  isFetchingCurrentPatient: false,
  updated: false,
  patientsById: [],
  filters: false,
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case FETCH_PATIENTS_REQUEST:
      return {
        ...state,
        patients: null,
        patientsById: [],
      };

    case FETCH_PATIENTS_COMPLETE:
      return {
        ...state,
        patients: action.payload.patients.reduce((prevVal, patient) => {
          if (patient) {
            return { ...prevVal, [patient.UserId]: patient };
          }

          return prevVal;
        }, null),
        patientsById: action.payload.patients.reduce((prevVal, patient) => {
          return [...prevVal, patient.UserId];
        }, []),
        filters: action.payload.filters,
      };

    case FETCH_PATIENT_DETAIL_REQUEST:
      return {
        ...state,
        updated: false,
        isFetchingCurrentPatient: true,
      };
    case FETCH_PATIENT_DETAIL_COMPLETE:
      return {
        ...state,
        currentPatient: action.payload,
        isFetchingCurrentPatient: false,
      };

    case UPDATE_PATIENT_DETAIL_COMPLETE:
      return {
        ...state,
        currentPatient: action.payload,
        updated: true,
      };

    case USER_SIGNOUT_COMPLETE:
      return {
        ...state,
        ...InitialState,
      };

    default:
      return state;
  }
};
