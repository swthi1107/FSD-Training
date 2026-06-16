const quiz = [
    {
        question: "Which command initializes a Git repository?",
        options: ["git start", "git init", "git create", "git new"],
        answer: "git init"
    },
    {
        question: "Which command is used to clone a repository?",
        options: ["git fetch", "git pull", "git clone", "git copy"],
        answer: "git clone"
    },
    {
        question: "Which command stages all files?",
        options: ["git commit .", "git add .", "git push", "git save"],
        answer: "git add ."
    },
    {
        question: "Which command creates a commit?",
        options: ["git save", "git commit", "git push", "git branch"],
        answer: "git commit"
    },
    {
        question: "Which command uploads changes to GitHub?",
        options: ["git upload", "git send", "git push", "git sync"],
        answer: "git push"
    }
];

let current = 0;
let score = 0;
const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreText = document.getElementById("score");
function loadQuestion() {
    options.innerHTML = "";
    question.innerText = `${current + 1}. ${quiz[current].question}`;
    quiz[current].options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option");
        btn.onclick = () => checkAnswer(btn, option);
        options.appendChild(btn);
    });
}

function checkAnswer(btn, selected) {
    const allBtns = document.querySelectorAll(".option");
    allBtns.forEach(b => b.disabled = true);
    if (selected === quiz[current].answer) {
        btn.classList.add("correct");
        score++;
    }
    else {
        btn.classList.add("wrong");
        allBtns.forEach(b => {
            if (b.innerText === quiz[current].answer) {
                b.classList.add("correct");
            }
        });
    }
}

nextBtn.onclick = () => {
    current++;
    if (current < quiz.length) {
        loadQuestion();
    }
    else {
        question.innerText = "Quiz Completed!";
        options.innerHTML = "";
        nextBtn.style.display = "none";
        scoreText.innerText = `Your Score: ${score}/${quiz.length}`;
    }
};

loadQuestion();