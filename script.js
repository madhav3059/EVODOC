function savePatient() {
    let name = document.getElementById("name").value;
    if (name === "") { alert("Validation Error: Full Name is required."); return; }

    let patient = {
        name: name,
        blood: document.getElementById("blood").value,
        allergies: document.getElementById("allergies").value,
        doctor: document.getElementById("docSelect").value,
        time: document.getElementById("apptTime").value,
        status: "Scheduled"
    };

    let data = JSON.parse(localStorage.getItem("evodoc_data")) || [];
    data.push(patient);
    localStorage.setItem("evodoc_data", JSON.stringify(data));
    
    renderTable();
    alert("Record Saved Successfully");
}

function renderTable() {
    let data = JSON.parse(localStorage.getItem("evodoc_data")) || [];
    let body = document.querySelector("#apptTable tbody");
    body.innerHTML = data.map((p, i) => `
        <tr>
            <td>${p.name}</td>
            <td>${p.doctor}</td>
            <td>${p.time}</td>
            <td><span class="badge">${p.status}</span></td>
            <td><button onclick="cancel(${i})">Cancel</button></td>
        </tr>
    `).join("");
}

function searchTable() {
    let val = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#apptTable tbody tr");
    rows.forEach(r => r.style.display = r.innerText.toLowerCase().includes(val) ? "" : "none");
}

function cancel(i) {
    let data = JSON.parse(localStorage.getItem("evodoc_data"));
    data.splice(i, 1);
    localStorage.setItem("evodoc_data", JSON.stringify(data));
    renderTable();
}

window.onload = renderTable;