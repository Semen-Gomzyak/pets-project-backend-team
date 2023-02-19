const { User } = require('../../models');

const getFavoriteNotices = async (req, res, next) => {
  const { userId } = req.params;

  const userFavoriteNotices = await User.findById(userId).populate(
    'favoriteNotices',
    {
      birthdate: 1,
      breed: 1,
      location: 1,
      category: 1,
      avatarURL: 1,
    },
  );

  return res.status(200).json(userFavoriteNotices.favoriteNotices);
};

module.exports = getFavoriteNotices;
