const { Service } = require('../../models');
const NewError = require('http-errors');

const getServices = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = page * limit - limit;

  const allServices = await Service.find({});
  if (!allServices) {
    throw NewError(404, 'Services not found');
  }

  const total = allServices.length;
  const services = allServices.slice(skip, skip + limit);

  let mapped = services.map(service => {
    if (service.workDays === null || service.workDays === undefined) {
      return { ...service.toObject(), workDays: [] };
    }

    const mappedDays = service.workDays.map(workDay => {
      let from = '';
      let to = '';
      if (workDay.from !== null && workDay.from !== undefined) {
        from = workDay.from;
      }
      if (workDay.to !== null && workDay.to !== undefined) {
        to = workDay.to;
      }
      return { ...workDay, from: from, to: to };
    });

    return { ...service.toObject(), workDays: mappedDays };
  });

  res.status(200).json({ total: total, count: mapped.length, data: mapped });
};

module.exports = getServices;
