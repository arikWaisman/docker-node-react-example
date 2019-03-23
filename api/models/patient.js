module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'Patient',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      age: DataTypes.INTEGER,
      mailingAdress1: {
        type: DataTypes.STRING,
      },
      mailingAddress2: {
        type: DataTypes.STRING,
      },
      phone: DataTypes.STRING(15),
    },
    {
      tableName: 'patients',
      // underscored: true,
    },
  );
  Patient.associate = models => {
    // associations can be defined here
    Patient.belongsTo(models.Doctor);
    Patient.belongsTo(models.User);
  };
  return Patient;
};
