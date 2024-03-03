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

    async getAll(req, res) {
        const workers = await Worker.findAll();
        return res.json(workers);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const worker = await Worker.findByPk(id);
        return res.json(worker);
    }

}

module.exports = new WorkerController();