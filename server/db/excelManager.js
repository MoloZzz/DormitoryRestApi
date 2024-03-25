const ExcelJS = require('exceljs');
const { Dormitory, Room, Student, Account, Visitor, Worker, StudentVisitor } = require('./models');

async function importToExcel() {
  try {
    const students = await Student.findAll({ include: [Room, Account, Visitor] });
    const dormitories = await Dormitory.findAll({ include: [Room] });
    const accounts = await Account.findAll();
    const rooms = await Room.findAll({ include: [Dormitory, Student] });
    const visitors = await Visitor.findAll({ include: [Student] });
    const workers = await Worker.findAll({ include: [Dormitory] });
    const studentVisitor = await StudentVisitor.findAll();

    const workbook = new ExcelJS.Workbook();
    const studentWorksheet = workbook.addWorksheet('Students');
    const dormitoryWorksheet = workbook.addWorksheet('Dormitories');
    const accountWorksheet = workbook.addWorksheet('Accounts');
    const roomWorksheet = workbook.addWorksheet('Rooms');
    const visitorWorksheet = workbook.addWorksheet('Visitors');
    const workerWorksheet = workbook.addWorksheet('Workers');
    const studentVisitorWorksheet = workbook.addWorksheet('StudentVisitor');


    studentWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Surname', key: 'surname', width: 20 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Dormitory Number', key: 'dormitory_num', width: 15 },
      { header: 'Role', key: 'role', width: 10 },
      { header: 'Contact Info', key: 'contact_info', width: 20 },
      { header: 'RoomId', key: 'roomId', width: 20 },
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
      { header: 'StudentId', key: 'studentId', width: 20 },
    ];

    roomWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Block Number', key: 'block_number', width: 15 },
      { header: 'Capacity', key: 'capacity', width: 10 },
      { header: 'Free Capacity', key: 'free_capacity', width: 15 },
      { header: 'Room Name', key: 'room_name', width: 20 },
      { header: 'DormitoryId', key: 'dormitoryId', width: 20 },
    ];

    workerWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Surname', key: 'surname', width: 20 },
      { header: 'Salary', key: 'salary', width: 15 },
      { header: 'Position', key: 'position', width: 20 },
      { header: 'dormitoryId', key: 'dormitoryId', width: 20 },
    ];

    visitorWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Surname', key: 'surname', width: 20 },
      { header: 'Passport', key: 'passport', width: 15 },
    ];

    studentVisitorWorksheet.columns = [
      { header: 'ID', key: 'id', width: 5 },
      { header: 'studentId', key: 'studentId', width: 20 },
      { header: 'visitorId', key: 'visitorId', width: 20 },
    ];


    students.forEach(student => {
      studentWorksheet.addRow({
        id: student.id,
        surname: student.surname,
        name: student.name,
        dormitory_num: student.dormitory_num,
        role: student.role,
        contact_info: student.contact_info,
        roomId: student.roomId,
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
        studentId: account.studentId,
      });
    });

    rooms.forEach(room => {
      roomWorksheet.addRow({
        id: room.id,
        block_number: room.block_number,
        capacity: room.capacity,
        free_capacity: room.free_capacity,
        room_name: room.room_name,
        dormitoryId: room.dormitoryId,
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
        dormitoryId: worker.dormitoryId,
      });
    });

    studentVisitor.forEach(student_visitor => {
      studentVisitorWorksheet.addRow({
        id: student_visitor.id,
        studentId: student_visitor.studentId,
        visitorId: student_visitor.visitorId,
      });
    }); d

    return workbook;
  } catch (error) {
    console.error('Помилка при експорті в Excel:', error);
  }
}

async function importFromExcel(file, transaction) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file.data);

    await importDormitories(workbook.getWorksheet('Dormitories'), transaction),
    await importRooms(workbook.getWorksheet('Rooms'), transaction),
    await importStudents(workbook.getWorksheet('Students'), transaction),
    await importAccounts(workbook.getWorksheet('Accounts'), transaction),

    await importVisitors(workbook.getWorksheet('Visitors'), transaction),
    await importWorkers(workbook.getWorksheet('Workers'), transaction),
    await importStudentVisitors(workbook.getWorksheet('StudentVisitor'), transaction)

    console.log('Дані успішно імпортовано з Excel файлу.');

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error('Помилка при імпорті з Excel:', error);
    throw error;
  }
}

