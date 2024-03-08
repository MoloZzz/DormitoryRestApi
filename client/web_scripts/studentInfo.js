let studentId;

async function update(){
    const urlParams = new URLSearchParams(window.location.search);
    studentId = urlParams.get('studentId');

    if(!studentId){
        alert("");
        return;
    }

    await updateStudentInfo();
}

async function updateStudentInfo(){
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
        const studentResp = await fetch(`http://localhost:9999/api/student/${studentId}`)
        const student = await studentResp.json();
        console.log(student);
        
        studentName.textContent = student.name;
        studentSurname.textContent = student.surname;
        studentDormNumber.textContent = student.dormitory_num;
        studentRoomName.textContent = await getRoomName(student.roomId);
        studentContactInfo.textContent = student.contact_info;
        studentBalance.textContent = await getBalance(studentId);;
    } catch (error) {
        console.error("Error fetching dormitory information:", error);
    }
}

async function getBalance(studentId){
    const accountResp = await fetch(`http://localhost:9999/api/account/${studentId}`);
    
    if(!accountResp.ok){
        alert("Помилка з отриманням даних рахунку");
        throw new Error("помилка з get account");   
    }

    const account = await accountResp.json();
    return account.balance;    
}

async function getRoomName(roomId){
    const roomResp = await fetch(`http://localhost:9999/api/room/${roomId}`);
    const room = await roomResp.json();

    return room.room_name;
}

async function editStudent(){

}

async function changeBalance(){
    const newBalanceInput = document.getElementById('newBalance');
    const newBalance = parseFloat(newBalanceInput.value);

    if (!isNaN(newBalance)) {
        const balanceChangeResp = await fetch(`http://localhost:9999/api/account/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId,
                balance: newBalance
            }),
        });

        console.log(balanceChangeResp.json());

        if(!balanceChangeResp.ok){
            alert("Виникла помилка зі зміною балансу");
            throw new Error("помилка зі зміною");
        }

        alert("Дані успішно змінені");
        const studentBalance = document.getElementById('studentBalance');
        studentBalance.textContent = newBalance;
    } else {
        alert('Введіть коректне значення для нового балансу.');
    }

    newBalanceInput.value = '';
    await toggleChangeBalanceForm();
}


async function toggleChangeBalanceForm(){
    const form = document.getElementById("balanceForm");
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

async function deleteStudent(){
    const response = await fetch(`http://localhost:9999/api/student/${studentId}`, {
        method: 'DELETE'
    });

    if(!response.ok){
        alert("Помилка з видаленням студента");
        throw new Error("помилка з видаленням студента");
    }

    alert("Студента успішно видалено");

};

window.onload = update;