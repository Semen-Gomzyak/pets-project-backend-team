const { Notice } = require('../../models');

const deleteUserNotice = async (req, res, next) => {
  const { noticeId } = req.params;
  const removedNotice = await Notice.findById(noticeId);
  if (!removedNotice) {
    return res.status(404).json({ ok: 'not found' });
  }

  await Notice.findByIdAndRemove(removedNotice);
  return res.status(200).json({ message: 'Notice deleted' });
};

module.exports = deleteUserNotice;
