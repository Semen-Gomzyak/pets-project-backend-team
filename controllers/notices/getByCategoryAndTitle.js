const { Notice } = require('../../models');

const getByCategoryAndTitle = async (req, res) => {
  console.log(req.params);
  console.log(req.query);
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
    res.status(400).json('Noitice not found'); 
  }

  res.status(200).json({
    filteredNotices
  });  
    

};

module.exports = getByCategoryAndTitle;
