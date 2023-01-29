
var data = [
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

var qCount = 0;
var timer;
var finalScore = 35;
var check = '';
var btnCNT = 1;
var timerCount;

var newbtn = document.createElement('button'); //Creates Start Quiz button
newbtn.innerText = "Start Quiz";
newbtn.setAttribute('id', 'startQuiz');
document.getElementById('buttons').append(newbtn);

//document.getElementById('scores2').addEventListener('click', showScores)
document.getElementById('startQuiz').addEventListener('click', startTest);

function startTest() {
  timerCount = 95;
  console.log('startTest executed');
  startTimer();
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

  inFun();

  document.getElementById("button1").addEventListener('click', function () {
    check = document.getElementById("button1").textContent;
    answerCheck()
  })

  document.getElementById("button2").addEventListener('click', function () {
    check = document.getElementById("button2").textContent;
    answerCheck()
  })

  document.getElementById("button3").addEventListener('click', function () {
    check = document.getElementById("button3").textContent;
    answerCheck()
  })

  document.getElementById("button4").addEventListener('click', function () {
    check = document.getElementById("button4").textContent;
    answerCheck()
  })

  function answerCheck() {
    if (qCount < data.length - 1) {
      if (check == data[qCount].ansCorrect) {
        document.getElementById('footer-text').textContent = 'Correct!';
      } else { document.getElementById('footer-text').textContent = 'Wrong!'; };
      document.getElementById('footer-text').setAttribute('class', 'footer-text');
      qCount++;
      inFun();
    } else { timerCount = 1 };
  };



  function inFun() { //Function populates the question and answers text.
    console.log('qCount ' + qCount);
    document.getElementById('greeting').textContent = data[qCount].question;
    btnCNT = 1;
    while (btnCNT < 5) {
      document.getElementById('button' + btnCNT).textContent = data[qCount].ansChoice[btnCNT - 1];
      console.log(check);
      btnCNT++;
    }
  }
}

function allDone() {

  document.getElementById('greeting').textContent = 'All done!';
  document.getElementById('text').textContent = 'Your final score is: ' + finalScore;
  btnCNT = 1;
  while (btnCNT < 5) {
    document.getElementById('button' + btnCNT).remove();
    btnCNT++;
  }
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    document.getElementById('countdown').textContent = timerCount;
    if (timerCount === 0) {
      clearInterval(timer);
      allDone();
    }
  }, 1000)
}