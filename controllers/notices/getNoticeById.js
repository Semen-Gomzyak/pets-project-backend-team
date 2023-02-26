const { Notice } = require('../../models');
const { User } = require('../../models');

const getNoticeById = async (req, res, next) => {
  const { noticeId } = req.params;
  const currentNotice = await Notice.findById(noticeId);
  const { owner } = currentNotice;
  const findOwner = await User.find(owner);
  const email = findOwner[0].email;
  const phone = findOwner[0].mobilePhone; 

  return res
    .status(201)
    .json({ notice: currentNotice, email, phone });
};

module.exports = getNoticeById;
