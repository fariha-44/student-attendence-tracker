const students = [
  { name: "Aisha Ali", initials: "AA", rate: "95.2%" },
  { name: "Maryan Abdi", initials: "MA", rate: "88.7%" },
  { name: "Xafasa Mohamed ", initials: "XM", rate: "92.1%" },
  { name: "Mohamed Abdi", initials: "MA", rate: "97.8%" }
];

const attendance = {}; 

function renderStudents() {
  const list = document.getElementById("studentList");
  list.innerHTML = "";
  students.forEach((s, i) => {
    list.innerHTML += `
      <div class="student">
        <div class="student-info">
          <div class="avatar">${s.initials}</div>
          <div class="student-details">
            <span>${s.name}</span>
            <span>Attendance Rate: ${s.rate}</span>
          </div>
        </div>
        <div class="buttons" id="buttons-${i}">
          <button class="present" onclick="markAttendance(${i}, 'Present', this)">Present</button>
          <button class="late" onclick="markAttendance(${i}, 'Late', this)">Late</button>
          <button class="absent" onclick="markAttendance(${i}, 'Absent', this)">Absent</button>
        </div>
      </div>
    `;
  });
  updateStats();
}

function markAttendance(i, status, btn) {
  attendance[i] = status;

  const buttons = document.querySelectorAll(`#buttons-${i} button`);
  buttons.forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  updateStats();
}

function updateStats() {
  document.getElementById("total").innerText = students.length;
  document.getElementById("present").innerText = Object.values(attendance).filter(s => s === "Present").length;
  document.getElementById("late").innerText = Object.values(attendance).filter(s => s === "Late").length;
  document.getElementById("absent").innerText = Object.values(attendance).filter(s => s === "Absent").length;
}

function saveAttendance() {
  localStorage.setItem("attendance", JSON.stringify(attendance));
  alert("Attendance saved!");
}
function addStudent() {
  const name = prompt("Enter student name:");
  if (!name) return;

  // Generate initials from name
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();

  // Add to students array
  students.push({ name: name, initials: initials, rate: "0%" });

  // Re-render full list so design stays consistent
  renderStudents();
}


renderStudents();
