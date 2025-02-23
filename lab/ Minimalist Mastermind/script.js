// Function to generate a random 4-digit secret code (numbers 1-6)
function generateSecretCode() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
}

let secretCode = generateSecretCode();
console.log("Secret Code:", secretCode.join("")); // Debugging hint

// Custom error class
class RuleError extends Error {
    constructor(message) {
        super(message);
        this.name = "Rule Error";
    }
}

// Function to check the user input
function checkInput(slot) {
    try {
        if (isNaN(slot)) {
            throw new RuleError("Slots must contain numbers only");
        }
        if (slot < 1 || slot > 6) {
            throw new RuleError("Only numbers between 1 and 6 are accepted");
        }
        return true;
    } catch (error) {
        alert(error.message);
        return false;
    }
}

// Function to check the user's guess
function checkGuess() {
    const userInput = document.getElementById("userGuess").value;
    if (userInput.length !== 4) {
        alert("Please enter exactly 4 digits.");
        return;
    }

    const userGuess = userInput.split("").map(Number);

    // Validate each input number
    for (let num of userGuess) {
        if (!checkInput(num)) {
            return;
        }
    }

    // Compare user guess with secret code
    let black = 0, white = 0;
    let codeCopy = [...secretCode];

    // Check for correct positions (black pegs)
    for (let i = 0; i < 4; i++) {
        if (userGuess[i] === codeCopy[i]) {
            black++;
            codeCopy[i] = null; // Mark as matched
        }
    }

    // Check for correct digits in the wrong place (white pegs)
    for (let i = 0; i < 4; i++) {
        if (codeCopy.includes(userGuess[i]) && userGuess[i] !== secretCode[i]) {
            white++;
            codeCopy[codeCopy.indexOf(userGuess[i])] = null;
        }
    }

    document.getElementById("feedback").innerText =
        `Black: ${black}, White: ${white}`;

    if (black === 4) {
        alert("Congratulations! You guessed the code!");
    }
}

// Function to reset the game
function resetGame() {
    secretCode = generateSecretCode();
    console.log("New Secret Code:", secretCode.join("")); // Debugging hint
    document.getElementById("userGuess").value = "";
    document.getElementById("feedback").innerText = "";
}

// Add event listener to reset button
document.getElementById("resetButton").addEventListener("click", resetGame);
