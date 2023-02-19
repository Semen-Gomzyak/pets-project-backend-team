const Notices = require('../../models/notice');
// const Users = require('../../models/user');

// 22 - створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем

const getUserNotices = async (req, res, next) => {
  const { userId } = req.body; // must be auth user !!!!!!!!!!!!!!!!!!
  console.log(userId);
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const myNotices = await Notices.find({ owner: userId })
    .skip(skip)
    .limit(limit);

  return res.json(myNotices);
};

module.exports = getUserNotices;