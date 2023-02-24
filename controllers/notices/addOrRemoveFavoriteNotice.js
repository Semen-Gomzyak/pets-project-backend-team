const { User, Notice } = require('../../models');

const addOrRemoveFavoriteNotice = async (req, res, next) => {
  const { userId, noticeId } = req.params;
  const currentUser = await User.findById(userId);
  const currentNotice = await Notice.findById(noticeId);

  if (!userId || !noticeId || !currentUser || !currentNotice) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  const favorites = currentUser.favoriteNotices;
  const index = favorites.indexOf(noticeId);

  if (index === -1) {
    favorites.push(noticeId);
    await User.findByIdAndUpdate(
      currentUser._id,
      { favoriteNotices: favorites },
      { new: true },
    );
    return res.status(200).json({
      message: `notice about "${currentNotice.name}" add to "favorite"`,
    });
  } else {
    favorites.splice(index, 1);
    await User.findByIdAndUpdate(
      currentUser._id,
      { favoriteNotices: favorites },
      { new: true },
    );
    return res.status(200).json({
      favoriteNotices: favorites,
      message: `notice about "${currentNotice.name}" removed from "favorite"`,
    });
  }
};

module.exports = addOrRemoveFavoriteNotice;
