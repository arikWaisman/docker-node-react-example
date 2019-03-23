const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      hooks: {
        beforeCreate: async user => user.generateHashedPassword(),
        beforeBulkCreate: users => {
          users.map(user => user.generateHashedPassword());
        },
      },
    },
  );
  User.associate = models => {
    // associations can be defined here
    User.belongsTo(models.UserType);
  };

  User.prototype.validPassword = async function validPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.generateHashedPassword = function generateHashedPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  };

  User.prototype.generateToken = function generateToken() {
    return jwt.sign({ id: this.id }, config.jwtSecret, {
      expiresIn: '1hr',
    });
  };

  return User;
};
