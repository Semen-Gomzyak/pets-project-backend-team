const { User } = require('../../models');
const { HttpError } = require('../../middlwares');

const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const { verificationToken } = process.env;

const userRegistration = async (req, res, next) => {
  const { email, password, name, cityRegion, mobilePhone } = req.body;

  try {
    const storedUser = await User.findOne({ email });

    if (storedUser) {
      throw HttpError(409, 'Email in use');
    }
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      email,
      password: hashedPassword,
      name,
      mobilePhone,
      cityRegion,
      verificationToken,
    });

    const responce = {
      email,
      name,
      cityRegion,
      mobilePhone,
      birthday: createdUser.birthday,
    };

    res.status(201).json(responce);
  } catch (error) {
    if (error.code === 11000) {
      throw HttpError(409, 'Email in use');
    }
    next(error);
  }
};

module.exports = userRegistration;
