const getPatientByUserId = require('./get_patient_by_user_id');
const updatePatientByUserId = require('./update_patient_by_user_id');
const getAllDoctorsPatientsByUserId = require('./get_all_doctors_patients_by_user_id');

module.exports = {
  getPatientByUserId,
  updatePatientByUserId,
  getAllDoctorsPatientsByUserId,
};
