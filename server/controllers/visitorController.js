const ApiError = require('../error/ApiError');

class VisitorController{
    
    async create(req,res, next){
        try{
            return res.json("Visitor create");

        }catch(e){
            next(ApiError.badRequest(e.message));
        }
        
    }

    async getAll(req,res){
        return res.json("Visitor get all");
    }

    async getOne(req,res){
        return res.json("Visitor get one");
    }
}

module.exports = new VisitorController();