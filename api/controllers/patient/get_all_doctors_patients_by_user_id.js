const { Op } = require('sequelize');
const { Patient, Doctor } = require('../../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { firstName, lastName } = req.query;
    console.log(firstName);

    let searchQuery = {};

    if (firstName || lastName) {
      searchQuery = {
        [Op.and]: [
          firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : {},
          lastName ? { lastName: { [Op.like]: `%${lastName}%` } } : {},
        ],
      };
    }

    const doctor = await Doctor.findOne({ where: { userId: id } });

    const patients = await Patient.findAll({
      where: {
        doctorId: doctor.get('id'),
        ...searchQuery,
      },
      raw: true,
    });

    return res.json(patients);
  } catch (err) {
    console.log('get all doctors patients ERROR:', err);

    return res.status(400).json({
      msg: `There was a problem fetching patients for user id "${id}"`,
      error: err,
    });
  }
};
