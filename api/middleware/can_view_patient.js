const { Patient } = require('../models');

// middleware to ensure that patients can only acces their own data
module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findOne({ where: { userId: id } });

    if (
      req.userType === 'patient' &&
      patient.get('UserId') !== req.user.id &&
      req.userType !== 'doctor'
    ) {
      return res.status(422).json({ msg: 'You can only edit your own data' });
    }

    req.patient = patient;

    return next();
  } catch (err) {
    console.log('logged in patient ERROR:', err);

    return res.status(400).json({
      msg: 'There was a problem verifying logged in patient',
      error: err,
    });
  }
};
