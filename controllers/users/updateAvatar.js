const { updateCloudinaryAvatar } = require('../../middlwares');
const { User } = require('../../models');

const updateAvatar = async (req, res) => {
  const userId = req.params.userId;
  const imageUrl = await updateCloudinaryAvatar(req);
  
  await User.findByIdAndUpdate(userId, { avatarURL: imageUrl });

  res.status(200).json({
    id: userId,
    avatarURL: imageUrl,
  });
};

module.exports = updateAvatar;
