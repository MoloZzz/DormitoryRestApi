
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

async function viewDormitory(dorm_number){

    const dormResp = await fetch('http://localhost:9999/api/dormitory/get-by-dorm-num', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dorm_number
            }),
    });

    const dorm = await dormResp.json();
    console.log(dorm);
    alert(dorm.id);
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
            <td><a href="http://localhost:9999/dormInfo.html?dorm-number=${dormitory.dorm_number}" class="text-decoration-none">${dormitory.name}</a></td>
            <td>${dormitory.address}</td>    
`;
        tableBody.appendChild(row);
    });
}

window.onload = updateTable;



