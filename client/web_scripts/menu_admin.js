function ChangeContent(divName) {
    const allDivs = ["StudentDiv", "DormitoryDiv", "AccountDiv", "RoomDiv", "VisitorDiv", "WorkerDiv"];

    allDivs.forEach(function (divId) {
        const currentDiv = document.getElementById(divId);
        if (divId === divName) {
            currentDiv.style.display = "block";
        } else {
            currentDiv.style.display = "none";
        }
    });
}