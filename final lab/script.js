document.getElementById("moodForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const moodSelect = document.getElementById("moodSelect");
  const mood = moodSelect.value;

  if (mood === "") {
    alert("Please select a mood!");
    return;
  }

  // Save the mood to localStorage and update history and counts
  saveMood(mood);
  loadMoodHistory();
  updateMoodCounts();

  // Fetch a random quote from Quotable.io
  fetch("http://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      const quoteDisplay = document.getElementById("quoteDisplay");
      quoteDisplay.textContent = `"${data.content}" — ${data.author}`;
    })
    .catch(error => {
      console.error("Error fetching quote:", error);
      document.getElementById("quoteDisplay").textContent = "Failed to load quote.";
    });

  moodSelect.value = "";
});

function saveMood(mood) {
  let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
  moods.push(`${new Date().toLocaleString()}: ${mood}`);
  localStorage.setItem("moodHistory", JSON.stringify(moods));
}

function loadMoodHistory() {
  let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const moodHistory = document.getElementById("moodHistory");
  moodHistory.innerHTML = "";
  moods.slice(-10).reverse().forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    moodHistory.appendChild(li);
  });
}

function updateMoodCounts() {
  let moods = JSON.parse(localStorage.getItem("moodHistory")) || [];
  const counts = { happy: 0, sad: 0, worried: 0, excited: 0, angry: 0 };

  moods.forEach(entry => {
    const mood = entry.split(": ")[1].toLowerCase();
    if (counts[mood] !== undefined) {
      counts[mood]++;
    }
  });

  for (const mood in counts) {
    document.getElementById(`count-${mood}`).textContent = counts[mood];
  }
}

window.addEventListener("load", () => {
  loadMoodHistory();
  updateMoodCounts();
});
