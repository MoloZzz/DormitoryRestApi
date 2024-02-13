const sequelize = require('./db');

const {DataTypes} = require('sequelize');

const Student = sequelize.define('student',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING, unique: false},
    surname: {type: DataTypes.STRING, unique: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    contact_info: {type: DataTypes.STRING, unique: false, defaultValue: "noInfo"}
});

const Dormitory = sequelize.define('dormitory',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true}
});

const Account = sequelize.define('account',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true}
});

const Room = sequelize.define('room',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true}
});

const Visitor = sequelize.define('visitor',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true}
});

const Worker = sequelize.define('worker',{
    id: {type: DataTypes.INTEGER, primaryKey: true , autoIncrement: true}
});

module.exports = {
    Student,
    Dormitory,
    Account,
    Room,
    Visitor,
    Worker
};