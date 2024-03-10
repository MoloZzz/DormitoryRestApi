const { model } = require('../db/db');
const { Visitor, StudentVisitor, Student } = require('../db/models');
const ApiError = require('../error/ApiError');
const { Sequelize, col } = require('sequelize');


class VisitorController {

    async create(req, res, next) {
        try {
            const { name, surname, passport, studentId } = req.body;
            let visitor = await Visitor.findOne({ where: { passport } });

            if (visitor === null) {
                visitor = await Visitor.create({ name, surname, passport });
            }

            const visitorId = visitor.getDataValue('id');
            await StudentVisitor.create({ studentId, visitorId });
            return res.json(visitor);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const visitors = await Visitor.findAll();
        return res.json(visitors);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const visitor = await Visitor.findByPk(id);
        return res.json(visitor);
    }

    async getAllByStudentId(req, res, next) {
        try {
            const { studentId } = req.params;
            const student = await Student.findByPk(studentId);

            const visitors = await student.getVisitors();

            return res.json(visitors);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new VisitorController();