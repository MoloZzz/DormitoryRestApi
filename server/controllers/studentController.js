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

    //В процесі
    async change(req, res, next) {
        try {
            const { id, fieldName, newValue } = req.body;

            const existingStudent = await Student.findByPk(id);
            if (!existingStudent) {
                return next(ApiError.notFound('Студент не знайдений'));
            }


            if (existingStudent[fieldName] == undefined) {
                return next(ApiError.badRequest(`Поле '${fieldName}' не існує у записі студента`));
            }

            existingStudent[fieldName] = newValue;
            await existingStudent.save();

            return res.json(existingStudent);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const student = await Student.findByPk(id);

            if (!student) {
                return res.status(404).json({ error: 'Студент не знайдений' });
            }

            const account = await Account.findOne({ where: { studentId: student.id } });

            if (!account) {
                return res.status(404).json({ error: 'Акаунт студента не знайдений' });
            }

            const room = await Room.findByPk(student.roomId);
            room.free_capacity += 1;

            await room.save();
            await account.destroy();
            await student.destroy();

            return res.json(`Student: id ${id},${student.name} ${student.surname} deleted, account ${account.id} deleted`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getStudentInfo(req, res, next) {
        try {
            const { id } = req.params;
            const studentInfo = await Student.findOne({
                where: { id },
                include: [
                    { model: Account, attributes: ['balance', 'last_update_date'] },
                    { model: Room, attributes: ['room_name'] },
                ]
            });

            return res.json(studentInfo);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new StudentController();
