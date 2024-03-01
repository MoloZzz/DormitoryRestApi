const ExcelJS = require('exceljs');
const {Dormitory, Room, Student, Account, Visitor, Worker, StudentVisitor, DormitoryWorker} = require('./models');

async function importToExcel() {
  try {
    const students = await Student.findAll({ include: [Room, Account, Visitor] });
    const dormitories = await Dormitory.findAll({ include: [Room] });
    const accounts = await Account.findAll();
    const rooms = await Room.findAll({ include: [Dormitory, Student] });
    const visitors = await Visitor.findAll({ include: [Student] });
    const workers = await Worker.findAll({ include: [Dormitory] });

    const workbook = new ExcelJS.Workbook();
    const studentWorksheet = workbook.addWorksheet('Students');
    const dormitoryWorksheet = workbook.addWorksheet('Dormitories');
    const accountWorksheet = workbook.addWorksheet('Accounts');
    const roomWorksheet = workbook.addWorksheet('Rooms');
    const visitorWorksheet = workbook.addWorksheet('Visitors');
    const workerWorksheet = workbook.addWorksheet('Workers');


    studentWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Surname', key: 'surname', width: 20 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Dormitory Number', key: 'dormitory_num', width: 15 },
      { header: 'Role', key: 'role', width: 10 },
      { header: 'Contact Info', key: 'contact_info', width: 20 },
    ];

    dormitoryWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Dorm Number', key: 'dorm_number', width: 15 },
      { header: 'Address', key: 'address', width: 20 },
    ];

    accountWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Balance', key: 'balance', width: 15 },
      { header: 'Last Update Date', key: 'last_update_date', width: 20 },
    ];

    roomWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Block Number', key: 'block_number', width: 15 },
      { header: 'Capacity', key: 'capacity', width: 10 },
      { header: 'Free Capacity', key: 'free_capacity', width: 15 },
      { header: 'Room Name', key: 'room_name', width: 20 },
    ];

    workerWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Surname', key: 'surname', width: 20 },
      { header: 'Salary', key: 'salary', width: 15 },
      { header: 'Position', key: 'position', width: 20 },
    ];

    visitorWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Surname', key: 'surname', width: 20 },
      { header: 'Passport', key: 'passport', width: 15 },
    ];   

      students.forEach(student => {
        studentWorksheet.addRow({
          id: student.id,
          surname: student.surname,
          name: student.name,
          dormitory_num: student.dormitory_num,
          role: student.role,
          contact_info: student.contact_info,
        });
      });

      dormitories.forEach(dormitory => {
        dormitoryWorksheet.addRow({
          id: dormitory.id,
          name: dormitory.name,
          dorm_number: dormitory.dorm_number,
          address: dormitory.address,
        });
      });

      accounts.forEach(account => {
        accountWorksheet.addRow({
          id: account.id,
          balance: account.balance,
          last_update_date: account.last_update_date,
        });
      });

      rooms.forEach(room => {
        roomWorksheet.addRow({
          id: room.id,
          block_number: room.block_number,
          capacity: room.capacity,
          free_capacity: room.free_capacity,
          room_name: room.room_name,
        });
      });

      visitors.forEach(visitor => {
        visitorWorksheet.addRow({
          id: visitor.id,
          name: visitor.name,
          surname: visitor.surname,
          passport: visitor.passport,
        });
      });

      workers.forEach(worker => {
        workerWorksheet.addRow({
          id: worker.id,
          name: worker.name,
          surname: worker.surname,
          salary: worker.salary,
          position: worker.position,
        });
      });

    await workbook.xlsx.writeFile('../client/static/excel_table.xlsx');
    console.log('Excel файл збережений.');

  } catch (error) {
    console.error('Помилка при експорті в Excel:', error);
  }
}

module.exports = importToExcel;

