//DOMANDE DEL TEST
let questions = [
  {
    question: "Qual è il tuo nome?",
    rightAnswer: "Matteo",
    wrongAnswers: ["Andrea", "Marianna", "Michele"],
  },
  {
    question: "Quanto costa una pizza Hawaiian?",
    rightAnswer: "50",
    wrongAnswers: ["5", "25", "1"],
  },
  {
    question: "Qual è la pizza preferita di Michele?",
    rightAnswer: "Diavola",
    wrongAnswers: ["Margherita", "Hawaiana", "Capricciosa"],
  },
  {
    question: "What does CPU stand for?",
    rightAnswer: "Central Processing Unit",
    wrongAnswers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    question: "In web design, what does CSS stand for?",
    rightAnswer: "Cascading Style Sheet",
    wrongAnswers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    question: "On Twitter, what is the character limit for a Tweet?",
    rightAnswer: "140",
    wrongAnswers: ["120", "160", "100"],
  },
  {
    question: "Quante volte hai dovuto ricominciare questo progetto?",
    rightAnswer: "20",
    wrongAnswers: ["10", "MAI", "1"],
  },
  {
    question:
      "Which programming language shares its name with an island in Indonesia?",
    rightAnswer: "Java",
    wrongAnswers: ["Python", "C", "Jakarta"],
  },
  {
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    rightAnswer: "Nougat",
    wrongAnswers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    question: "Di che colore è il cielo?",
    rightAnswer: "Sicilia",
    wrongAnswers: ["2", "Forchetta", "Pizzicotto"],
  },
];

//VARIABILI GLOBALI
let correctAnswers = 0;
let wrongAnswers = 0;
let input = document.querySelector("input");
let array1 = [];
let bottone = document.getElementById("btn-to-welcome");
let questionElement = document.getElementById("question");
let answerButtons = document.querySelectorAll(".answer-buttons");
let counterElement = document.getElementById("counter");
let nextQuestionButton = document.getElementById("il-bottone-dei-bottoni");
let counter = 0;

//SALVATAGGIO INPUT IN LOCAL STORAGE
localStorage.getItem("items", JSON.stringify(array1));
bottone.addEventListener("click", function salvare() {
  array1.push(input.value);
  localStorage.setItem("items", JSON.stringify(array1));
});
//localStorage.clear(); SERVE A PULIRE IL LOCAL STORAGE

//SISTEMA VALUTAZIONE A STELLE
function stellacoloratorMarkII() {
  let stars = document.querySelectorAll("path");
  stars.forEach((star, index1) => {
    star.addEventListener("click", () => {
      stars.forEach((star, index2) => {
        index1 >= index2
          ? star.classList.add("active")
          : star.classList.remove("active");
      });
    });
  });
}
stellacoloratorMarkII();

// Nascondi tutti gli elementi tranne l'header
document.getElementById("matteo").style.display = "none";
document.getElementById("andrea").style.display = "none";
document.getElementById("marianna").style.display = "none";

// DISPLAY FIRST PAGE
document
  .getElementById("btn-to-welcome")
  .addEventListener("click", function () {
    // Nascondi tutti gli elementi tranne il main con id "matteo"
    document.getElementById("emanuele").style.display = "none";
    document.getElementById("andrea").style.display = "none";
    document.getElementById("marianna").style.display = "none";
    document.getElementById("matteo").style.display = "block";
  });
//DISPLAY SECOND PAGE
document.getElementById("btn-to-test").addEventListener("click", function () {
  document.getElementById("emanuele").style.display = "none";
  document.getElementById("andrea").style.display = "block";
  document.getElementById("marianna").style.display = "none";
  document.getElementById("matteo").style.display = "none";
});

//TIMER
let timeLeft = 40;
let rolex = document.querySelector(".rolex");
let rolexTimer;

function startTime() {
  if (rolexTimer) {
    clearInterval(rolexTimer);
    timeLeft = 40;
  }
  rolexTimer = setInterval(function () {
    if (document.getElementById("andrea").style.display == "block") {
      if (timeLeft == 0) {
        counter++;
        counterElement.innerHTML = counter + "/" + `${totalQuestions} QUESTIONS`;
        clearInterval(rolexTimer);
        newQuestion();
      } else {
        timeLeft--;
        document.querySelector(".rolex").innerHTML =
          timeLeft + " seconds remaining";
      }
    }
  }, 1000);
}
startTime();

