

const lightModeButton =document.getElementById('light-mode');
const darkModeButton = document.getElementById('dark-mode');
const warmColorsButton = document.getElementById('warm-colors');
const currentSettingText = document.getElementById('current-setting');

// Function to update the appearance
function updateAppearance(mode, text) {
  document.body.className = mode; // To Set body class
  currentSettingText.textContent = `Current Setting: ${text}`;  // To Update the text
}

// Event listeners for buttons
lightModeButton.addEventListener('click', () => updateAppearance('light-mode', 'Light Mode'));
darkModeButton.addEventListener('click', () => updateAppearance('dark-mode', 'Dark Mode'));
warmColorsButton.addEventListener('click', () => updateAppearance('warm-colors', 'Warm Colors'));

