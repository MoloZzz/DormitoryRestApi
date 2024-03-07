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

async function fetchRooms() {
    try {
        const response = await fetch('http://localhost:9999/api/room');
        const rooms = await response.json();
        return rooms;
    } catch (error) {
        console.error('Помилка при отриманні списку кімнат:', error);
        alert('Помилка при отриманні списку кімнат:', error);
    }
}

async function setDormitoriesIntoSelect(identificator) {

    const dormitories = await fetchDormitories();
    let selectDormitoriesElement = document.getElementById(identificator);

    let currentOption = 1;

    dormitories.forEach(dormitory => {
        let newDormitoryOption = document.createElement("option");
        newDormitoryOption.value = currentOption;

        selectDormitoriesElement.appendChild(newDormitoryOption);
        selectDormitoriesElement[currentOption].textContent = `${dormitory.name} `;
        selectDormitoriesElement[currentOption].value = dormitory.dorm_number;
        currentOption++;
    });
}

async function getDormIdbyNumb(dorm_number) {
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
            alert("Виникла помилка з get-by-dorm-num");
            throw new Error("помилка з get-by-dorm-num");
        }

        const dorm = await dormResp.json();
        return dorm.id;
    } catch (e) {
        console.error('Помилка при отриманні гуртожитка по номеру:', e.message);
        alert('Помилка при отриманні гуртожитка по номеру:', e);
    }
}

setDormitoriesIntoSelect('student_dorm_number');
setDormitoriesIntoSelect('room_dorm_number');
setDormitoriesIntoSelect('worker_dorm_number');

let choices;

document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('student_room_name');
    
    if (element) {
        choices = new Choices(element, {
            searchEnabled: true,
            searchPlaceholderValue: 'Кімната...',
            itemSelectText: 'Натисніть щоб вибрати'
        });
    }
});



async function setRoomNameSelect() {
    choices.clearChoices();

    const rooms = await fetchRooms();
    
    const addStudent_dormitory_numberElement = document.querySelector('#student_dorm_number');
    const selectedOption = addStudent_dormitory_numberElement.value;

    if(!selectedOption){
        choices.setValue([""]);
        return;
    }
    const addStudent_dormitory_id = await getDormIdbyNumb(selectedOption);

    const options = rooms.filter(room => room.dormitoryId == addStudent_dormitory_id && room.free_capacity > 0)
        .map(room => ({
            value: room.room_name,
            label: room.room_name
        }));
    
    if(options.length > 0){
        choices.setChoices(options, 'value', 'label', true);
        const first_option = options[0];
        choices.setChoiceByValue(first_option.value);
    }else{
        console.log(choices);
        choices.setValue([""]);
    }
}