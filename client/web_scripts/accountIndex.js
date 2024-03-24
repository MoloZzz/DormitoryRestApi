async function importTableExel() {
    try {
        const response = await fetch('http://localhost:9999/api/account/importToExcel', {
            method: 'POST',
            responseType: "blob"
        });

        const blob = await response.blob();

        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([blob]));
        downloadLink.download = "dorm_excel_table.xlsx";
        downloadLink.click();
    } catch (e) {
        console.error(e);
    }
}


async function uploadFile() {
    const fileInput = document.getElementById('getFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('api/account/importExcel', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('File uploaded successfully.');
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file.');
    }
}