async function importStudents(worksheet, transaction) {
  const studentsData = [];

  await worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      studentsData.push({
        id: row.getCell(1).value,
        surname: row.getCell(2).value,
        name: row.getCell(3).value,
        dormitory_num: row.getCell(4).value,
        role: row.getCell(5).value,
        contact_info: row.getCell(6).value,
        roomId: row.getCell(7).value
      });
    }
  });

  try {
    await Student.bulkCreate(studentsData, { transaction });
  } catch (error) {
    console.error('Error importing students from Excel:', error);
    throw error;
  }
}

async function importDormitories(worksheet, transaction) {
  const dormitoriesData = [];

  await worksheet.eachRow(async (row, rowNumber) => {
    if (rowNumber !== 1) {
      dormitoriesData.push({
        id: row.getCell(1).value,
        name: row.getCell(2).value,
        dorm_number: row.getCell(3).value,
        address: row.getCell(4).value
      });
    }
  });

  try {
    await Dormitory.bulkCreate(dormitoriesData, { transaction });
  } catch (error) {
    console.error('Error importing dormitories from Excel:', error);
    throw error;
  }
}


async function importAccounts(worksheet, transaction) {
  const accountsData = [];

  await worksheet.eachRow(async (row, rowNumber) => {
    if (rowNumber !== 1) {
      accountsData.push({
        id: row.getCell(1).value,
        balance: row.getCell(2).value,
        last_update_date: row.getCell(3).value,
        studentId: row.getCell(4).value
      });
    }
  });

  try {
    await Account.bulkCreate(accountsData, { transaction });
  } catch (error) {
    console.error('Error importing accounts from Excel:', error);
    throw error;
  }
}


async function importRooms(worksheet, transaction) {
  const roomsData = [];

  await worksheet.eachRow(async (row, rowNumber) => {
    if (rowNumber !== 1) {
      roomsData.push({
        id: row.getCell(1).value,
        block_number: row.getCell(2).value,
        capacity: row.getCell(3).value,
        free_capacity: row.getCell(4).value,
        room_name: row.getCell(5).value,
        dormitoryId: row.getCell(6).value
      });
    }
  });

  try {
    await Room.bulkCreate(roomsData, { transaction });
  } catch (error) {
    console.error('Error importing rooms from Excel:', error);
    throw error;
  }
}

async function importVisitors(worksheet, transaction) {
  const visitorsData = [];

  await worksheet.eachRow(async (row, rowNumber) => {
    if (rowNumber !== 1) {
      visitorsData.push({
        id: row.getCell(1).value,
        name: row.getCell(2).value,
        surname: row.getCell(3).value,
        passport: row.getCell(4).value
      });
    }
  });

  try {
    await Visitor.bulkCreate(visitorsData, { transaction });
  } catch (error) {
    console.error('Error importing visitors from Excel:', error);
    throw error;
  }
}

async function importWorkers(worksheet, transaction) {
  const workersData = [];

  await worksheet.eachRow(async (row, rowNumber) => {
    if (rowNumber !== 1) {
      workersData.push({
        id: row.getCell(1).value,
        name: row.getCell(2).value,
        surname: row.getCell(3).value,
        salary: row.getCell(4).value,
        position: row.getCell(5).value,
        dormitoryId: row.getCell(6).value
      });
    }
  });

  try {
    await Worker.bulkCreate(workersData, { transaction });
  } catch (error) {
    console.error('Error importing workers from Excel:', error);
    throw error;
  }
}


async function importStudentVisitors(worksheet, transaction) {
  const studentVisitorsData = [];

  await worksheet.eachRow(async (row, rowNumber) => {
    if (rowNumber !== 1) {
      studentVisitorsData.push({
        id: row.getCell(1).value,
        studentId: row.getCell(2).value,
        visitorId: row.getCell(3).value
      });
    }
  });

  try {
    await StudentVisitor.bulkCreate(studentVisitorsData, { transaction });
  } catch (error) {
    console.error('Error importing student visitors from Excel:', error);
    throw error;
  }
}


module.exports = { importToExcel, importFromExcel };

