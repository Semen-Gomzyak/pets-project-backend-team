const { Notice } = require('../../models');

const getNoticesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const notices = await Notice.find({ category }, '', {
    skip,
    limit: Number(limit),
  }).populate('category');
  const total = await Notice.countDocuments({ category }); 

  res.status(200).json({ total, notices });
};

module.exports = getNoticesByCategory;
