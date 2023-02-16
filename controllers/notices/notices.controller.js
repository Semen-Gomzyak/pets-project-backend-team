const  Notices  = require('../../models/notice');
const Users = require('../../models/user');

// test 
// async function createNotice(req, res, next) {
//   const {
//     title,
//     name,
//     birthdate,
//     breed,
//     location,
//     comments,
//     price,
//     category = 'lost/found',
//     avatarURL,
//   } = req.body;
//   // const { user } = req;
//   const newContact = await Notices.create({
    
//     // owner: user._id,
//     title,
//     name,
//     birthdate,
//     breed,
//     location,
//     comments,
//     price,
//     category,
//     avatarURL,
//   });
//   console.log(newContact)
//   return res.status(201).json(newContact);
// }

// 17 - створити ендпоінт для отримання одного оголошення (незареэстрований юзер)

async function noticeInfo (req, res, next) {
  const { noticeId } = req.params;
  const currentNotice = await Notices.findById(noticeId);
  return res.status(201).json(currentNotice);
}

// 18 - створити ендпоінт для додавання оголошення до обраних

async function updateFavoriteNotice(req, res, next) {

  const { userId, noticeId } = req.params;
  const currentUser = await Users.findById(userId);
  const currentNotice = await Notices.findById(noticeId);
  const favorites = currentUser.favoriteNotices
  const index = favorites.indexOf(noticeId);

if (index === -1) {
  favorites.push(noticeId)

  await Users.findByIdAndUpdate(
    currentUser._id,
    { favoriteNotices: currentUser.favoriteNotices },
    { new: true },
    )
return res.status(200).json({ message: `notice ${currentNotice.name} add to favorite` });
  }
else {
  return res
    .status(200)
    .json({ message: "This notice has already been added to favorite" });
}
}

// 19 - створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
async function favoriteNotices(req, res, next) {
  const { userId } = req.params;
  const userFavoriteNotices = await Users.findById(userId).populate(
    'favoriteNotices',
    {
      birthdate:1,
      breed: 1,
      location: 1,
      category:1,
      avatarURL:1,
    },
  );
  return res.status(200).json(userFavoriteNotices.favoriteNotices);
}

module.exports = {
  // createNotice,
  noticeInfo,
  updateFavoriteNotice,
  favoriteNotices,
};