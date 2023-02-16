const { User } = require('../../models/user');

const NewError = require('http-errors');

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw NewError(404, 'User not found');
  }

  res.status(200).json(result);
};

module.exports = updateUser;
