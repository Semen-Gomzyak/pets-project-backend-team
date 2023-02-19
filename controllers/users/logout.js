const { User } = require('../../models');

const logout = async (req, res, next) => {
  const storedUser = req.user;

  await User.findByIdAndUpdate(storedUser._id, { token: '' });

  return res.status(201).json({
    message: 'Logout was successful',
  });
};

module.exports = logout;
