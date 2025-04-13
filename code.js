// document.addEventListener("DOMContentLoaded", () => {
// import array of objects from questions.js
import { questions } from "./questions.js";
// initial conditions
let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);
// keep track of user answer
// initially fill answers with null
// it's an array of length equal to number of questions

// initialize score to 0
let score = 0;

// used for identifying correctly,incorrectly and unanswered questions
let correct_answers_list = "Correct answer\n";
let incorrect_answers_list = "inCorrect answer\n";
let unanswered_answers_list = "unanswered questions\n";

let hasCorrect = false;
let hasInCorrect = false;
let hasUnanswered = false;

// to grab all html elements required
const questionElement = document.querySelector(".questions");
const answerContainer = document.querySelector(".answer");
const prevBtn = document.querySelector(".Previous");
const nextBtn = document.querySelector(".next");
const submitBtn = document.querySelector(".submit");
const resetBtn = document.querySelector(".restart");
const resultDiv = document.querySelector(".result");

// now function to load question and it's opotions into the html
function loadQuestion(index) {
  const q = questions[index];
  // get current question
  questionElement.innerHTML = `Q${index + 1}: ${q.question}`;
  // get text of question
  answerContainer.innerHTML = "";
  // clear previous answers

  for (let option of q.options) {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = option;

    // check if radio button if it was already selected
    if (userAnswers[index] === option) {
      radio.checked = true;
    }

    // creating a label to have some text after the radio button
    // and text is non other than options
    const label = document.createElement("label");
    label.textContent = option;
    label.prepend(radio);

    // creating a div which consist of the label
    const div = document.createElement("div");
    div.appendChild(label);
    answerContainer.appendChild(div);
  }
  // for 1st question disable prev button
  if (index === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  // for last question disable next button
  if (index === questions.length - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

// function to save user answers
function saveAnswer() {
  // we assign answer which is checked or selected from all radio button options to selected option
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    // iff seelcted option is not null
    userAnswers[currentQuestion] = selectedOption.value;
    // save answer to array
  }
}

// event listener for prev button
prevBtn.addEventListener("click", () => {
  saveAnswer();
  //   save amswer before changing question
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
    // load the question
  }
});

// event listener for next button
nextBtn.addEventListener("click", () => {
  saveAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
});

// event listner for submit
submitBtn.addEventListener("click", () => {
  saveAnswer();
  // save all answers..
  score = 0;
  //   reset score to 0 after clicking submit

  // calculate score and
  // to identify  unanswered questions and correctly,incorrectly answered questions
  for (let i = 0; i < questions.length; i++) {
    const userAnswer = userAnswers[i];
    const correctAnswer = questions[i].answer;

    if (userAnswer === correctAnswer) {
      score++;
      hasCorrect = true;
      correct_answers_list += `Q${i + 1}: ${questions[i].question}\n`;
    } else if (userAnswer === null) {
      hasUnanswered = true;
      unanswered_answers_list += `Q${i + 1}: ${questions[i].question}\n`;
    } else {
      hasInCorrect = true;
      incorrect_answers_list += `Q${i + 1}: ${questions[i].question}\n`;
    }
  }

  if (!hasCorrect) {
    correct_answers_list += "none\n";
  }
  if (!hasInCorrect) {
    incorrect_answers_list += "none\n";
  }
  if (!hasUnanswered) {
    unanswered_answers_list += "none\n";
  }

  // in an alert show the quiz score
  //   alert(
  //     `Quiz completed\n youe score is${score}/${questions.length}\n\n` +
  //       `${correct_answers_list}\n${incorrect_answers_list}\n${unanswered_answers_list}`
  //   );
  // });

  resultDiv.textContent = ` Quiz Completed!\n\n Your Score: ${score}/${questions.length}\n\n${correct_answers_list}\n${incorrect_answers_list}\n${unanswered_answers_list}`;
});

// event listner for reset
// as every time we can't refresh the page
// so when we enter the reset button we reset all initial conditions
resetBtn.addEventListener("click", () => {
  currentQuestion = 0;
  //   make current question as 1st question
  userAnswers = new Array(questions.length).fill(null);
  //   make all user answer in array as null
  score = 0;
  //   score as 0
  prevBtn.disabled = true;
  nextBtn.disabled = false;
  //   disable prev button and enable next button
  correct_answers_list = "Correct answer\n";
  incorrect_answers_list = "inCorrect answer\n";
  unanswered_answers_list = "unanswered questions\n";

  hasCorrect = false;
  hasInCorrect = false;
  hasUnanswered = false;

  //   reset above messages too..

  resultDiv.textContent = "";
  // output to nothing i.e erase everything
  loadQuestion(currentQuestion);
  //   load 1st question please....
});

loadQuestion(currentQuestion);
// });
