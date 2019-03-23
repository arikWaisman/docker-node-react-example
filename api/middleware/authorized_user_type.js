const { UserType } = require('../models');

module.exports = allowedType => {
  return async (req, res, next) => {
    try {
      const userTypeId = req.user.get('UserTypeId');

      const userTypeObj = await UserType.findOne({
        raw: true,
        where: { id: userTypeId },
      });

      // ensure only proper user types can continue further
      if (allowedType.indexOf(userTypeObj.type) < 0) {
        const allowed = allowedType.join(', ');

        return res.status(422).json({
          msg: `only users of types ${allowed} can access this data`,
        });
      }

      req.userType = userTypeObj.type;

      return next();
    } catch (err) {
      console.log('authorized user type ERROR:', err);

      return res.status(400).json({
        msg: 'There was a problem verifying user type',
        error: err,
      });
    }
  };
};
