const ApiError = require('../error/ApiError');

class DormitoryController{
    
    async create(req,res){
        try{
            return res.json("Dormitory create");

        }catch(e){
            
            next(ApiError.badRequest(e.message));
        
        }
        
    }

    async getAll(req,res){
        return res.json("Dormitory get all");
    }

    async getOne(req,res){
        return res.json("Dormitory get one");
    }

}

module.exports = new DormitoryController();