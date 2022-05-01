var startButton = document.getElementById("start-button")
var nextButton = document.getElementById("next-button")
var questionContainerEL = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonEL = document.getElementById("answer-buttons")

let shuffledQuestions, currentQuestion

startButton.addEventListener('click', startGame)

function startGame(){
    console.log("started")
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionContainerEL.classList.remove("hide")
    nextQuestion();
}

function nextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestion]);
}

function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add("button")
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonEL.appendChild(button)
    });
}

function resetState(){
    nextButton.classList.add('hide');
    while (answerButtonEL.firstChild) {
        answerButtonEL.removeChild(answerButtonEL.firstChild)
    }
}

function selectAnswer(){

}

var questions = [
    {
        question: "What does DOM mean in Javascript?",
        answers: [
            {text: "Document Object Model", correct: true},
            {text: "Document Orientaion Model", correct: false},
            {text: "Direct Object Module", correct: false},
            {text: "Direct Object Model", correct: false},
        ]
    },

    {
        question: "Are Javascript and Java the same language?",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true},
        ]
    },

    {
        question: "Which of the following is a string?",
        answers: [
            {text: 'var string = 5', correct: false},
            {text: 'var string = +5+', correct: false},
            {text: 'var string = "5"', correct: true},
            {text: 'var string = <5>', correct: false},
        ]
    },

    {
        question: "Which of the following is the correct use of an Array?",
        answers: [
            {text: 'var array = "Value 1 Value 2 Value 3"', correct: false},
            {text: 'var array = ["Value 1 + Value 2 + Value 3"]', correct: false},
            {text: 'var array = ["Value 1 Value 2 Value 3"]', correct: false},
            {text: 'var array = ["Value 1", "Value 2", "Value 3"]', correct: true},

        ]
    }


]