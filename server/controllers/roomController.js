const ApiError = require('../error/ApiError');

class RoomController{
    
    async create(req,res){
        try{
            return res.json("Room create");

        }catch(e){
            
            next(ApiError.badRequest(e.message));
        
        }
        
    }

    async getAll(req,res){
        return res.json("Room get all");
    }

    async getOne(req,res){
        return res.json("Room get one");
    }

}

module.exports = new RoomController();