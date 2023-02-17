const { News } = require('../../models');
const { HttpError } = require('../../middlwares/index');

const getNews = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;
  console.log('test1');
  const result = await News.find({}, '', { skip, limit });

  if (!result) {
    throw HttpError(404);
  }
  console.log('test2');
  res.status(200).json(result);
};

module.exports = getNews;
