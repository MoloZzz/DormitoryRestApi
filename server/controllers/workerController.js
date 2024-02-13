const ApiError = require('../error/ApiError');

class WorkerController{
    
    async create(req,res){
        try{
            return res.json("Worker create");
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
        
    }

    async getAll(req,res){
        return res.json("Worker get all");
    }

    async getOne(req,res){
        return res.json("Worker get one");
    }

}

module.exports = new WorkerController();