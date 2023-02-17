const { User } = require('../../models');
const NewError = require('http-errors');
const idValidation = require('../../validation/idValidation');

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  idValidation(userId);

  const curentUserId = req.user._id;
  if (!curentUserId.equals(userId)) {
    return res
      .status(401)
      .json({ message: 'Not authorize to get another user data' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      throw NewError(404, 'User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
