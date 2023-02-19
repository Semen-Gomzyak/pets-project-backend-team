const { Notice } = require('../../models');

const getUserNotices = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const notice = await Notice.find({ owner: req.user._id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id name');

  return res.status(200).json(notice);
};

module.exports = getUserNotices;
