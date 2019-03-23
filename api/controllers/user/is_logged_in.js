const passport = require('passport');

// wrap passport authenticate middleware to be able to control message for logged in route
module.exports = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  })(req, res, next);
};
