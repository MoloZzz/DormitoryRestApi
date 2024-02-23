const { Account } = require('../db/models');
const ApiError = require('../error/ApiError');

class AccountController {

    async create(req, res, next) {
        try {
            const { student_id, email, password} = req.body;
            const account = await Account.create({ student_id, balance: 0, last_update_date: new Date(), email, password });
            return res.json(account);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const accounts = await Account.findAll();
        return res.json(accounts);
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const account = await Account.findByPk(id);
            return res.json(account);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { balance, studentId, email, password } = req.body;
            const account = await Account.findByPk(id);

            if (!account) {
                return next(ApiError.badRequest('Рахунок не знайдено'));
            }

            if(studentId != null && studentId != account.id){
                return next(ApiError.badRequest('Не можна змінити власника рахунку'));
            }

            await account.update({ balance, last_update_date: new Date(), email, password });

            return res.json(account);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new AccountController();
