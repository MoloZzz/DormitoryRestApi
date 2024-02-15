async function addDormitory() {
    const name = document.getElementById('name').value;
    const dormNumber = document.getElementById('dormNumber').value;
    const address = document.getElementById('address').value;

    try {
        const response = await fetch('http://localhost:9999/api/dormitory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, dorm_number: dormNumber, address }),
        });

        if (response.ok) {
            alert('Гуртожиток успішно додано!');
            // Можна додати додаткову логіку, наприклад, очистити форму або перенаправити користувача
        } else {
            const data = await response.json();
            alert(`Помилка: ${data.message}`);
        }
    } catch (error) {
        console.error('Помилка при відправці запиту:', error);
    }
}