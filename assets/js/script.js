
// Defining the questions, answers, and key for my quiz
// the questions and answer for the quiz 
var questions = [
    {
      question: "Javascript is an _______ language?",
      answers: [
        { text: "Object-Oriented", correct: true },
        { text: "Oject-Based", correct: false },
        { text: "Procedural", correct: false },
        { text: "None of the above", correct: false },
      ]
    },
    {
      question: "Which of the following keywords is used to define a variable in Javascript?",
      answers: [
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "Both A and B", correct: true },
        { text: "Non of the above", correct: false },
      ]
    }, {
      question: "Which of the following methods is used to access HTML elements using Javascript?",
      answers: [
        { text: "getElementById", correct: false },
        { text: "getElementByClass", correct: false },
        { text: "Both A and B", correct: true },
        { text: "Non of the above", correct: false },
      ]
    }, {
      question: "Which of the following methods can be used to display data in some form using Javascript?",
      answers: [
        { text: "document.Write()", correct: false },
        { text: "console.log", correct: false },
        { text: "window.alert", correct: false },
        { text: "All of the above", correct: true },
      ]
    }, {
      question: "How can a datatype be declared to be a constant type?",
      answers: [
        { text: "const", correct: true },
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "constant", correct: false },
      ]
    }
  ];
  
  // Isolating elements that I will need to manipulate throughout my program
  var questionsEl = document.getElementById("question");
  var answerButtons = document.getElementById("answer-buttons");
  var nextButton = document.getElementById("next-btn");
  var clockEl = document.getElementById("clock");
  var timerSpan = document.getElementById("timer");
  
  // Defining necessary variables
  var timerInterval;
  var currentQuestionIndex = 0;
  var score = 0;
  var time = 60;
  
  // Start the quiz
  function startQuiz() {
    clockEl.style.display = "block"; // Display the timer
    currentQuestionIndex = 0; // Resetting the question index
    score = 0; // Resetting score
    nextButton.innerHTML = "Next Question"; // Updating button text
    showQuestions();
    startTimer();
  }
  
  // Display current question
  function showQuestions() {
    resetState(); // Reset the answer button's state
  
    // Display the question
    var currentQuestion = questions[currentQuestionIndex];
    var questionNum = currentQuestionIndex + 1;
    questionsEl.innerHTML = questionNum + ". " + currentQuestion.question;
  
    // Creating buttons for each answer choice
    currentQuestion.answers.forEach(answer => {
      var button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
  
      if(answer.correct) {
        button.dataset.correct = answer.correct;
      }
      // Adding an event listener for the selected answers
      button.addEventListener("click", selectAnswer);
    });
  }
  
  // Resetting the state of the answer buttons
  function resetState() {
    // Hiding the next button until the user answers each question
    nextButton.style.display = "none";
  
    while(answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  // Start the quiz timer
  function startTimer() {
    // Display initial time
    timerSpan.textContent = time; 
  
    timerInterval = setInterval(function() {
      // Decrement time by 1 second
      time--; 
      // Update the timer display
      timerSpan.textContent = time; 
  
      // When the timer reaches 0
      if (time <= 0) {
        alert("Your time has expired!");
        // Clear timer interval
        clearInterval(timerInterval);
        // Show user's score
        showScore();
      }
    }, 1000);
  }
  
  // Function used to handle the selection of an answer
  function selectAnswer(event) {
    var selectedBtn = event.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    var correctAudio = new Audio('assets/sounds/correct.wav');
    var incorrectAudio = new Audio('assets/sounds/incorrect.wav');
  
    if(isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
      correctAudio.play();
    } else {
      selectedBtn.classList.add("incorrect")
      time -= 10;
      incorrectAudio.play();
    }
  
    // Highlight correct answer
    Array.from(answerButtons.children).forEach(button => {
      if(button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      // Disable answer buttons
      button.disabled = true;
    });
    // Show next question button
    nextButton.style.display = "block";
  }
  // Function used to handle the selection of an answer
function selectAnswer(event) {
  var selectedBtn = event.target;
  var isCorrect = selectedBtn.dataset.correct === "true";
  var correctAudio = new Audio('assets/sounds/sounds_correct.wav');
  var incorrectAudio = new Audio('assets/sounds/sounds_incorrect.wav');

  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    correctAudio.play();
  } else {
    selectedBtn.classList.add("incorrect")
    time -= 10;
    incorrectAudio.play();
  }

  // Show next question button
  nextButton.style.display = "block";
}
  // Function used to show the user's score & 
  function showScore() {
    resetState();
    questionsEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
  
    // Create input field for name
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("placeholder", "Enter your Initials");
    nameInput.setAttribute("id", "name-input");
    nameInput.style.display = "block";
    nameInput.style.margin = "0 auto";
    answerButtons.appendChild(nameInput);
  
    // Create submit button
    var submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.classList.add("submit-button");
    submitButton.addEventListener("click", saveScore);
    answerButtons.appendChild(submitButton);
    
    // Change text to from 'next question' to 'play again'
    nextButton.innerHTML = "Play Again";
    // Display the button
    nextButton.style.display = "block";
    // Hide the clock
    clockEl.style.display = "none";
  }
  
  // Function used to save the user's initials and score to localStorage
  function saveScore() {
    var initials = document.getElementById("name-input").value;
    // Retrieve existing highscores from local storage
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    // Add current score and initials to the highscores array
    highscores.push({ initials: initials, score: score });
    // Using the .sort method to sort the highscores in descending order
    highscores.sort((a, b) => b.score - a.score);
    // Store the updated highscores array in local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // Redirect to highscores.html
    window.location.href = "highscores.html";
  }
  
  // Function used to handle click event on the 'next question' button
  function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
      showQuestions();
    } else {
      showScore();
      clearInterval(timerInterval);
    }
  }
  
  // Adding an event listener for hte 'next question' button
  nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
      time = 60;
      startTimer();
    }
  });
  
  // Add click event listener to start button
  var startButton = document.getElementById("button1");
  var quizContainer = document.querySelector(".quiz");
  var rulesContainer = document.querySelector(".rules")
  // Hide the quiz container initially
  quizContainer.style.display = "none";
  
  startButton.addEventListener("click", function () {
    startButton.style.display = "none"; // Hide the start button
    quizContainer.style.display = "block"; // Display the quiz container
    rulesContainer.style.display= "none";

    startQuiz(); // Start the quiz
  });