//GENERA UNA NUOVA DOMANDA CASUALE
let newQuestion = function () {
  startTime();
  let randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  questionElement.innerText = randomQuestion.question;
  questions.splice(
    questions.findIndex((i) => i.question === randomQuestion.question),
    1
  );

  let answers = [...randomQuestion.wrongAnswers, randomQuestion.rightAnswer];
  answerButtons.forEach((button, index) => {
    button.innerText = answers[index];
    button.dataset.correct = answers[index] === randomQuestion.rightAnswer;
  });
};

//RACCOLTA DATI DOMANDE
answerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (button.dataset.correct === "true") {
      correctAnswers++;
      console.log("Risposte corrette:", correctAnswers);
    } else {
      wrongAnswers++;
      console.log("Risposte sbagliate:", wrongAnswers);
    }
  });
});

//FUNZIONAMENTO A SCHERMO DEI BOTTONI
answerButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Rimuovi la classe 'selected' da tutti gli altri bottoni
    answerButtons.forEach(function (otherButton) {
      if (otherButton !== button) {
        otherButton.classList.remove("selected");
      }
    });
    // Aggiungi o rimuovi la classe 'selected' dal bottone cliccato
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    } else {
      button.classList.add("selected");
    }
  });
});
nextQuestionButton.addEventListener("click", function () {
  // Rimuovi la classe 'selected' da tutti i bottoni
  answerButtons.forEach(function (button) {
    button.classList.remove("selected");
  });
});

// Aggiungi un evento al pulsante "Il bottone dei bottoni" per generare una nuova domanda
document
  .getElementById("il-bottone-dei-bottoni")
  .addEventListener("click", function () {
    startTime();
    counter++;
    counterElement.innerHTML = counter + " QUESTIONS";
    if (counter === 11) {
      //PROCEDI A RESULTS PAGE E AGGIORNA RISULTATI
      document.getElementById("matteo").style.display = "none";
      document.getElementById("andrea").style.display = "none";
      document.getElementById("emanuele").style.display = "none";
      document.getElementById("marianna").style.display = "block";

      let totalQuestions = correctAnswers + wrongAnswers;
      let correctPercentage = Math.round(
        (correctAnswers / totalQuestions) * 100
      );
      let wrongPercentage = Math.round((wrongAnswers / totalQuestions) * 100);

      let numCorrectAnswersElement =
        document.getElementById("correctQuestions");
      let numWrongAnswersElement = document.getElementById("wrongQuestions");

      numCorrectAnswersElement.innerHTML = correctAnswers + "/" + `${totalQuestions} QUESTIONS`;
      numWrongAnswersElement.innerHTML = wrongAnswers + "/" + `${totalQuestions} QUESTIONS`;

      // Aggiorna il contenuto degli elementi HTML che visualizzano le percentuali di risposte corrette e sbagliate
      let correctPercentageElement =
        document.getElementById("correctPercentage");
      let wrongPercentageElement = document.getElementById("wrongPercentage");

      correctPercentageElement.innerHTML = `${correctPercentage}%`;
      wrongPercentageElement.innerHTML = `${wrongPercentage}%`;

      // Aggiorna il cerchio che mostra la percentuale di risposte corrette
      setProgress(correctPercentage);

      // Visualizza un messaggio in base alla percentuale di risposte corrette
      let topMessage = document.getElementById("topMessage");
      let middleMessage = document.getElementById("middleMessage");
      let underMessage = document.getElementById("underMessage");

      if (correctPercentage >= 60) {
        topMessage.innerText = "Congratulations!";
        middleMessage.innerText = "You passed the exam.";
        underMessage.innerText =
          "We'll send you the certificate in a few minutes. Check your email (including the     promotions/         spam folder)";
      } else {
        topMessage.innerText = "We're sorry.";
        middleMessage.innerText = "You did not pass the exam.";
        underMessage.innerText =
          "Check your email (including the promotions/spam folder)";
      }
    } else {
      // ALTRIMENTI GENERA NUOVA DOMANDA CASUALE
      let randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      questionElement.innerText = randomQuestion.question;
      questions.splice(
        questions.findIndex((i) => i.question === randomQuestion.question),
        1
      );

      // Crea un array con tutte le risposte (giusta e sbagliate ps: si può fare solo in questo modo )
      let answers = [
        ...randomQuestion.wrongAnswers,
        randomQuestion.rightAnswer,
      ];

      answerButtons.forEach((button, index) => {
        button.innerText = answers[index];
        button.dataset.correct = answers[index] === randomQuestion.rightAnswer;
      });
    }
  });

//CERCHIO PERCENTUALE RESULTS PAGE
var circle = document.querySelector("circle");
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(n) {
  const offset = circumference - (n / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}
setProgress(correctAnswers * 10);

if (correctAnswers < 101 && correctAnswers > 0) {
  setProgress(correctAnswers);
}

