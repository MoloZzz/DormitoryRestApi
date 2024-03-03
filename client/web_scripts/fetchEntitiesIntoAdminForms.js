async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:9999/api/student');
        const students = await response.json();
        return students;
    } catch (error) {
        console.error('Помилка при отриманні списку студентів:', error);
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

async function setDormitoriesIntoSelect(){

    const dormitories = await fetchDormitories();
    let selectDormitoriesElement = document.getElementById('student_dorm_number');

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

setDormitoriesIntoSelect();