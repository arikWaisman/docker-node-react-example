module.exports = async (req, res, next) => {
  const { password, ...user } = req.user.get({ plain: true });

  res.json({ token: req.user.generateToken(), user });
};
