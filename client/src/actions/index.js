import axios from 'axios';
import * as urls from '../includes/urls';
import {
  USER_SIGNIN_COMPLETE,
  USER_SIGNOUT_COMPLETE,
  LOAD_AUTH_FROM_STORAGE,
  VALID_TOKEN_COMPLETE,
  INVALID_TOKEN_COMPLETE,
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_COMPLETE,
  FETCH_PATIENT_DETAIL_REQUEST,
  FETCH_PATIENT_DETAIL_COMPLETE,
  UPDATE_PATIENT_DETAIL_COMPLETE,
} from './action_types';

export const loadTokenOnAppInit = () => {
  return dispatch => {
    const authData =
      window.localStorage.getItem('auth') &&
      JSON.parse(window.localStorage.getItem('auth'));

    return dispatch({
      type: LOAD_AUTH_FROM_STORAGE,
      payload: {
        token: (authData && authData.token) || null,
        user: (authData && authData.user) || null,
        isLoggedIn: (authData && authData.isLoggedIn) || false,
      },
    });
  };
};

export const signInUser = formValues => {
  return async dispatch => {
    try {
      const response = await axios.post(`${urls.USER_API}/signin`, formValues);

      const { user, token } = response.data;

      const { UserType, ...remainingUser } = user;

      const preppedPayload = {
        token,
        user: {
          ...remainingUser,
          UserType: UserType.type,
        },
        isLoggedIn: true,
      };

      window.localStorage.setItem('auth', JSON.stringify(preppedPayload));

      return dispatch({ type: USER_SIGNIN_COMPLETE, payload: preppedPayload });
    } catch (err) {
      console.log(err);
    }
  };
};

export const signOutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('auth');

    return dispatch({ type: USER_SIGNOUT_COMPLETE });
  };
};

export const checkToken = token => {
  return async dispatch => {
    try {
      const response = await axios.get(`${urls.USER_API}/logged_in`, {
        headers: {
          Authorization: token,
        },
      });

      // will be true or false
      if (!response.data) {
        window.localStorage.removeItem('auth');
        return dispatch({
          type: INVALID_TOKEN_COMPLETE,
        });
      }

      return dispatch({
        type: VALID_TOKEN_COMPLETE,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchPatients = (id, token, queryParams = {}) => {
  return async dispatch => {
    try {
      dispatch({ type: FETCH_PATIENTS_REQUEST });
      const response = await axios.get(`${urls.DOCTOR_API}/${id}/patients`, {
        params: queryParams,
        headers: {
          Authorization: token,
        },
      });
      return dispatch({
        type: FETCH_PATIENTS_COMPLETE,
        payload: {
          patients: response.data,
          filters: Object.values(queryParams).some(value => !!value),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchPatientDetail = (id, token) => {
  return async dispatch => {
    try {
      dispatch({
        type: FETCH_PATIENT_DETAIL_REQUEST,
      });

      const response = await axios.get(`${urls.PATIENT_API}/${id}/`, {
        headers: {
          Authorization: token,
        },
      });

      return dispatch({
        type: FETCH_PATIENT_DETAIL_COMPLETE,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePatientDetails = (id, token, formValues) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        `${urls.PATIENT_API}/${id}/`,
        formValues,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      return dispatch({
        type: UPDATE_PATIENT_DETAIL_COMPLETE,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
