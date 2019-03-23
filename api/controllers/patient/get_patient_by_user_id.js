module.exports = async (req, res, next) => {
  try {
    return res.json({ ...req.patient.get({ plain: true }) });
  } catch (err) {
    console.log('get patient by id ERROR:', err);

    return res.status(400).json({
      msg: `There was a problem fethcing patient "${id}"`,
      error: err,
    });
  }
};
