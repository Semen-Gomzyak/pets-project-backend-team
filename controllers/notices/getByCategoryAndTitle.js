const { NotFound } = require('http-errors');
const { Notice } = require('../../models');

const getByCategoryAndTitle = async (req, res) => {
  const { title, category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const notices = await Notice.find({ category }, '', {
    skip,
    limit: Number(limit),
  }).populate('category');

  const filteredNotices = notices.filter(
    notice =>
      notice.title.toLowerCase().includes(title.toLowerCase()) &&
      notice.category.toLowerCase() === category.toLowerCase(),
  );
  if (filteredNotices.length === 0) {
    throw new NotFound('Not found');
  }
  res.status(404).json(filteredNotices);

    
    

};

module.exports = getByCategoryAndTitle;
