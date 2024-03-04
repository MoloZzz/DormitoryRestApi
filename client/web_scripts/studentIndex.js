

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
    const urlParams = new URLSearchParams(window.location.search);
    const dormNumber = urlParams.get('dorm-number');
    
    let students = await fetchStudents();
    if(dormNumber !== null){
        students = students.filter(student => student.dormitory_num == dormNumber);
    }

    const tableBody = document.getElementById('studentsBody');

    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name.concat(' ', student.surname)}</td>
            <td>${student.dormitory_num}</td>`;
        tableBody.appendChild(row);
    });

    console.log(students);
}


window.onload = updateTable;
