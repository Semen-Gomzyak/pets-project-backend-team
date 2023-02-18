const { Service } = require('../../models');
const NewError = require('http-errors');

const getServices = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    const skip = page * limit - limit;

    const services = await Service.find({}).skip(skip).limit(limit);

    if (!services) {
        throw NewError(404, 'Services not found');
    }

    res.status(200).json({ total: services.length, data: services });
};

module.exports = getServices;