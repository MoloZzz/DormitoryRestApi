const ApiError = require('../error/ApiError');
const {Worker} = require('../db/models');

class WorkerController{
    
    async create(req,res, next){
        try{
            const {name, surname, salary, position, dormitory_id } = req.body;

            if (!name || !surname || !salary || !position || !dormitory_id) {
                throw new Error('Не всі обов\'язкові поля заповнені.');
            }

            const worker = await Worker.create({name, surname, salary, position, dormitoryId:dormitory_id});
            return res.json(worker);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req,res, next){
        return res.json("Worker get all");
    }

    async getOne(req,res, next){
        return res.json("Worker get one");
    }

}

module.exports = new WorkerController();