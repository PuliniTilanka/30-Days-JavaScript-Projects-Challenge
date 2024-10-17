const questions = [
    {
        question : "Which one of the following also known as Conditional Expression:",
        answers :[  
            { text: "Alternative to if-else", correct: false},
            { text: "Switch statement", correct: false},
            { text: "If-then-else statement", correct: false},
            { text: "immediate if", correct: true},
        ]
    },
    {
        question : "When interpreter encounters an empty statements, what it will do:",
        answers :[  
            { text: "Shows a warning", correct: false},
            { text: "Prompts to complete the statement", correct: false},
            { text: "Throws an error", correct: false},
            { text: "Ignores the statements", correct: true},
        ]
    },
    {
        question : "The 'function' and 'var' are known as:",
        answers :[  
            { text: "Keywords", correct: false},
            { text: "Data types", correct: false},
            { text: "Declaration statements", correct: true},
            { text: "Prototypes", correct: false},
        ]
    },
    {
        question : "Which of the following type of a variable is volatile?",
        answers :[  
            { text: "Mutable variable", correct: true},
            { text: "Dynamic variable", correct: false},
            { text: "Volatile variable", correct: false},
            { text: "Immutable variable", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();