const { Student, Account } = require('../db/models');
const ApiError = require('../error/ApiError');

class StudentController{
    
    async create(req,res, next){
        try{
            const {email, surname, name, dormitory_num, roomId, contact_info} = req.body;
            const student = await Student.create({email, surname, name, dormitory_num, roomId, contact_info});
            const account = await Account.create({balance:0, last_update_date: new Date(), studentId: student.id});
            return res.json(student);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req,res){
        const students = await Student.findAll();
        return res.json(students);
    }

    async getOne(req,res){
        const {id} = req.params;
        const student = await Student.findByPk(id);
        return res.json(student);
    }
}

module.exports = new StudentController();