// app.js
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

document.addEventListener("DOMContentLoaded", () => {
    fetchQuestions();
    document.getElementById("prev-btn").addEventListener("click", showPreviousQuestion);
    document.getElementById("next-btn").addEventListener("click", showNextQuestion);
});

function fetchQuestions() {
    // Simulating a fetch request from the backend
    questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Lisbon"],
            correct: 2
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
            correct: 0
        }
        // Add more questions as needed
    ];
    startQuiz();
}

function startQuiz() {
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    clearInterval(timer);
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question-number").innerText = `Question ${currentQuestionIndex + 1}`;
    document.getElementById("question").innerText = questionData.question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.innerText = option;
        optionElement.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    updateProgress();
    startTimer();
}

function selectOption(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    if (selectedIndex === questionData.correct) {
        score++;
    }
    // Disable all options
    document.querySelectorAll(".option").forEach(option => {
        option.style.pointerEvents = "none";
        if (option.innerText === questionData.options[questionData.correct]) {
            option.style.backgroundColor = "green";
        } else {
            option.style.backgroundColor = "red";
        }
    });
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        endQuiz();
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function updateProgress() {
    document.getElementById("progress").innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showNextQuestion();
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById("question-container").innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2>`;
    document.getElementById("prev-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
}
