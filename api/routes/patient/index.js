const { Router } = require('express');
const {
  getPatientByUserId,
  updatePatientByUserId,
} = require('../../controllers/patient');

const authorizedToken = require('../../middleware/authorized_token');
const authorizedUserType = require('../../middleware/authorized_user_type');
const canViewPatient = require('../../middleware/can_view_patient');

const router = Router();

router.get(
  '/:id',
  authorizedToken,
  authorizedUserType(['patient', 'doctor']),
  canViewPatient,
  getPatientByUserId,
);

router.post(
  '/:id',
  authorizedToken,
  authorizedUserType(['patient']),
  canViewPatient,
  updatePatientByUserId,
);
module.exports = router;
