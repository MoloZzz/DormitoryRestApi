
async function fetchDormitories() {
    try {
        const response = await fetch('http://localhost:9999/api/dormitory');
        const dormitories = await response.json();
        return dormitories;
    } catch (error) {
        console.error('Помилка при отриманні списку гуртожитків:', error);
        alert('Помилка при отриманні списку гуртожитків:', error);
    }
}

async function updateTable() {
    const dormitories = await fetchDormitories();
    const tableBody = document.getElementById('dormitoriesBody');

    dormitories.sort((a, b) => a.dorm_number - b.dorm_number);

    tableBody.innerHTML = '';

    dormitories.forEach(dormitory => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dormitory.dorm_number}</td>
            <td>${dormitory.name}</td>
            <td>${dormitory.address}</td>
            <td><button id="dormitoryButton${dormitories.dormitory_num}" onclick="viewDormitory(${dormitories.dormitory_num})"\
            class="btn btn-secondary" style = "height:auto">Переглянути</button></td>
        `;
        tableBody.appendChild(row);
    });
}

window.onload = updateTable;



window.onload = updateTable;
