const { User, UserType } = require('../models');

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
      // start fresh by nuking all data
      await queryInterface.bulkDelete('patients', null, {});
      await queryInterface.bulkDelete('doctors', null, {});
      await queryInterface.bulkDelete('users', null, {});
      await queryInterface.bulkDelete('user_types', null, {});

      // build the to types we care about
      const [doctorObj, patientObj] = await UserType.bulkCreate([
        {
          type: 'doctor',
        },
        {
          type: 'patient',
        },
      ]);

      // insert users, a single doctor and several patients
      return User.bulkCreate([
        {
          id: 1,
          userName: 'doctor1',
          password: 'secret',
          email: 'test@doctor.com',
          UserTypeId: doctorObj.get('id'),
        },
        {
          id: 2,
          userName: 'patient1',
          password: 'secret',
          email: 'test@patient1.com',
          UserTypeId: patientObj.get('id'),
        },
        {
          id: 3,
          userName: 'patient2',
          password: 'secret',
          email: 'test@patient2.com',
          UserTypeId: patientObj.get('id'),
        },
        {
          id: 4,
          userName: 'patient3',
          password: 'secret',
          email: 'test@patient3.com',
          UserTypeId: patientObj.get('id'),
        },
        {
          id: 5,
          userName: 'patient4',
          password: 'secret',
          email: 'test@patient4.com',
          UserTypeId: patientObj.get('id'),
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('user_types', null, {});
    return queryInterface.bulkDelete('users', null, {});
  },
};
