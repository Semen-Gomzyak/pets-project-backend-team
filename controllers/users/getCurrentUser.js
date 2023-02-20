const { Pet} = require('../../models');

const getCurrentUser = async (req, res, next) => {
  const { user } = req;
  const { name, email, _id: id, cityRegion, birthday, mobilePhone } = user;

  const pets = await Pet.find({ owner: id }).populate('owner', '_id name');
  
  return res.status(200).json({
    name,
    email,
    birthday,
    mobilePhone,
    cityRegion,
    id,
    pets,
  });
};

module.exports = getCurrentUser;
