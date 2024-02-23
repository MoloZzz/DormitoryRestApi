const sequelize = require('./db');

const { DataTypes } = require('sequelize');

const Student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
<<<<<<< Updated upstream
    email: { type: DataTypes.STRING, primaryKey: true, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, unique: false, allowNull: false },
=======
>>>>>>> Stashed changes
    surname: { type: DataTypes.STRING, unique: false, allowNull: false },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    dormitory_num: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    contact_info: { type: DataTypes.STRING, unique: false, allowNull: true }
});

const Dormitory = sequelize.define('dormitory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    dorm_number: { type: DataTypes.INTEGER, unique: true, allowNull: false }
});

const Account = sequelize.define('account', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, unique: false, allowNull: false },
    balance: { type: DataTypes.DECIMAL, unique: false, defaultValue: 0 },
    last_update_date: { type: DataTypes.DATE, unique: false, allowNull: false }
});

const Room = sequelize.define('room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    block_number: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    capacity: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    free_capacity: { type: DataTypes.INTEGER, unique: false, allowNull: false },
    room_name: { type: DataTypes.STRING, unique: false, allowNull: false }
});

const Visitor = sequelize.define('visitor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    surname: { type: DataTypes.STRING, unique: false, allowNull: false },
    passport: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Worker = sequelize.define('worker', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: false, allowNull: false },
    surname: { type: DataTypes.STRING, unique: false, allowNull: false },
    salary: { type: DataTypes.DECIMAL, unique: false, allowNull: false },
    position: { type: DataTypes.STRING, unique: false, allowNull: false }
});

const DormitoryWorker = sequelize.define("dormitory_worker", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const StudentVisitor = sequelize.define("student_visitor", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Dormitory.hasMany(Room);
Room.belongsTo(Dormitory);

Room.hasMany(Student);
Student.belongsTo(Room);

Student.hasOne(Account);
Account.belongsTo(Student);

Visitor.belongsToMany(Student, {
    through: {
        model: StudentVisitor,
        unique: false,
    },
});

Student.belongsToMany(Visitor, {
    through: {
        model: StudentVisitor,
        unique: false,
    },
});

Dormitory.belongsToMany(Worker, {
    through: {
        model: DormitoryWorker,
        unique: false
    }
});

Worker.belongsToMany(Dormitory, {
    through: {
        model: DormitoryWorker,
        unique: false
    }
});

module.exports = {
    Dormitory,
    Room,
    Student,
    Account,
    Visitor,
    Worker,
    StudentVisitor,
    DormitoryWorker
};
