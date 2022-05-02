var startButton = document.getElementById("start-button")
var nextButton = document.getElementById("next-button")
var questionContainerEL = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonEL = document.getElementById("answer-buttons")
var correctAnswerEL = document.getElementById('correct-answer')
var incorrectAnswerEL = document.getElementById('incorrect-answer')
var formEL = document.getElementById('form-input')
var highscoreName = document.querySelector('#highscore-name')
var greeting = document.getElementById('greeting')
var gameOver = document.getElementById('game-over')
var timer = document.getElementById('time-remaining')
var number = 60
var finalScore = document.getElementById('final-score')
var formEL = document.getElementById('form-input')
var userName = document.getElementById('user-name')
var userScore = document.getElementById('user-score')


let shuffledQuestions, currentQuestion

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})

function startGame(){
    greeting.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    questionContainerEL.classList.remove("hide")
    timeRemaining();
    update = setInterval("timeRemaining()", 1000);
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
    clearStatus(document.body)
    nextButton.classList.add('hide');
    while (answerButtonEL.firstChild) {
        answerButtonEL.removeChild(answerButtonEL.firstChild)
    }
}

function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatus(document.getElementById('answer-buttons'), correct)
    Array.from(answerButtonEL.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
    if (correct){
        correctAnswerEL.classList.remove('hide')
    } else {
        incorrectAnswerEL.classList.remove('hide')
        number = number - 25;
    }
    if (shuffledQuestions.length > currentQuestion +1){
        nextButton.classList.remove('hide')
    } else {
        clearInterval(update)
        gameOver.classList.remove('hide')
        questionContainerEL.classList.add('hide')
        formEL.classList.remove('hide')
        gameScore()
    }
}

function setStatus(element, correct){
    clearStatus(element)
    if(correct){
    element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    } 
}

function clearStatus(element){
    element.classList.remove('correct')
    element.classList.remove('incorrect')
    correctAnswerEL.classList.add('hide')
    incorrectAnswerEL.classList.add('hide')
    formEL.classList.add('hide')
}

function timeRemaining (){
    number = number - 1;
    if (number >= 1){
        timer.innerHTML = number;
    
    }else {
        clearInterval(update)
        gameOver.classList.remove('hide')
        questionContainerEL.classList.add('hide')
        formEL.classList.remove('hide')
        gameScore()
    }
}

createTaskhandler = function(event){
    event.preventDefault();
    var scoreName = {
        scoreName: highscoreName.value,
    }
    var score = {
        score: number,
    }
    localStorage.setItem('scoreName', JSON.stringify(scoreName));
    var scoreName = JSON.parse(localStorage.getItem('scoreName'));

    localStorage.setItem('score', JSON.stringify(score));
    var score = JSON.parse(localStorage.getItem('score'));

   
    document.getElementById(userName).innerHTML = scoreName
    document.getElementById(userScore).innerHTML = score;
}

formEL.addEventListener('submit', createTaskhandler);


 

function gameScore(){
    finalScore.innerHTML = number;
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
    },

]