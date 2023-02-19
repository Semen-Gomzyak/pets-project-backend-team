const getCurrentUser = (req, res, next) => {
  const { user } = req;
  const { name, email, _id: id, cityRegion, birthday, mobilePhone } = user;

  return res.status(200).json({
    name,
    email,
    birthday,
    mobilePhone,
    cityRegion,
    id,
  });
};

module.exports = getCurrentUser;
