
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

    tableBody.innerHTML = '';

    dormitories.forEach(dormitories => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dormitories.dorm_number}</td>
            <td>${dormitories.name}</td>
            <td>${dormitories.address}</td>
        `;
        tableBody.appendChild(row);
    });
}


window.onload = updateTable;
