const Users = require('../../models/user');

// 19 - створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані - 1:45

async function getFavoriteNotices(req, res, next) {
  const { userId } = req.params;
  
  const userFavoriteNotices = await Users.findById(userId).populate(
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
}

module.exports = getFavoriteNotices;
