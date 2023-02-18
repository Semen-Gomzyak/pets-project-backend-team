const { Service } = require('../../models');
const NewError = require('http-errors');

const getServices = async (req, res) => {
    const { page = 1, limit = 9 } = req.query;
    const skip = page * limit - limit;

    const services = await Service.find({}).skip(skip).limit(limit);
    
    if (!services) {
        throw NewError(404, 'Services not found');
    }

    const mappedDays = services.map(service => {
        if (service.workDays !== null) {
            const mappedWorkDays = service.workDays.map(workDay => {
                console.log(workDay)
                return { ...workDay, from: workDay.from, to: workDay.to };
            });
            return { ...service, workDays: mappedWorkDays };
        } else {
            return service;
        }
        });
    
    

    res.status(200).json( services ); 
};

module.exports = getServices;