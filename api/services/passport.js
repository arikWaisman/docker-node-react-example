const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const config = require('../config');
const { User, UserType } = require('../models');

// check if creds match up
const userLogin = new LocalStrategy(
  { usernameField: 'userName' },
  async (userName, password, done) => {
    try {
      const user = await User.findOne({
        where: { userName },
        include: [
          {
            model: UserType,
            required: true,
            attributes: ['type'],
          },
        ],
      });

      // user not found bail
      if (!user) {
        return done(null, false);
      }

      const validUser = await user.validPassword(password);

      // not proper creds bail
      if (!validUser) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      console.log('userLogin ERROR:', err);
    }
  },
);

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.jwtSecret,
  },
  async (payload, done) => {
    let user;
    try {
      user = await User.findOne({
        where: { id: payload.id },
        attributes: {
          exclude: ['password'],
        },
      });

      if (!user) {
        return done(null, user);
      }

      return done(null, user);
    } catch (err) {
      console.log('jwtLogin ERROR:', err);
    }
  },
);

passport.use(userLogin);
passport.use(jwtLogin);
