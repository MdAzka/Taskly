// Toggle akun dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("accountDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Tutup dropdown jika klik di luar
window.addEventListener("click", function (e) {
  const wrapper = document.querySelector(".account-wrapper");
  const dropdown = document.getElementById("accountDropdown");
  if (!wrapper.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// Load streak dari localStorage
const streakCountEl = document.getElementById("streakCount");
if (streakCountEl) {
  streakCountEl.textContent = localStorage.getItem("dailyStreak") || "0";
}

// ==========================
// QUEST LOGIC
// ==========================

let quests = [
  { text: "Buat Jurnal", date: "today", urgent: false },
  { text: "Kerjakan tugas IMK", date: "today", urgent: true },
  { text: "Beli beras", date: "upcoming", urgent: false },
];

let currentFilter = "all";
let completedCount = 0;

function renderQuests() {
  const list = document.getElementById("questList");
  const search = document.getElementById("searchInput")
    ? document.getElementById("searchInput").value.toLowerCase()
    : "";

  list.innerHTML = "";

  quests
    .filter(
      (q) =>
        (currentFilter === "all" || q.date === currentFilter) &&
        q.text.toLowerCase().includes(search)
    )
    .forEach((quest, index) => {
      const li = document.createElement("li");
      li.className = `quest-item ${quest.urgent ? "urgent" : ""}`;
      li.innerHTML = `
        <span>${quest.text}</span>
        <input type="checkbox" />
      `;

      li.querySelector("input").addEventListener("change", () => {
        quests.splice(index, 1);
        completedCount++;
        const counter = document.getElementById("completedCount");
        if (counter) counter.textContent = completedCount;
        renderQuests();
      });

      list.appendChild(li);
    });
}

function filterQuests(type) {
  currentFilter = type;
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  const tabBtn = document.querySelector(`.tab[onclick="filterQuests('${type}')"]`);
  if (tabBtn) tabBtn.classList.add("active");
  renderQuests();
}

function toggleAddForm() {
  const form = document.getElementById("questForm");
  form.style.display = form.style.display === "none" ? "flex" : "none";
}

// Tambah quest
const questForm = document.getElementById("questForm");
if (questForm) {
  questForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("questInput");
    const date = document.getElementById("questDate").value;
    const urgency = document.getElementById("questUrgency").value;

    if (input.value.trim()) {
      quests.push({
        text: input.value.trim(),
        date,
        urgent: urgency === "urgent",
      });
      input.value = "";
      renderQuests();
    }
  });
}

// Search input
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", renderQuests);
}

function resetQuestList() {
  renderQuests();
}
// Render kalender interaktif
function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  if (!grid) return;

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  grid.innerHTML = "";
  for (let d = 1; d <= daysInMonth; d++) {
    const dayBtn = document.createElement("button");
    dayBtn.textContent = d;
    dayBtn.className = "calendar-day";
    dayBtn.addEventListener("click", () => openDateForm(d));
    grid.appendChild(dayBtn);
  }
}

// Buka form input berdasarkan tanggal
function openDateForm(day) {
  const taskName = prompt(`Tambah Quest untuk tanggal ${day}:`);
  if (taskName) {
    quests.push({
      text: `${taskName} (on ${day})`,
      date: "upcoming",
      urgent: false,
    });
    renderQuests();
  }
}
window.addEventListener("DOMContentLoaded", () => {
  renderQuests();
  renderCalendar();
  const counter = document.getElementById("completedCount");
  if (counter) counter.textContent = completedCount;
});

// Render saat halaman selesai dimuat
window.addEventListener("DOMContentLoaded", () => {
  renderQuests();
  const counter = document.getElementById("completedCount");
  if (counter) counter.textContent = completedCount;
});
