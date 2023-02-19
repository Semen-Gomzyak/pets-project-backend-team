const { News } = require('../../models');

const findNewsByTitle = async searchTitle => {
  const query = { title: { $regex: searchTitle, $options: 'i' } };
  const news = await News.find(query).exec();
  return news;
};

module.exports = findNewsByTitle;
