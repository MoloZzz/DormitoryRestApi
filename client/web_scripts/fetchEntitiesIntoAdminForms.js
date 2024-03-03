async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:9999/api/student');
        const students = await response.json();
        return students;
    } catch (error) {
        console.error('Помилка при отриманні списку студентів:', error);
        alert('Помилка при отриманні списку cтудентів:', error);
    }
}


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

async function fetchRooms(){
    try {
        const response = await fetch('http://localhost:9999/api/room');
        const rooms = await response.json();
        return rooms;
    } catch (error) {
        console.error('Помилка при отриманні списку кімнат:', error);
        alert('Помилка при отриманні списку кімнат:', error);
    }
}

async function setDormitoriesIntoSelect(identificator){

    const dormitories = await fetchDormitories();
    let selectDormitoriesElement = document.getElementById(identificator);

    let currentOption = 0;

    dormitories.forEach(dormitory => {
        let newDormitoryOption = document.createElement("option");
        newDormitoryOption.value = currentOption;
       
        selectDormitoriesElement.appendChild(newDormitoryOption);
        selectDormitoriesElement[currentOption].textContent = `${dormitory.name} `;
        selectDormitoriesElement[currentOption].value = dormitory.dorm_number;
        currentOption++;
      });
}


async function setRoomByDormNumberIntoSelect(identificator,selected_dormitoryId){

    const rooms = await fetchRooms();
    const selectRoomsElement = document.getElementById(identificator);

    while (selectRoomsElement.options.length > 0) {
        selectRoomsElement.remove(0);
    }


    let currentOption = 0;

    rooms.forEach(room => {
        if(room.dormitoryId == selected_dormitoryId){
        let newRoomOption = document.createElement("option");
        newRoomOption.value = currentOption;
        newRoomOption.textContent = `${room.room_name} `;
        newRoomOption.value = room.room_name;
        selectRoomsElement.appendChild(newRoomOption);
        
        currentOption++;
        }
      });

    //   if(currentOption == 0){
    //     let newRoomOption = document.createElement("option");
    //   }
}

async function getDormIdbyNumb(dorm_number){
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

        if(!dormResp.ok){
            dormitory_num.value = '';
            alert("Виникла помилка з get-by-dorm-num");
            throw new Error("помилка з get-by-dorm-num");
        }

        const dorm = await dormResp.json();
        return dorm.id;


    }catch(e){
        console.error('Помилка при отриманні гуртожитка по номеру:', error);
        alert('Помилка при отриманні гуртожитка по номеру:', error);
    }
}

setDormitoriesIntoSelect('student_dorm_number');
setDormitoriesIntoSelect('room_dorm_number');
setDormitoriesIntoSelect('worker_dorm_number');

async function setRoomNameSelect(){
    try{
        const addStudent_dormitory_numberElement = document.querySelector('#student_dorm_number');
        const selectedOption = addStudent_dormitory_numberElement.value;
        const addStudent_dormitory_id = await getDormIdbyNumb(selectedOption);
        await setRoomByDormNumberIntoSelect('student_room_name',addStudent_dormitory_id);
    }catch(e){
    console.error(e.message);
    }
}

