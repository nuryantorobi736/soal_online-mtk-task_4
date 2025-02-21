const questionsLevel1 = [{
    question: "5 + 3 = ?",
    options: ["7", "8", "9"],
    answer: 1
}, {
    question: "10 - 4 = ?",
    options: ["5", "6", "7"],
    answer: 1
}, {
    question: "3 x 3 = ?",
    options: ["6", "8", "9"],
    answer: 2
}, {
    question: "12 ÷ 4 = ?",
    options: ["2", "3", "4"],
    answer: 1
}, {
    question: "6 + 6 = ?",
    options: ["10", "12", "14"],
    answer: 1
}];

const questionsLevel2 = [{
    question: "15 - 7 = ?",
    options: ["6", "7", "8"],
    answer: 2
}, {
    question: "2 x 5 = ?",
    options: ["8", "9", "10"],
    answer: 2
}, {
    question: "20 ÷ 4 = ?",
    options: ["5", "6", "4"],
    answer: 0
}, {
    question: "9 + 10 = ?",
    options: ["18", "19", "20"],
    answer: 1
}, {
    question: "14 - 6 = ?",
    options: ["7", "8", "9"],
    answer: 1
}];

const questionsLevel3 = [{
    question: "25 + 15 = ?",
    options: ["40", "35", "30"],
    answer: 1
}, {
    question: "30 - 12 = ?",
    options: ["18", "17", "16"],
    answer: 0
}, {
    question: "8 x 7 = ?",
    options: ["54", "56", "58"],
    answer: 1
}, {
    question: "36 ÷ 6 = ?",
    options: ["4", "5", "6"],
    answer: 2
}, {
    question: "18 + 9 = ?",
    options: ["27", "26", "28"],
    answer: 0
}];

let userName;
let totalScore = 0;

function startLevel(level) {
    window.location.href = `level${level}.html`;
}

function login() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput && passwordInput === "admin123") {
        userName = usernameInput;
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginError').innerText = 'Nama atau Password salah!';
        document.getElementById('loginError').classList.remove('hidden');
    }
}

function showQuiz(level) {
    let questions;
    let questionsDiv;
    let resultDiv;
    let nextBtn;

    switch (level) {
        case 1:
            questions = questionsLevel1;
            questionsDiv = document.getElementById('questions');
            resultDiv = document.getElementById('result');
            nextBtn = document.getElementById('nextLevelBtn');
            break;
        case 2:
            questions = questionsLevel2;
            questionsDiv = document.getElementById('questions');
            resultDiv = document.getElementById('result');
            nextBtn = document.getElementById('nextLevelBtn');
            break;
        case 3:
            questions = questionsLevel3;
            questionsDiv = document.getElementById('questions');
            resultDiv = document.getElementById('result');
            nextBtn = document.getElementById('finishBtn');
            break;
        default:
            return;
    }

    questionsDiv.innerHTML = '';
    questions.forEach((item, index) => {
        questionsDiv.innerHTML += `
            <div class="question">
                <label>${item.question}</label><br>
                ${item.options.map((option, i) => `
                    <div class="option">
                        <input type="radio" name="question${level}${index}" value="${i}" id="q${level}${index}o${i}">
                        <label for="q${level}${index}o${i}">${option}</label>
                    </div>
                `).join('')}
                <div id="answer${level}${index}" class="correct-answer hidden"></div>
            </div>
        `;
    });

    nextBtn.classList.add('hidden');
    resultDiv.classList.add('hidden');
}

function checkAnswers(level) {
    let score = 0;
    let questions;
    let resultDiv;
    let nextBtn;

    switch (level) {
        case 1:
            questions = questionsLevel1;
            resultDiv = document.getElementById('result');
            nextBtn = document.getElementById('nextLevelBtn');
            break;
        case 2:
            questions = questionsLevel2;
            resultDiv = document.getElementById('result');
            nextBtn = document.getElementById('nextLevelBtn');
            break;
        case 3:
            questions = questionsLevel3;
            resultDiv = document.getElementById('result');
            nextBtn = document.getElementById('finishBtn');
            break;
    }

    resultDiv.innerHTML = '';

    questions.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${level}${index}"]:checked`);
        const answerDiv = document.getElementById(`answer${level}${index}`);

        if (selectedOption && parseInt(selectedOption.value) === item.answer) {
            score++;
            answerDiv.innerHTML = `Jawaban yang benar: ${item.options[item.answer]}`;
            answerDiv.classList.remove('hidden');
            answerDiv.style.color = 'green';
        } else {
            answerDiv.innerHTML = `Jawaban yang benar: ${item.options[item.answer]}`;
            answerDiv.classList.remove('hidden');
            answerDiv.style.color = 'red';
        }
    });

    totalScore += score;
    resultDiv.innerHTML = `Skor Anda: ${score} dari ${questions.length}`;
    resultDiv.classList.remove('hidden');

    nextBtn.classList.remove('hidden');
}

function nextLevel(level) {
    checkAnswers(level - 1);
    window.location.href = `level${level}.html`;
}

function finish() {
    checkAnswers(3);
    window.location.href = 'score.html';
}

function restart() {
    totalScore = 0;
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const level = window.location.pathname.match(/level(\d)\.html/);
    if (level) {
        showQuiz(parseInt(level[1]));
    } else if (window.location.pathname.endsWith('score.html')) {
        document.getElementById('finalScore').innerHTML = `Total Skor Anda: ${totalScore}`;
        document.getElementById('userNameDisplay').innerHTML = `Nama Pengguna: ${userName}`;

        let award;
        if (totalScore === 15) {
            award = "Selamat! Anda adalah Juara Matematika!";
        } else if (totalScore >= 10) {
            award = "Bagus! Anda sangat pintar!";
        } else {
            award = "Cobalah lagi, Anda pasti bisa!";
        }
        document.getElementById('award').innerHTML = award;
    }
});