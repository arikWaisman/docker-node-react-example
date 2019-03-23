module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define(
    'UserType',
    {
      type: DataTypes.STRING,
    },
    {
      tableName: 'user_types',
    },
  );
  UserType.associate = models => {
    // associations can be defined here
    UserType.hasOne(models.User);
  };
  return UserType;
};
