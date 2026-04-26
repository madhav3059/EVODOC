function loadDashboard() {
    let data = JSON.parse(localStorage.getItem("evodoc_data")) || [];
    document.getElementById("count").innerText = data.length;
    let queue = document.getElementById("queue");
    queue.innerHTML = "";

    data.forEach(p => {
        let card = document.createElement("div");
        card.className = "patient-card";
        card.innerHTML = `<h3>${p.name}</h3><p>Time: ${p.time}</p><button>View Details</button>`;
        card.onclick = () => {
            document.getElementById("patientDetails").style.display = "block";
            document.getElementById("vName").innerText = p.name;
            document.getElementById("vAllergies").innerText = p.allergies;
        };
        queue.appendChild(card);
    });
}

window.onload = loadDashboard;