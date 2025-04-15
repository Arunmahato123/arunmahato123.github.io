
// we are working on API , we will finish next day


// Quotes collection categorized by mood
 const quotes = {
  happy: 
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes',
    headers: { 'X-Api-Key': 'jQe1fIBjLoaX/Uyg0aRLkA==nuKBUNvXQqs1VoSN'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
  })
}

//       "Happiness is contagious — spread it around!",
//       "The purpose of our lives is to be happy.",
//       "Happiness is not something ready made. It comes from your own actions."
//     ],
//     sad: [
//       "Tough times never last, but tough people do.",
//       "It’s okay to not be okay. Better days are coming.",
//       "Sadness flies away on the wings of time."
//     ],
//     Worried: [
//       "You are stronger than you think.",
//       "Take a deep breath — you’ve got this.",
//       "Sometimes the most productive thing you can do is relax."
//     ],
//     excited: [
//       "Great things are coming your way!",
//       "Keep your enthusiasm alive — it’s contagious.",
//       "Let your excitement shine and inspire others!"
//     ],
//     Angry:[
//       "Anger is a powerful catalyst for change when wielded with purpose and resolve.",
//       "Let not anger be your downfall, but the fire that ignites your resolve.",
//       "In the crucible of anger, clarity is forged."

//     ]
//   };
  
  // Select elements
  const moodForm = document.getElementById('moodForm');
  const moodSelect = document.getElementById('moodSelect');
  const quoteDisplay = document.getElementById('quoteDisplay');
  const moodHistory = document.getElementById('moodHistory');
  
  // Event: When form is submitted
  moodForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const selectedMood = moodSelect.value;
  
    if (!selectedMood) {
      alert('Please select a mood!');
      return;
    }
  
    // Pick a random quote based on mood
    const moodQuotes = quotes[selectedMood];
    const randomIndex = Math.floor(Math.random() * moodQuotes.length);
    const selectedQuote = moodQuotes[randomIndex];
  
    // Display quote
    quoteDisplay.textContent = `"${selectedQuote}"`;
  
    // Save mood history
    saveMood(selectedMood);
  
    // Refresh mood history display
    loadMoodHistory();
  
    // Reset form
    moodForm.reset();
  });
  
  // Save mood to localStorage
  function saveMood(mood) {
    let moods = JSON.parse(localStorage.getItem('moodHistory')) || [];
    const date = new Date().toLocaleString();
    moods.push(`${date}: ${mood}`);
    localStorage.setItem('moodHistory', JSON.stringify(moods));
  }
  
  // Load mood history from localStorage
  function loadMoodHistory() {
    let moods = JSON.parse(localStorage.getItem('moodHistory')) || [];
    moodHistory.innerHTML = '';
    moods.forEach(moodEntry => {
      const li = document.createElement('li');
      li.textContent = moodEntry;
      moodHistory.appendChild(li);
    });
  }
  
  // Load history on page load
  window.addEventListener('load', loadMoodHistory);
  