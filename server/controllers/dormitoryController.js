const { Dormitory } = require('../db/models');
const ApiError = require('../error/ApiError');

class DormitoryController{
    async create(req,res, next){
        try{
            const {name, dorm_number} = req.body;
            const dormitory = await Dormitory.create({name, dorm_number});
            return res.json(dormitory);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req,res){
        const dorms = await Dormitory.findAll();
        return res.json(dorms);
    }

    async getOne(req,res){
        const {id} = req.params;
        console.log(req.params);
        const dorm = await Dormitory.findByPk(id);
        return res.json(dorm);
    }
}

module.exports = new DormitoryController();