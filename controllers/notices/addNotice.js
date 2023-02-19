const { Notice } = require('../../models');

const addNotice = async (req, res) => {
  //  const { _id } = req.user           // must be auth user !!!!!!!!!!!!!!!!!!
  const { category } = req.params;

  const result = await Notice.create({
    ...req.body,
    owner: { _id: '63ef819f5469acc4f39fa32d' }, // need _id of auth user
    category,
  });
  res.status(201).json(result);
};

module.exports = addNotice;
