import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import patientReducer from './patient_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  patient: patientReducer,
});

export default rootReducer;
