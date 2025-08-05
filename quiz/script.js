const questions = [
    {
        question: "Who is the founder of C-Progamming Language?",
        options: ["Ndefir Christave", "Kaka Martin", "Dennis Ritchie", "Sabila Roger"],
        answer: "Dennis Ritchie"
    },
    {
        question: "What is the full meaning of HTML?",
        options: ["Hypermedia Text Mark Language", "Hypertext Mack-up Language", "Higher Technology of Management & Logistics", "None of the above"],
        answer: "None of the above"
    },
    {
        question: "Which programming language is known as the 'Language of the Web'?",
        options: ["Python", "Java", "JavaScript", "HTML"],
        answer: "JavaScript"
    },
    {
        question: "What is the full meaning of DOM as used in web development?",
        options: ["Document Operational Mapping", "Data Object Management", "Document Object Model", "Digital Order Method"],
        answer: "Document Object Model"
    },
    {
        question: "Which HTML tag is used to establish a connection to the JavaScript file?",
        options: ["<link></link>", "<href></href>", "<Script></Script>", "<JavaScript></JavaScript>"],
        answer: "<Script></Script>"
    },
    {
        question: "Which CSS property is used to control how elements overlap with each other?",
        options: ["padding", "z-index", "overlay", "overlay"],
        answer: "z-index"
    },
    {
        question: "It is a technique used to mimic real-world processes or systems using computer models",
        options: ["Robot", "Simulation", "Modelling", "Prototyping"],
        answer: "Simulation"
    },
    {
        question: "It is a universal selector in CSS that matches all elements in html",
        options: ["Harsh", "Fullstop", "Asterisk", "Semi-colon"],
        answer: "Asterisk"
    },
     {
        question: "They are all HTML tags",
        options: ["<label></label>", "<i></i>", "<alignment></alignment>", "<aside></aside>"],
        answer: "<alignment></alignment>"
    },
     {
        question: "They are all types of styling",
        options: ["CSS styling", "In-line styling", "Internal styling", "External styling"],
        answer: "CSS styling"
    }
];

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const totalElement = document.getElementById('total');

// Variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// Initialize the quiz
function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
    startTimer();
}

// Display the current question
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option));
        optionsElement.appendChild(button);
    });
    
    timeLeft = 30;
    updateTimerDisplay();
    startTimer();
}

// Reset the quiz state for the next question
function resetState() {
    clearInterval(timer);
    nextBtn.classList.add('hidden');
    while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
    }
}

// Start the countdown timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

// Update the timer display and color
function updateTimerDisplay() {
    timerElement.textContent = timeLeft;
    
    // Update timer color based on remaining time
    timerElement.classList.remove('warning', 'danger');
    if (timeLeft <= 10) {
        timerElement.classList.add('danger');
    } else if (timeLeft <= 20) {
        timerElement.classList.add('warning');
    }
}

// Handle when time runs out
function handleTimeOut() {
    const options = document.querySelectorAll('.option');
    const currentQuestion = questions[currentQuestionIndex];
    
    options.forEach(option => {
        if (option.textContent === currentQuestion.answer) {
            option.classList.add('correct');
        }
        option.style.cursor = 'not-allowed';
        option.removeEventListener('click', selectAnswer);
    });
    
    nextBtn.classList.remove('hidden');
}

// Handle answer selection
function selectAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    let isCorrect = false;
    
    options.forEach(option => {
        if (option.textContent === currentQuestion.answer) {
            option.classList.add('correct');
        }
        
        if (option.textContent === selectedOption) {
            option.classList.add('selected');
            if (selectedOption === currentQuestion.answer) {
                isCorrect = true;
                score++;
            } else {
                option.classList.add('wrong');
            }
        }
        
        option.style.cursor = 'not-allowed';
        option.removeEventListener('click', selectAnswer);
    });
    
    nextBtn.classList.remove('hidden');
}

// Move to the next question or show results
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show the end results
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreElement.textContent = score;
    totalElement.textContent = questions.length;
}

// Restart
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.classList.add('hidden');
    startQuiz();
}

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
