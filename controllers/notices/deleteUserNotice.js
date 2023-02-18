const Notices = require('../../models/notice');


// 23 - створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем

async function deleteUserNotice(req, res, next) {
  const { noticeId } = req.params;
  const removedNotice = await Notices.findById(noticeId);
  if (!removedNotice) {
    return res.status(404).json({ ok: 'not found' });
  }

  await Notices.findByIdAndRemove(removedNotice);
  return res.status(200).json({ ok: true });
}

module.exports = deleteUserNotice;
