document.getElementById("moodForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const moodSelect = document.getElementById("moodSelect");
  const mood = moodSelect.value;

  if (mood === "") {
    alert("Please select a mood!");
    return;
  }

  const moodCategories = {
    happy: "happiness",
    sad: "inspirational",
    worried: "motivational",
    excited: "success",
    angry: "anger"
  };

  const category = moodCategories[mood];

  fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
    headers: { "X-Api-Key": "xi3u16/VzRfINhcbCIhREQ==GDluysybou8tVChJ" }
  })
  .then(response => response.json())
  .then(data => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (data.length > 0) {
      quoteDisplay.textContent = `"${data[0].quote}" — ${data[0].author}`;
    } else {
      quoteDisplay.textContent = "No quote found. Try again!";
    }

    saveMood(mood);
    loadMoodHistory();
    updateMoodCounts();
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
