const sequelize = require('./db');

const {DataTypes} = require('sequelize');

const Student = sequelize.define('student',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    surname: {type: DataTypes.STRING, unique: false},
    name: {type: DataTypes.STRING, unique: false},
    dormitory_num: {type: DataTypes.INTEGER, unique: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    contact_info: {type: DataTypes.STRING, unique: false}   
});

const Dormitory = sequelize.define('dormitory',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false},
    dorm_number: {type: DataTypes.INTEGER, unique: true},
    address: {type: DataTypes.STRING, unique: true}
});

const Account = sequelize.define('account', {
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    balance: {type: DataTypes.DECIMAL, unique: false},
    last_update_date: {type: DataTypes.DATE, unique: false}
});

const Room = sequelize.define('room',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    block_number: {type: DataTypes.INTEGER, unique: false},
    capacity: {type: DataTypes.INTEGER, unique: false},
    free_capacity: {type: DataTypes.INTEGER, unique: false},
    room_name: {type: DataTypes.STRING, unique: false}
});

const Visitor = sequelize.define('visitor',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false},
    surname: {type: DataTypes.STRING, unique: false},
    passport: {type: DataTypes.STRING, unique: true},
});

const Worker = sequelize.define('worker',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false},
    surname: {type: DataTypes.STRING, unique: false},
    salary: {type: DataTypes.DECIMAL, unique: false},
    position: {type: DataTypes.STRING, unique: false}
});

const DormitoryWorker = sequelize.define("dormitory_worker", {
    id:{type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true}
})

const StudentVisitor = sequelize.define("student_visitor", {
    id:{type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true}
})

Visitor.belongsToMany(Student, {through: StudentVisitor});
Student.belongsToMany(Visitor, {through: StudentVisitor});

Student.hasOne(Account);
Account.belongsTo(Student);

Dormitory.hasMany(Room);
Room.belongsTo(Dormitory);

Room.hasMany(Student);
Student.belongsTo(Room);

Dormitory.belongsToMany(Worker, {through: DormitoryWorker});
Worker.belongsToMany(Dormitory, {through: DormitoryWorker});

module.exports = {
    Student,
    Dormitory,
    Account,
    Room,
    Visitor,
    Worker,
    DormitoryWorker
};