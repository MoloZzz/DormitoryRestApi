const {Room} = require('../db/models');
const ApiError = require('../error/ApiError');

class RoomController{
    
    async create(req,res, next){
        try{
            console.log(req.body);
            const {block_number, capacity, free_capacity, room_name, dormitoryId} = req.body;
            const room = await Room.create({block_number, capacity, free_capacity, room_name, dormitoryId});
            return res.json(room);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req,res){
        const rooms = await Room.findAll();
        return res.json(rooms);
    }

    async getOne(req,res){
        const {id} = req.params;
        const room = await Room.findByPk(id);
        return res.json(room);
    }
}

module.exports = new RoomController();