function toggleDropdown() {
  const dropdown = document.getElementById("accountDropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

window.addEventListener("click", function (e) {
  const wrapper = document.querySelector(".account-wrapper");
  const dropdown = document.getElementById("accountDropdown");
  if (!wrapper.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

const streakCount = document.getElementById("streakCount");
if (streakCount) {
  streakCount.textContent = localStorage.getItem("dailyStreak") || "0";
}

const questList = document.getElementById("questList");
let quests = [];

function renderQuests() {
  questList.innerHTML = "";
  quests.forEach((q, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" id="q${index}"> <label for="q${index}">${q.text}</label>`;
    li.querySelector("input").addEventListener("change", () => {
      quests.splice(index, 1);
      renderQuests();
    });
    questList.appendChild(li);
  });
}

function renderCalendar() {
  const calendar = document.getElementById("calendar");
  const days = 30;
  calendar.innerHTML = "";

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekDays.forEach(day => {
    const div = document.createElement("div");
    div.textContent = day;
    div.style.fontWeight = "bold";
    calendar.appendChild(div);
  });

  for (let i = 1; i <= days; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = i;
    dayDiv.addEventListener("click", () => openModal(i));
    calendar.appendChild(dayDiv);
  }
}

function openModal(date) {
  document.getElementById("taskModal").style.display = "block";
  document.getElementById("modalDate").textContent = `June ${date}`;
  document.getElementById("taskForm").dataset.date = date;
}

function closeModal() {
  document.getElementById("taskModal").style.display = "none";
}

document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const text = document.getElementById("taskInput").value.trim();
  const time = document.getElementById("taskTime").value;
  if (text && time) {
    quests.push({ text: `${text} @ ${time}` });
    renderQuests();
    closeModal();
    this.reset();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  renderCalendar();
  renderQuests();
});
