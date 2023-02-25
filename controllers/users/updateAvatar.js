const { updateCloudinaryAvatar } = require('../../middlwares');
const { User } = require('../../models');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const imageUrl = await updateCloudinaryAvatar(req);

  await User.findByIdAndUpdate(_id, { avatarURL: imageUrl });

  res.status(200).json({
    id: _id,
    avatarURL: imageUrl,
  });
};

module.exports = updateAvatar;
