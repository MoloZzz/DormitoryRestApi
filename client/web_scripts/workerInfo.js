let workerId;

async function update() {
    const urlParams = new URLSearchParams(window.location.search);
    workerId = urlParams.get('workerId');

    if (!workerId) {
        alert("");
        return;
    }

    await updateWorkerInfo();
}

async function toggleChangeWorkerForm() {
    const form = document.getElementById("changeWorkerForm");
    form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

async function updateWorkerInfo() {
    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const salary = document.getElementById("salary");
    const position = document.getElementById("position");
    
    if (!workerId) {
        alert("Помилка. Потрібен id студента");
        return;
    }

    try {
        const workerResp = await fetch(`http://localhost:9999/api/worker/${workerId}`)
        const worker = await workerResp.json();

        name.textContent = worker.name;
        surname.textContent = worker.surname;
        salary.textContent = worker.salary;
        position.textContent = position.salary;
    } catch (error) {
        console.error("Error fetching worker information:", error);
    }
}

async function editWorker() {
    const fieldNameInput = document.getElementById('fieldName');
    const newValueInput = document.getElementById('newValue');

    if (!workerId) {
        alert("Помилка. Потрібен id студента");
        return;
    }

    const fieldName = fieldNameInput.value;
    const newValue = newValueInput.value;

    const data = {
        id: workerId,
        fieldName,
        newValue,
    };

    try {
        const response = await fetch('/api/worker/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const updatedWorker = await response.json();
            console.log('Студент успішно оновлено:', updatedWorker);
            await toggleChangeWorkerForm();
            // there is better way
            await updateWorkerInfo();
        } else {
            const error = await response.json();
            console.error('Помилка:', error);
        }
    } catch (e) {
        console.error('Непередбачена помилка:', e);
    }

}

window.onload = update;