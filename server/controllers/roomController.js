const { Room, Dormitory } = require('../db/models');
const ApiError = require('../error/ApiError');
const { validationResult } = require('express-validator');

class RoomController {

    async create(req, res, next) {
        try {
            const { block_number, capacity, free_capacity, dormitoryId } = req.body;
            const room_name = block_number + "/" + capacity;
            const room = await Room.create({ block_number, capacity, free_capacity, room_name, dormitoryId });
            return res.json(room);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const rooms = await Room.findAll();
        return res.json(rooms);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const room = await Room.findByPk(id);
        return res.json(room);
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { block_number, capacity, free_capacity, room_name } = req.body;

            if(capacity < free_capacity){
                return next(ApiError.badRequest('Загальна кількість місць кімнати не може бути менша за кількість вільних місць'))
            }

            if(free_capacity > capacity){
                return next(ApiError.badRequest('Кількість вільних місць кімнати не може бути більша за загальну кількість місць'))
            }

            const room = await Room.findByPk(id);

            if (!room) {
                return next(ApiError.badRequest('Кімнату не знайдено'));
            }

            await room.update({block_number, capacity, free_capacity, room_name});

            return res.json(room);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getByDormNumAndName(req, res, next) {
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.json({ errors: result.array() })
        };
        
        try{
            const { room_name, dorm_number } = req.body;
            const dorm = await Dormitory.findOne({where:{dorm_number}});
            if (!dorm) {
                return next(ApiError.badRequest('Гуртожиток не знайдено'));
            }
            const room = await Room.findOne({where:{room_name, dormitoryId: dorm.id}});
            if (!room) {
                return next(ApiError.badRequest('Кімнату не знайдено'));
            }
            return res.json(room);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RoomController();
