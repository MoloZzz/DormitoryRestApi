const {Room} = require('../db/models');
const ApiError = require('../error/ApiError');

class RoomController{
    //block_number: {type: DataTypes.INTEGER, unique: true},
    //capacity: {type: DataTypes.INTEGER, unique: false},
    //free_capacity: {type: DataTypes.INTEGER, unique: false},
    //room_name: {type: DataTypes.STRING, unique: false}
    
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