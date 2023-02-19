const { User } = require('../../models');

const updateAllData = async (req, res, next) => {
  const { id } = req.user;

  const { name, email, cityRegion, mobilePhone, birthday } = req.body;
  console.log('data: ', name, email, cityRegion, mobilePhone, birthday);

  const upUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(upUser);
};

module.exports = updateAllData;
