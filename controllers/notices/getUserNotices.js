const Notices = require('../../models/notice');
// const Users = require('../../models/user');

// 22 - створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем

const getUserNotices = async (req, res) => {
  // const { user } = req;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const myNotices = await Notices.find({ owner: '63ef819f5469acc4f39fa32d' })
    .populate('owner', { name: 1 })
    .skip(skip)
    .limit(limit);
  console.log(myNotices);
  return res.json(myNotices);
};

module.exports = getUserNotices;
