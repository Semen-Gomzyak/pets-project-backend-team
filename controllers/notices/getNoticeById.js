const Notices = require('../../models/notice');


// 17 - створити ендпоінт для отримання одного оголошення (незареэстрований юзер) - 1:42 

async function getNoticeById(req, res, next) {
  const { noticeId } = req.params;
  const currentNotice = await Notices.findById(noticeId);
  return res.status(201).json(currentNotice);
}

module.exports = getNoticeById;
