async function importTableExel(){
    try{
        const response = await fetch('http://localhost:9999/api/account/importExcel', {
            method: 'POST',
            responseType: "blob"
        });

        const blob = await response.blob();

        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([blob]));
        downloadLink.download = "dorm_excel_table.xlsx";
        downloadLink.click();
    }catch(e){
        console.error(e);
    }
}
