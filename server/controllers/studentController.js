const ApiError = require('../error/ApiError');

class StudentController{
    
    async create(req,res){
        try{
            return res.json("Student create");

        }catch(e){
            
            next(ApiError.badRequest(e.message));
        
        }
        
    }

    async getAll(req,res){
        return res.json("Student get all");
    }

    async getOne(req,res){
        return res.json("Student get one");
    }

}

module.exports = new StudentController();