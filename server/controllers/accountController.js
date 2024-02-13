const {Account} = require('../db/models');
const ApiError = require('../error/ApiError');

class AccountController{
    
    async create(req,res, next){
        try{
            const {student_id} = req.body;
            const account = await Account.create({student_id, balance: 0, last_update_date: new Date()});
            return res.json(account);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req,res){
        const accounts = await Account.findAll();
        return res.json(accounts);
    }

    async getOne(req,res){
        try{
            const {id} = req.params;
            const account = await Account.findByPk(id);
            return res.json(account);    
        }catch(e){
                next(ApiError.badRequest(e.message));
        }
    }  

    async changeBalance(req,res,next){
        try {
            const {id, balance} = req.body;

            const account = await Account.update(
                { balance: balance },
                { where: { id: id }, returning: true}
            );
    
            if(account[0] == 0){
                next(ApiError.badRequest("Account with this id is not defined"));
            }
            
            return res.json(account);
            
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new AccountController();