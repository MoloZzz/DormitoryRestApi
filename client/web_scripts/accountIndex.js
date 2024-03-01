async function importTableExel(){
    try{
        const response = await fetch('http://localhost:9999/api/account/importExcel', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }catch(e){

    }
}

importTableExel();