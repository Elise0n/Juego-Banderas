let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;
let totalTime = 0; // se puede medir con Date.now() en cada pregunta
let questions = [
  { 
    type: 'capital', 
    question: '¿Cuál es el país de la siguiente capital: Ottawa?', 
    options: ['Canadá','Estados Unidos','Reino Unido','Australia'],
    answer: 'Canadá'
  },
  { 
    type: 'flag', 
    question: 'El país México está representado por la siguiente bandera. ¿Cuál es?',
    options: ['México','España','Colombia','Argentina'],
    answer: 'México'
  },
  { 
    type: 'borders', 
    question: '¿Cuántos países limítrofes tiene Brasil?', 
    options: ['10','9','11','8'],
    answer: '10'
  }
];

document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('game-screen').style.display = 'block';
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];
    document.getElementById('question-text').innerText = q.question;

    let optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(function(btn, idx) {
      btn.innerText = q.options[idx];
      btn.setAttribute('data-answer', q.options[idx]);
    });
  
    document.getElementById('time-remaining').innerText = 30;
    
  } else {
    endGame();
  }
}

let buttons = document.querySelectorAll('.option-btn');
buttons.forEach(function(button) {
  button.addEventListener('click', function(e) {
    let selected = e.target.getAttribute('data-answer');
    checkAnswer(selected);
  });
});

function checkAnswer(selected) {
  let q = questions[currentQuestion];
  let feedbackMessage = document.getElementById('feedback-message');
  
  if (selected === q.answer) {
    correctCount++;
    feedbackMessage.innerText = '¡Correcto!';
  } else {
    incorrectCount++;
    feedbackMessage.innerText = 'Incorrecto. La respuesta correcta es: ' + q.answer;
  }

  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('feedback-screen').style.display = 'block';
}

document.getElementById('next-question-btn').addEventListener('click', function() {
  currentQuestion++;
  document.getElementById('feedback-screen').style.display = 'none';
  if (currentQuestion < questions.length) {
    document.getElementById('game-screen').style.display = 'block';
    loadQuestion();
  } else {
    endGame();
  }
});

function endGame() {
  document.getElementById('game-screen').style.display = 'none';
  document.getElementById('feedback-screen').style.display = 'none';
  document.getElementById('summary-screen').style.display = 'block';

  document.getElementById('correct-answers').innerText = correctCount;
  document.getElementById('incorrect-answers').innerText = incorrectCount;

  totalTime = 60; 
  document.getElementById('total-time').innerText = totalTime;
  let avgTime = (totalTime / questions.length).toFixed(2);
  document.getElementById('avg-time').innerText = avgTime;
}
