const Notices = require('../../models/notice');
const Users = require('../../models/user');


// 18 - створити ендпоінт для додавання оголошення до обраних - 1:43
// 20 - створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних 1:46

async function addOrRemoveFavoriteNotice(req, res, next) {
  const { userId, noticeId } = req.params;
  const currentUser = await Users.findById(userId);
  const currentNotice = await Notices.findById(noticeId);

if (!userId || !noticeId || !currentUser || !currentNotice) {
  return res.status(404).json({
    message: 'Not found',
  });
}

  const favorites = currentUser.favoriteNotices;
  const index = favorites.indexOf(noticeId);

  if (index === -1) {
    favorites.push(noticeId);
    await Users.findByIdAndUpdate(
      currentUser._id,
      { favoriteNotices: favorites },
      { new: true },
    );
    return res
      .status(200)
      .json({
        message: `notice about "${currentNotice.name}" add to "favorite"`,
      });
  } else {
    favorites.splice(index, 1);
    await Users.findByIdAndUpdate(
      currentUser._id,
      { favoriteNotices: favorites },
      { new: true },
    );
    return res
      .status(200)
      .json({
        message: `notice about "${currentNotice.name}" removed from "favorite"`,
      });
  }
}

module.exports = addOrRemoveFavoriteNotice;
