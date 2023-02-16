const User = require('../../models/user');
const idValidation = require('../../validation/idValidation');

async function getUserById(req, res, next) {
  const { userId } = req.params;
  idValidation(userId);

  const curentUserId = req.user._id;
  if (!curentUserId.equals(userId)) {
    return res
      .status(401)
      .json({ message: 'Not authorize to get another user data' });
  }

  try {
    const user = await User.findById(userId).select({
      _id: 0,
      name: 1,
      email: 1,
      birthday: 1,
      mobilePhone: 1,
      cityRegion: 1,
      avatarURL: 1,
    });

    if (!user) {
      return res.status(404).json({ message: `User <${userId}> not found` });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = getUserById;
