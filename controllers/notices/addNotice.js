const { Notice } = require('../../models');
const { updateCloudinaryAvatar } = require('../../middlwares');

const addNotice = async (req, res) => {
  const { _id } = req.user;
  // const { category } = req.params;
  const avatarURL = await updateCloudinaryAvatar(req, res);

  const result = await Notice.create({
    ...req.body,
    owner: { _id: _id },
    avatarURL,
  });
  res.status(201).json(result);
};

module.exports = addNotice;
