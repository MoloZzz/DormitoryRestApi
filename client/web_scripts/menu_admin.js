function ChangeContent(divName) {
    const allDivs = ["StudentDiv", "DormitoryDiv", "RoomDiv", "VisitorDiv", "WorkerDiv"];

    allDivs.forEach(function (divId) {
        const currentDiv = document.getElementById(divId);
        currentDiv.style.display = (divId === divName) ? "block" : "none"; 
    });
}