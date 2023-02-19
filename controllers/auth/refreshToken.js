const dotenv = require('dotenv');
dotenv.config();
const { User } = require('../../models');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const refreshToken = async (req, res) => {
  const { id } = req.body;
  const user = await User.findOne({ id });

  const payload = {
    id: user._id,
  };

  const newToken = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token: newToken });
  return res.status(200).json({
    token: newToken,
    id: user._id,
  });
};

module.exports = refreshToken;
