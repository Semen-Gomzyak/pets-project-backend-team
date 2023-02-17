const User = require('../../models/user');
const HttpError = require('../../middlwares/HttpError');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { verificationToken, REFRESH_SECRET } = process.env;

async function userRegistration(req, res, next) {
  const { email, password, name, cityRegion, mobilePhone } = req.body;

  try {
    const storedUser = await User.findOne({ email });
    if (storedUser) {
      throw HttpError(409, 'Email in use');
    }
    const payload = { id: storedUser._id };
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: '30d',
    });

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
      mobilePhone,
      cityRegion,
      verificationToken,
      refreshToken,
    });

    const responce = {
      email,
      name,
      cityRegion,
      mobilePhone,
      avatarURL: createdUser.avatarURL,
      birthday: createdUser.birthday,
    };

    res.status(201).json(responce);
  } catch (error) {
    if (error.code === 11000) {
      throw HttpError(409, 'Email in use');
    }
    next(error);
  }
}

module.exports = userRegistration;
