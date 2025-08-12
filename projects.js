document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("role");
    const batch = localStorage.getItem("batch");
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");

    if (!role) {
        window.location.href = "login.html";
        return;
    }

    if (role === "student") {
        document.getElementById("student-section").classList.remove("hidden");
        document.getElementById("batch-number").textContent = batch;
    } else if (role === "faculty") {
        document.getElementById("faculty-section").classList.remove("hidden");
        renderProjects();
    }
});

function uploadProject() {
    const fileInput = document.getElementById("project-file");
    const batch = localStorage.getItem("batch");

    if (!fileInput.files.length) {
        alert("Please select a file.");
        return;
    }

    const file = fileInput.files[0];
    let projects = JSON.parse(localStorage.getItem("projects") || "[]");

    projects.push({
        batch: batch,
        fileName: file.name,
        status: "Pending",
        marks: ""
    });

    localStorage.setItem("projects", JSON.stringify(projects));
    document.getElementById("upload-status").textContent = "✅ Project uploaded successfully!";
}

function renderProjects() {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const tableBody = document.getElementById("projects-list");
    tableBody.innerHTML = "";

    projects.forEach((project, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${project.batch}</td>
            <td>${project.fileName}</td>
            <td class="${project.status === 'Complete' ? 'status-complete' : 'status-pending'}">${project.status}</td>
            <td>${project.marks || '-'}</td>
            <td>
                <input type="number" id="marks-${index}" placeholder="Marks" style="width:60px;">
                <button onclick="evaluateProject(${index})">Save</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function evaluateProject(index) {
    let projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const marks = document.getElementById(`marks-${index}`).value;

    if (marks === "") {
        alert("Please enter marks.");
        return;
    }

    projects[index].marks = marks;
    projects[index].status = "Complete";
    localStorage.setItem("projects", JSON.stringify(projects));
    renderProjects();
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
