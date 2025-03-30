document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const taskCount = document.getElementById("task-count");
    const themeToggle = document.getElementById("theme-toggle");
    const fetchQuoteBtn = document.getElementById("fetch-quote");
    const quoteContainer = document.getElementById("quote");

    // === Part 1: To-Do List with Local Storage ===

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(addTaskToDOM);

    // Handle form submission
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = todoInput.value.trim();
        if (task === "") return;

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addTaskToDOM(task);

        incrementTaskCount();

        todoInput.value = "";
    });

    // Function to add task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement("li");
        li.textContent = task;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t !== task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            li.remove();
        });
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // === Part 2: Session Storage for Interaction Tracking ===

    let count = sessionStorage.getItem("taskCount") || 0;
    taskCount.textContent = count;

    function incrementTaskCount() {
        count++;
        sessionStorage.setItem("taskCount", count);
        taskCount.textContent = count;
    }

    // === Part 3: Theme Persistence with Cookies ===

    const savedTheme = getCookie("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const theme = document.body.classList.contains("dark-mode") ? "dark-mode" : "";
        setCookie("theme", theme, 30);
    });

    // === Part 4: REST API Integration ===

    fetchQuoteBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            quoteContainer.textContent = data.content;
        } catch (error) {
            quoteContainer.textContent = "Could not load a quote. Try again!";
        }
    });

    // Cookie Helpers
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
        }
        return null;
    }
});
