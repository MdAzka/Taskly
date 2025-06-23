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
