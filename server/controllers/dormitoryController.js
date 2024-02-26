const { Dormitory } = require('../db/models');
const ApiError = require('../error/ApiError');

class DormitoryController{
    async create(req,res, next){
        try{
            const {name, dorm_number,address} = req.body;
            const dormitory = await Dormitory.create({name, dorm_number,address});
            return res.json(dormitory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const dorms = await Dormitory.findAll();
        return res.json(dorms);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const dorm = await Dormitory.findByPk(id);
        return res.json(dorm);
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, dorm_number } = req.body;
            const dormitory = await Dormitory.findByPk(id);

            if (!dormitory) {
                return next(ApiError.badRequest('Гуртожиток не знайдено'));
            }

            await dormitory.update({ name, dorm_number });

            return res.json(dormitory);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getByDormNum(req, res, next){
        try {
            const { dorm_number } = req.body;
            const dorm = await Dormitory.findOne({where:{dorm_number}});

            if (!dorm) {
                return next(ApiError.badRequest('Гуртожиток не знайдено'));
            }

            return res.json(dorm);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DormitoryController();