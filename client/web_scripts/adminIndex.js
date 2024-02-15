async function addDormitory() {
    const name = document.getElementById('dorm_name').value;
    const dorm_number = document.getElementById('dormNumber').value;
    const address = document.getElementById('address').value;

    try {
        const response = await fetch('http://localhost:9999/api/dormitory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, dorm_number: dorm_number, address }),
        });

        if (response.ok) {
            alert('Гуртожиток успішно додано!');
            document.getElementById('addDormitoryForm').reset();
        } else {
            const data = await response.json();
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        console.error('Помилка при відправці запиту:', error);
    }
}

async function addStudent() {
    try {
        const email = document.getElementById('email').value;
        const surname = document.getElementById('surname').value;
        const name = document.getElementById('name').value;
        const dormitory_num = document.getElementById('dormitory_num').value;
        const roomId = document.getElementById('roomId').value;
        const contact_info = document.getElementById('contact_info').value;

        const response = await fetch('http://localhost:9999/api/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                surname,
                name,
                dormitory_num,
                roomId,
                contact_info,
            }),
        });

        if (response.ok) {
            alert('Студент успішно додано!');
            // Очистка полів форми
            document.getElementById('addStudentForm').reset();
        } else {
            const data = await response.json();
            alert(`Помилка: ${data.message}`);
        }

    } catch (error) {
        console.error('Помилка при додаванні студента:', error);
        alert('Помилка при додаванні студента:', error);
    }
}
