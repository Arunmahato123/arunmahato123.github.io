// Function to sanitize inputs to prevent HTML/JavaScript injection
function sanitizeInput(input) {
    return input.replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/&/g, "&amp;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&apos;");
}

// Array to store sanitized data
let formDataArray = [];

// Real-time validation for username
document.getElementById('username').addEventListener('input', function () {
    const username = this.value;
    const usernameError = document.getElementById('usernameError');
    const usernamePattern = /^[A-Za-z0-9_]+$/;

    if (!usernamePattern.test(username)) {
        usernameError.textContent = "Username must only contain letters, numbers, and underscores.";
    } else {
        usernameError.textContent = "";
    }
});

// Real-time validation for password
document.getElementById('password').addEventListener('input', function () {
    const password = this.value;
    const passwordError = document.getElementById('passwordError');
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordPattern.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long with one uppercase, one lowercase, one number, and one special character.";
    } else {
        passwordError.textContent = "";
    }
});

// Form submission
document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Check if all validation errors are cleared
    if (document.getElementById('usernameError').textContent || document.getElementById('passwordError').textContent) {
        alert("Please correct the errors before submitting.");
        return;
    }

    // Collect all form data and sanitize it
    formDataArray = [
        sanitizeInput(document.getElementById('name').value),
        sanitizeInput(document.getElementById('phone').value),
        sanitizeInput(document.getElementById('email').value),
        sanitizeInput(document.getElementById('comment').value),
        sanitizeInput(document.getElementById('username').value),
        sanitizeInput(document.getElementById('password').value)
    ];

    // Simulate form submission or handling
    console.log('Form submitted successfully with sanitized data:', formDataArray);

    // Add success feedback or handle the submission further (e.g., save to server, etc.)
    alert("Form submitted successfully!");
});
