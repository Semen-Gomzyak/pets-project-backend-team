const { News } = require('../../models');
const { HttpError } = require('../../middlwares/index');

const getNews = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;

  const [result, totalCount] = await Promise.all([
    News.find({}, '', { skip, limit }),
    News.countDocuments(),
  ]);

  if (!result) {
    throw HttpError(404);
  }
  
  res.status(200).json({ news: result, total: totalCount });
};

module.exports = getNews;
