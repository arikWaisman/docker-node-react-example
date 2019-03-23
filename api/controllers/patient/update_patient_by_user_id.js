module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const allowedInput = [
      'firstName',
      'lastName',
      'age',
      'mailingAdress1',
      'mailingAddress2',
      'phone',
    ];

    // current patient will be loaded in thorugh middlewqare
    const currentPatient = req.patient;

    allowedInput.map(allowedKey => {
      if (req.body[allowedKey]) {
        currentPatient.set(allowedKey, req.body[allowedKey]);
      }
    });

    currentPatient.save({ raw: true });

    return res.send(currentPatient);
  } catch (err) {
    console.log('get patient by id ERROR:', err);

    return res.status(400).json({
      msg: `There was a problem updating patient "${id}"`,
      error: err,
    });
  }
};
