const { Notice } = require('../../models');
const { User } = require('../../models');

const getNoticeById = async (req, res, next) => {
  const { noticeId } = req.params;
  const currentNotice = await Notice.findById(noticeId);
  const {owner} = currentNotice;
    const user = await User.findById(owner);
    const email = user.email;
    const phone = user.mobilePhone;
    const {
      _id,
      title,
      name,
      birthdate,
      breed,
      location,
      theSex,
      comments,
      price,
      avatarURL
    } = currentNotice;

  return res.status(201).json({
    email,
    phone,
    _id,
    title,
    name,
    birthdate,
    breed,
    location,
    theSex,
    comments,
    price,
    avatarURL,
  });
};

module.exports = getNoticeById;
