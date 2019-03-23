const { Router } = require('express');
const { getAllDoctorsPatientsByUserId } = require('../../controllers/patient');

const authorizedToken = require('../../middleware/authorized_token');
const authorizedUserType = require('../../middleware/authorized_user_type');
const canViewPatient = require('../../middleware/can_view_patient');

const router = Router();

router.get(
  '/:id/patients',
  authorizedToken,
  authorizedUserType('doctor'),
  canViewPatient,
  getAllDoctorsPatientsByUserId,
);

module.exports = router;
