const { Notice } = require('../../models');

const getNoticeById = async (req, res, next) => {
  const { noticeId } = req.params;
  const currentNotice = await Notice.findById(noticeId);
  return res.status(201).json(currentNotice);
};

module.exports = getNoticeById;
