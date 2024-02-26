const { Student, Account, Room } = require('../db/models');
const ApiError = require('../error/ApiError');

class StudentController {

    async create(req, res, next) {
        try {
            const { surname, name, dormitory_num, roomId, contact_info } = req.body;
            let room = await Room.findByPk(roomId);

            if (room.free_capacity < 1) {
                return next(ApiError.badRequest('Недостатньо вільних місць у кімнаті'));
            }

            const student = await Student.create({ surname, name, dormitory_num, roomId, contact_info });

            room.free_capacity -= 1;
            await room.save();

            await Account.create({ balance: 0, last_update_date: new Date(), studentId: student.id });
            return res.json(student);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const students = await Student.findAll();
        return res.json(students);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        return res.json(student);
    }
}

module.exports = new StudentController();
