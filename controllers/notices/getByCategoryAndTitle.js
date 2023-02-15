const { NotFound } = require('http-errors');
const { Notice } = require('../../models');

const getByCategoryAndTitle = async (req, res) => {
    const { title, category } = req.params;
    const { page = 1, limit = 8 } = req.query;
    const skip = (page - 1) * limit;
    const notices = await Notice.find(category, '', {
        skip,
        limit: Number(limit)
    }).populate('category');
    const filteredNotices = await notices.filter((notice) => notice.title.includes(title));
    if (!filteredNotices) {
        throw new NotFound('Not found')
    }
    res.status(404).json(filteredNotices);
};

module.exports = getByCategoryAndTitle;