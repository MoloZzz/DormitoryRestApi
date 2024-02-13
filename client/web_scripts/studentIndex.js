
async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:9999/api/student');
        const students = await response.json();
        return students;
    } catch (error) {
        console.error('Помилка при отриманні списку студентів:', error);
    }
}


async function updateTable() {
    const students = await fetchStudents();
    const tableBody = document.getElementById('studentsBody');

    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.dormitory_num}</td>
            <td>Конфіденційно</td>
            <td>${student.email}</td>
        `;
        tableBody.appendChild(row);
    });
}


window.onload = updateTable;
