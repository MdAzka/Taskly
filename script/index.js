function toggleDropdown() {
  const dropdown = document.getElementById("accountDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", function (e) {
  const wrapper = document.querySelector(".account-wrapper");
  const dropdown = document.getElementById("accountDropdown");

  if (!wrapper.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

let tasks = [
  { text: "Kerjakan tugas IMK", urgent: true },
  { text: "Beli beras", urgent: true }
];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.urgent ? "urgent" : "normal"}`;
    li.innerHTML = `
      <input type="checkbox" id="task-${index}">
      <label for="task-${index}" class="task-label">${task.text}</label>
    `;
    li.querySelector("input").addEventListener("change", () => {
      tasks.splice(index, 1);
      renderTasks();
    });
    list.appendChild(li);
  });
}

document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("taskInput");
  if (input.value.trim() !== "") {
    tasks.push({ text: input.value.trim(), urgent: false });
    input.value = "";
    renderTasks();
  }
});

let quests = [
  { text: "Exercise for 30 mins" },
  { text: "Read 5 pages" }
];

function renderQuests() {
  const questList = document.getElementById("questList");
  questList.innerHTML = "";

  quests.forEach((quest, index) => {
    const li = document.createElement("li");
    li.className = "quest-item";
    li.innerHTML = `
      <input type="checkbox" id="quest-${index}">
      <label for="quest-${index}">${quest.text}</label>
    `;
    li.querySelector("input").addEventListener("change", () => {
      quests.splice(index, 1);
      renderQuests();
    });
    questList.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  renderQuests();
});



window.addEventListener("DOMContentLoaded", renderTasks);
