let studentId;

async function update() {
    const urlParams = new URLSearchParams(window.location.search);
    studentId = urlParams.get('studentId');

    if (!studentId) {
        alert("");
        return;
    }

    await updateStudentInfo();
    await updateVisitorsTable();
}

async function fetchVisitors() {
    const visitorsResp = await fetch(`http://localhost:9999/api/visitor/get-all-by-student-id/${studentId}`);
    return await visitorsResp.json();
}

async function updateStudentInfo() {
    const studentName = document.getElementById("studentName");
    const studentSurname = document.getElementById("studentSurname");
    const studentDormNumber = document.getElementById("studentDormNumber");
    const studentRoomName = document.getElementById("studentRoomName");
    const studentContactInfo = document.getElementById("studentContactInfo");
    const studentBalance = document.getElementById("studentBalance");

    if (!studentId) {
        alert("Помилка. Потрібен id студента");
        return;
    }

    try {
        const studentInfoResp = await fetch(`http://localhost:9999/api/student/info/${studentId}`)
        const studentInfo = await studentInfoResp.json();

        studentName.textContent = studentInfo.name;
        studentSurname.textContent = studentInfo.surname;
        studentDormNumber.textContent = studentInfo.dormitory_num;
        studentRoomName.textContent = studentInfo.room.room_name;
        studentContactInfo.textContent = studentInfo.contact_info;
        studentBalance.textContent = studentInfo.account.balance;
    } catch (error) {
        console.error("Error fetching dormitory information:", error);
    }
}

async function updateVisitorsTable() {
    const visitors = await fetchVisitors();
    if (!visitors) {
        alert("Помилка з отриманням гостей")
        return;
    }

    const tableBody = document.getElementById('visitorsBody');

    tableBody.innerHTML = '';

    visitors.forEach(visitor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${visitor.name}</td>
            <td>${visitor.surname}</td>
            <td>${visitor.passport}</td>`;
        tableBody.appendChild(row);
    });
}

async function editStudent() {
    const fieldNameInput = document.getElementById('fieldName');
    const newValueInput = document.getElementById('newValue');

    if (!studentId) {
        alert("Помилка. Потрібен id студента");
        return;
    }

    const fieldName = fieldNameInput.value;
    const newValue = newValueInput.value;

    // contact_info without validation
    if (fieldName !== 'contact_info' && !isValidUkrSymb(newValue)) {
        alert("Нова значення має складатися з українських літар і спец символів");
        return;
    }

    const data = {
        id: studentId,
        fieldName,
        newValue,
    };

    try {
        const response = await fetch('/api/student/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log(response);

        if (response.ok) {
            const updatedStudent = await response.json();
            alert("Дані успішно змінені");
            await toggleChengeStudentForm();
            // there is better way
            await updateStudentInfo();
        } else {
            const error = await response.json();
            console.error('Помилка:', error);
        }
    } catch (e) {
        console.error('Непередбачена помилка:', e);
    }
}

async function changeBalance() {
    const newBalanceInput = document.getElementById('newBalance');

    if (!isValidDecimal(newBalanceInput.value)) {
        alert('Введіть коректне значення для нового балансу.');
        return;
    }

    const newBalance = newBalanceInput.value;

    const balanceChangeResp = await fetch(`http://localhost:9999/api/account/update-by-student-id/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            balance: newBalance
        }),
    });

    if (!balanceChangeResp.ok) {
        alert("Виникла помилка зі зміною балансу");
        throw new Error("помилка зі зміною");
    }

    alert("Дані успішно змінені");
    const studentBalance = document.getElementById('studentBalance');
    studentBalance.textContent = newBalance;

    newBalanceInput.value = '';
    await toggleChangeBalanceForm();
}


async function toggleChangeBalanceForm() {
    const form = document.getElementById("balanceForm");
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

async function toggleChengeStudentForm() {
    const form = document.getElementById("changeStudentForm");
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

async function deleteStudent() {
    const response = await fetch(`http://localhost:9999/api/student/${studentId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        alert("Помилка з видаленням студента");
        throw new Error("помилка з видаленням студента");
    }

    alert("Студента успішно видалено");

    window.location.href = "/";
};

window.onload = update;