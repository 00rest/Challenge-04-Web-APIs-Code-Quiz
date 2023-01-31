var data = [ //Array for questions and answers
  {
    question: 'String values must be enclosed within ______ when being assigned to variables.',
    ansChoice: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
    ansCorrect: 'quotes'
  },
  {
    question: 'Commonly used data types DO Not Include:',
    ansChoice: ['strings', 'booleans', 'alerts', 'numbers'],
    ansCorrect: 'alerts'
  },
  {
    question: 'The condition in an if/else statement is enclosed with ______.',
    ansChoice: ['quotes', 'curly brackets', 'patenthesis', 'square brackets'],
    ansCorrect: 'patenthesis'
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    ansChoice: ['JavaScript', 'terminal/bash', 'for loops', 'console.log'],
    ansCorrect: 'console.log'
  },
  {
    question: 'Arrays in JavaScript can be used to store _________',
    ansChoice: ['Numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    ansCorrect: 'all of the above'
  }
];
//Variable declaration
var qCount = 0;
var timer;
var finalScore = 0;
var check = '';
var btnCNT = 1;
var timerCount;

var newbtn = document.createElement('button'); //Creates Start Quiz button
newbtn.innerText = "Start Quiz";
newbtn.setAttribute('id', 'startQuiz');
document.getElementById('buttons').append(newbtn);
document.getElementById('scores2').addEventListener('click', showScores)//Executes showScores furntion on click
document.getElementById('startQuiz').addEventListener('click', startTest); //Executes startTest furntion on click

function startTest() {
  timerCount = 95;
  startTimer(); //Start the countdown
  document.getElementById('startQuiz').remove(); //Removes Start Quiz button
  document.getElementById('text').textContent = ''; //Removes assignment text
  document.getElementById('greeting').setAttribute('class', 'greeting');

  //Creates button for an answer selection x4
  while (btnCNT < 5) {
    newbtn = document.createElement('button');
    newbtn.setAttribute('id', 'button' + btnCNT);
    newbtn.setAttribute('class', 'ansBtn');
    document.getElementById('buttons').append(newbtn);
    btnCNT++;
  }

  feedText(); //Pushes text into question and answer fields

  document.getElementById("button1").addEventListener('click', function () { //Listens for a button click to check the answer
    check = document.getElementById("button1").textContent;
    answerCheck() //Calls check answer function
  })

  document.getElementById("button2").addEventListener('click', function () { //Listens for a button click to check the answer
    check = document.getElementById("button2").textContent;
    answerCheck() //Calls check answer function
  })

  document.getElementById("button3").addEventListener('click', function () { //Listens for a button click to check the answer
    check = document.getElementById("button3").textContent;
    answerCheck() //Calls check answer function
  })

  document.getElementById("button4").addEventListener('click', function () { //Listens for a button click to check the answer
    check = document.getElementById("button4").textContent;
    answerCheck() //Calls check answer function
  })
}

function answerCheck() { //checks if answer is correct then goes to the next question or ends the test by setting timer to 1
  if (qCount < data.length) {
    if (check == data[qCount].ansCorrect) {
      document.getElementById('footer-text').textContent = 'Correct!';
      finalScore = finalScore + 20;
    } else {
      document.getElementById('footer-text').textContent = 'Wrong!';
      timerCount = timerCount - 10;
    };

    document.getElementById('footer-text').setAttribute('class', 'footer-text');
    qCount++;
    if (qCount < data.length) {
      feedText();
    } else { timerCount = 1 };
  }
};

function feedText() { //Function populates the question and answers text.
  document.getElementById('greeting').textContent = data[qCount].question;
  btnCNT = 1;
  while (btnCNT < 5) {
    document.getElementById('button' + btnCNT).textContent = data[qCount].ansChoice[btnCNT - 1];
    btnCNT++;
  }
}

function allDone() { //Function records high score
  btnCNT = 1;
  document.getElementById('greeting').textContent = 'All done!';
  document.getElementById('text').textContent = 'Your final score is ' + finalScore + '.';
  document.getElementById('text').removeAttribute('class', 'text');
  document.getElementById('allDone').textContent = 'Enter initials:  ';
  while (btnCNT < 5) {
    document.getElementById('button' + btnCNT).remove();
    btnCNT++;
  }
  var allDoneInpBox = document.createElement('input');
  allDoneInpBox.setAttribute('type', 'text');
  allDoneInpBox.setAttribute('id', 'allDoneInpBox');
  newbtn = document.createElement('button');
  newbtn.setAttribute('id', 'allDoneButton');
  newbtn.setAttribute('class', 'allDoneButton');
  newbtn.textContent = 'Submit';
  document.getElementById('allDone').append(allDoneInpBox, newbtn);
  document.getElementById('allDoneButton').addEventListener('click', function () {
    var userInitial = document.getElementById('allDoneInpBox').value.trim();
    localStorage.setItem(userInitial, finalScore);
    showScores();
  });

}

function startTimer() { //Countdown function keeps track of the time left.
  timer = setInterval(function () {
    timerCount--;
    document.getElementById('countdown').textContent = timerCount;
    if (timerCount === 0) {
      clearInterval(timer);
      allDone();
    }
  }, 1000)
}

function showScores() { //Shows the high score list, formats and populates the data from localstorage

  clearInterval(timer);
  var remove = ['header-ul', 'buttons', 'footer-text', 'text', 'allDone'];
  for (var i = 0; i < remove.length; i++) {
    document.getElementById(remove[i]).remove()
  }
  document.getElementById('greeting').setAttribute('class', 'greeting');
  document.getElementById('greeting').textContent = 'High scores';

  var initials = [];
  var scores = [];

  for (var i = 0; i < localStorage.length; i++) {
    initials = localStorage.key(i);
    scores = localStorage.getItem(initials);
    var listItem = document.createElement('li');
    listItem.setAttribute('class', 'names');
    listItem.textContent = i + 1 + '. ' + initials + ' - ' + scores;
    document.getElementById('score-list').append(listItem);
  }
  var goBack = document.createElement('button');
  goBack.setAttribute('id', 'goBack');
  goBack.setAttribute('class', 'allDoneButton');
  goBack.setAttribute('onclick', 'window.location.reload()');
  goBack.textContent = 'Go back';
  var clear = document.createElement('button');
  clear.setAttribute('id', 'clear');
  clear.setAttribute('class', 'allDoneButton');
  clear.setAttribute('onclick', 'clrFun()');
  clear.textContent = 'Clear high scores';
  document.getElementById('scoresBtn').append(goBack, clear);
}

function clrFun() { //Clears the high scores
  document.querySelectorAll('#score-list').forEach(el => el.remove()); //Removes list items
  localStorage.clear(); //Erases local storage
};