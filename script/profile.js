// Toggle Dropdown Akun
function toggleDropdown() {
  const dropdown = document.getElementById("accountDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Tutup dropdown jika klik di luar area akun
window.addEventListener("click", function (e) {
  const wrapper = document.querySelector(".account-wrapper");
  const dropdown = document.getElementById("accountDropdown");
  if (!wrapper.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// Ambil dan tampilkan nilai streak dari localStorage
const streakValue = localStorage.getItem("dailyStreak") || "10";
const streakTop = document.getElementById("streakCount");
const streakProfile = document.querySelector(".streak-number");

if (streakTop) streakTop.textContent = streakValue;
if (streakProfile) streakProfile.textContent = streakValue;

// Data teman yang di-follow
const followedData = [
  "👤 Illyas",
  "👨‍💻 Mnaufal",
  "🐱 Opip",
  "🧠 Kevin",
  "🧙 Damar",
  "🐸 Rangga",
];

let showAll = false;

function renderFollowedList() {
  const list = document.getElementById("followedList");
  const btn = document.getElementById("toggleFollowedBtn");
  list.innerHTML = "";

  const displayData = showAll ? followedData : followedData.slice(0, 3);
  displayData.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });

  btn.textContent = showAll ? "View Less" : "View More";
}

function toggleFollowed() {
  showAll = !showAll;
  renderFollowedList();
}

window.addEventListener("DOMContentLoaded", renderFollowedList);
