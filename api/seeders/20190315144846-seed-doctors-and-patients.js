const faker = require('faker');
const { Doctor, Patient, User, UserType } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    try {
      // get all of our user types with all related Users
      const userTypes = await UserType.findAll({
        raw: true,
        include: [
          { model: User, required: true, nest: true, attributes: ['id'] },
        ],
      });

      // prep doctor obj for insertion
      const doctorsArr = userTypes
        .filter(userType => userType.type === 'doctor')
        .map(doctorType => ({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          UserId: doctorType['User.id'],
        }));

      // pull off first doctor to attach to patient users
      const [firstDoctor] = await Doctor.bulkCreate(doctorsArr);

      // prep patients for insertion
      const patientsArr = userTypes
        .filter(userType => userType.type === 'patient')
        .map(patientType => ({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          age: faker.random.number(100),
          mailingAdress1: faker.address.streetAddress(),
          mailingAddress2: faker.address.secondaryAddress(),
          phone: '7185551313',
          UserId: patientType['User.id'],
          DoctorId: firstDoctor.id,
        }));

      await Patient.bulkCreate(patientsArr);
    } catch (err) {
      console.log('Seeding patients and doctors ERROR:', err);
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
