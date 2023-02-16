const User = require('../../models/user');
const HttpError = require('../../middlwares/HttpError');

const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const { verificationToken } = process.env;

async function userRegistration(req, res, next) {
  const { email, password, name, cityRegion, mobilePhone } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashedPassword,
      name,
      mobilePhone,
      cityRegion,
      verificationToken,
    });

    res.status(201).json({ message: 'Registration succesfull' });
  } catch (error) {
    if (error.code === 11000) {
      throw HttpError(409, 'Email in use');
    }
    next(error);
  }
}

module.exports = userRegistration;
