module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    'Doctor',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'doctors',
    },
  );
  Doctor.associate = models => {
    // associations can be defined here
    Doctor.hasOne(models.Patient);
    Doctor.belongsTo(models.User);
  };
  return Doctor;
};
