// References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount = 0;
let scoreCount = 0;
let count = 11;
let countdown;

// Questions and Options array
const quizArray = [
  {
    id: "0",
    question: "What is the capital of Ireland?",
    options: ["Paris", "Dublin", "Berlin", "London"],
    correct: "Dublin",
  },
  {
    id: "1",
    question: "Which planet in our solar system is known as 'The Red Planet'?",
    options: ["Earth", "Neptune", "Mars", "Jupiter"],
    correct: "Mars",
  },
  {
    id: "2",
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo Da Vinci", "Michelangelo", "Vincent Van Gogh", "Pablo Picasso"],
    correct: "Leonardo Da Vinci",
  },
  // Rest of the questions...
];

// Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener("click", () => {
  displayNext();
});

// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

// Display quiz
const quizDisplay = (questionCount) => {
  const quizCards = document.querySelectorAll(".container-mid");
  // Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  // Display current question card
  quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
function quizCreator() {
  // Randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  // Generate quiz
  for (let i of quizArray) {
    // Randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    // Quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    // Question number
    countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
    // Question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    // Options
    for (let j = 0; j < i.options.length; j++) {
      let optionBtn = document.createElement("button");
      optionBtn.classList.add("option-div");
      optionBtn.innerHTML = i.options[j];
      optionBtn.addEventListener("click", () => checker(optionBtn, i.correct));
      div.appendChild(optionBtn);
    }
    quizContainer.appendChild(div);
  }
}

// Checker Function to check if option is correct or not
function checker(userOption, correctOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  // If user clicked answer == correct option stored in object
  if (userSolution === correctOption) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    // For marking the correct option
    options.forEach((element) => {
      if (element.innerText == correctOption) {
        element.classList.add("correct");
      }
    });
  }

  // Clear interval (stop timer)
  clearInterval(countdown);
  // Disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

// Initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

// When user clicks on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// Hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

// Display next question or score
function displayNext() {
  // Increment questionCount
  questionCount += 1;
  // If last question
  if (questionCount === quizArray.length) {
    // Hide question container and display score
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    // User score
    userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount}`;
  } else {
    // Display questionCount
    countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
    // Display quiz
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
}
