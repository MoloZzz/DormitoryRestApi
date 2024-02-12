const ApiError = require('../error/ApiError');

class AccountController{
    
    async create(req,res){
        try{
            return res.json("Account create");

        }catch(e){
            
            next(ApiError.badRequest(e.message));
        
        }
        
    }

    async getAll(req,res){
        return res.json("Account get all");
    }

    async getOne(req,res){
        return res.json("Account get one");
    }

}

module.exports = new AccountController();