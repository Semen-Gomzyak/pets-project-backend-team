const User = require('../../models/user');
const HttpError = require('../../middlwares/HttpError');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { SECRET } = process.env;

async function userLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const storedUser = await User.findOne({ email });
    if (!storedUser) {
      throw new HttpError(401, 'Email is wrong');
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);
    if (!isPasswordValid) {
      throw new HttpError(401, 'Password is wrong');
    }

    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

    await User.findByIdAndUpdate(storedUser._id, {
      token,
    });

    const responseData = {
      token,
      _id: storedUser._id,
    };
    res.status(200).json({ ...responseData });
  } catch (error) {
    next(error);
  }
}

module.exports = userLogin;
