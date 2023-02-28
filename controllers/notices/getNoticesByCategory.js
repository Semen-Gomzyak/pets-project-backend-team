const { Notice } = require('../../models');

const getByCategoryAndTitle = async (req, res) => {
  const { title, category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const notices = await Notice.find({ category }, '', {
    skip,
    limit: Number(limit),
    sort: { createdAt: -1 },
  }).populate('category');

  const filteredNotices = notices.filter(
    notice =>
      notice.title.toLowerCase().includes(title.toLowerCase()) &&
      notice.category.toLowerCase() === category.toLowerCase(),
  );

  if (filteredNotices.length === 0) {
    res.status(400).json('Notice not found');
  }

  res.status(200).json({
    filteredNotices: [...filteredNotices].reverse(),
  });
};

module.exports = getByCategoryAndTitle;
