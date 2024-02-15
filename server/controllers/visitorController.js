const { Visitor, StudentVisitor } = require('../db/models');
const ApiError = require('../error/ApiError');

class VisitorController{
    
    async create(req, res, next){
        try{
            const {name, surname, passport, studentId} = req.body;
            let visitor = await Visitor.findOne({where:{passport}});
            
            if(visitor === null){
                visitor = await Visitor.create({ name, surname, passport });
            }
            
            const visitorId = visitor.getDataValue('id');
            await StudentVisitor.create({studentId, visitorId});
            return res.json(visitor);
        } catch(e){
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req,res){
        const visitors = await Visitor.findAll();
        return res.json(visitors);
    }

    async getOne(req,res){
        const {id} = req.params;
        const visitor = await Visitor.findByPk(id);
        return res.json(visitor);
    }
}

module.exports = new VisitorController();