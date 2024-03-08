const editButton = document.getElementById("editButton");
const deleteButton = document.getElementById("deleteButton");

async function update(){
    await updateDormInfo(); 
    
    await updateTables();
}

async function updateDormInfo() {
    const dormNameElement = document.getElementById("dormName");
    const dormAddressElement = document.getElementById("dormAddress");
    const dormNumberElement = document.getElementById("dormNumber");

    const urlParams = new URLSearchParams(window.location.search);
    const dormNumber = urlParams.get('dorm-number');

    if (!dormNumber) {
        alert("Помилка. Потрібен номер гуртожитку");
        return;
    }

    try {
        const dorm = await getDormByNum(dormNumber);
        dormNameElement.textContent = dorm.name;
        dormAddressElement.textContent = dorm.address;
        dormNumberElement.textContent = dorm.dorm_number;
    } catch (error) {
        console.error("Error fetching dormitory information:", error);
    }
}

document.addEventListener('click', function (event) {
    var dropdown = document.querySelector('.dropdown-content');
    var customSelect = document.querySelector('.custom-select');
    var isClickInside = customSelect.contains(event.target);

    if (!isClickInside && dropdown.style.display === 'block') {
        toggleDropdown();
    }
});

function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
}

function selectOption(value) {
    var selectedOption = document.querySelector('.selected-option');
    selectedOption.textContent = value === 'value1' ? 'Студенти' : 'Працівники';
    setTable(selectedOption.textContent);
    updateTables();
}

async function getDormByNum(dorm_number) {
    try {
        const dormResp = await fetch('http://localhost:9999/api/dormitory/get-by-dorm-num', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dorm_number
            }),
        });

        if (!dormResp.ok) {
            dormitory_num.value = '';
            alert("Виникла помилка з get-by-dorm-num");
            throw new Error("помилка з get-by-dorm-num");
        }

        const dorm = await dormResp.json();
        return dorm;
    } catch (e) {
        console.error('Помилка при отриманні гуртожитка по номеру:', e);
        alert('Помилка при отриманні гуртожитка по номеру:', e);
    }
}

function toggleTables(selectedOption) {
    var studentsTable = document.getElementById('studentsTable');
    var workersTable = document.getElementById('workersTable');

    if (selectedOption === 'Студенти') {
        studentsTable.style.display = 'table';
        workersTable.style.display = 'none';
    } else if (selectedOption === 'Працівники') {
        studentsTable.style.display = 'none';
        workersTable.style.display = 'table';
    }
}

function setTable(selectedOption) {
    toggleTables(selectedOption);
}

async function updateStudentTable(dormNumber){
    let students = await fetchStudents();
    
    if(dormNumber !== null){
        students = students.filter(student => student.dormitory_num == dormNumber);
    }

    const tableBody = document.getElementById('studentsBody');

    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="http://localhost:9999/studentInfo.html?studentId=${student.id}" class="text-decoration-none">${student.name.concat(' ', student.surname)}</td>
            <td>${student.dormitory_num}</td>`;
        tableBody.appendChild(row);
    });
}

async function updateWorkerTable(dormNumber){
    let workers = await fetchWorkers(dormNumber);

    const tableBody = document.getElementById('workersBody');

    tableBody.innerHTML = '';

    workers.forEach(worker => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${worker.name.concat(' ', worker.surname)}</td>
            <td>${worker.salary}</td>`;
        tableBody.appendChild(row);
    });
}

async function updateTables() {
    const urlParams = new URLSearchParams(window.location.search);
    const dormNumber = urlParams.get('dorm-number');
    
    await updateStudentTable(dormNumber);
    await updateWorkerTable(dormNumber);
}

async function fetchWorkers(dorm_number) {
    try {
        const response = await fetch('http://localhost:9999/api/worker/get-all-by-dorm-number', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dorm_number
            }),
        });

        const workers = await response.json();

        if(!response){
            alert("Такого гуртожитку не існує!")
            return;
        }

        return workers;
    } catch (error) {
        console.error('Помилка при отриманні списку працівників:', error);
    }
}

window.onload = update;