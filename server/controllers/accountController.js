const { Account } = require('../db/models');
const ApiError = require('../error/ApiError');
const importExcel = require('../db/importExcel');

class AccountController {

    async create(req, res, next) {
        try {
            const { student_id } = req.body;
            const account = await Account.create({ student_id, balance: 0, last_update_date: new Date() });
            return res.json(account);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        const accounts = await Account.findAll();
        return res.json(accounts);
    }

    async getOne(req, res, next) {
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
            const { balance, studentId } = req.body;
            const account = await Account.findByPk(id);

            if (!account) {
                return next(ApiError.badRequest('Рахунок не знайдено'));
            }

            if (studentId != null && studentId != account.id) {
                return next(ApiError.badRequest('Не можна змінити власника рахунку'));
            }

            await account.update({ balance, last_update_date: new Date() });

            return res.json(account);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateByStudentId(req, res, next) {
        try {
            const { studentId } = req.params;
            const { balance } = req.body;
            const account = await Account.findOne({ where: { studentId } });

            if (!account) {
                return next(ApiError.badRequest('Рахунок не знайдено'));
            }

            await account.update({ balance, last_update_date: new Date() });

            return res.json(account);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async importToExcel(req, res, next) {
        try {
            const workbook = await importExcel();
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + "excel_table.xlsx");
            
            return workbook.xlsx.write(res).then(function () {
                res.status(200).end();
            });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


}

module.exports = new AccountController();
