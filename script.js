// Declare Variables
let questionBox = document.getElementById("questionBox");
let questionDiv = document.getElementById("questionDiv");
let optionList = document.getElementById("optionList");
let _options = document.querySelector(".quiz-options");
let checkBtn = document.getElementById("checkAnswer");
let correctScore = document.getElementById("correctScore");
let totalQuestion = document.getElementById("totalQuestion");
let _playAgain = document.getElementById("_playAgain");
let _result = document.getElementById("result");
let _correctScore = (askedCount = 0);

document.addEventListener("DOMContentLoaded", function () {
  // loadQuestion();

 
  // correctScore.textContent = _correctScore;
});

loadQuestion().catch((error) => {
  console.log(error);
});

async function loadQuestion() {
  const url = "https://opentdb.com/api.php?amount=1";
  const response = await fetch(`${url}`);
  const data = await response.json();
  const results = data.results[0];
  checkBtn.addEventListener("click", checkAnswer); 
  // _playAgain.addEventListener("click", restartQuiz);

  displayQuestion();
  selectOption();

  function displayQuestion() {
    const category = results.category;
    const question = results.question;
    const correctAnswer = results.correct_answer;
    let incorrectAnswer = results.incorrect_answers;
    let options = incorrectAnswer;
    options.splice(
      Math.floor(Math.random() * (incorrectAnswer.length + 1)),
      0,
      correctAnswer
    );
    questionBox.innerHTML = "";
    console.log(correctAnswer);
    // Display question
    questionBox.innerHTML = `
    <div
      class="bg-green-600 items-start font-bold px-2 py-1 text-white"
    >
      ${category}
    </div>
    <h2 class="text-lg text-center pb-6">${question}</h2>
    `;
    optionList.innerHTML = `
    ${options
      .map(
        (option) => `
        <li
        class=" quiz-option border border-green-600 text-green-600 font-bold rounded-md shadow-lg px-3 py-2 md:w-96 w-80 text-center cursor-pointer hover:bg-green-600 hover:text-white hover:">${option}</li>
    `
      )
      .join("")}
    `;
  }

  function checkAnswer() {
    const correctAnswer = results.correct_answer;
    if (_options.querySelector(".selected")) {
      let selectedAnswer = _options.querySelector(".selected").textContent;
      if (selectedAnswer == HTMLDecode(correctAnswer)) {
        correctScore++;
        _result.innerHTML = `  <p class="text-darkBlue text-md my-4 text-white"><strong> Correct Answer! <span class="">&check;</span></strong></p>`;
      } else {
        _result.innerHTML = `   <p class="text-red-600 text-md my-4"><strong> Wrong Answer! <span class="text-2xl">&times;</span></strong></p>`;

        askedCount++;
        // console.log(_correctScore);
        // console.log(askedCount);
        correctScore = _correctScore;
        if (askedCount > 1) {
          setTimeout(function () {
            console.log("");
          }, 5000);

          // _result.innerHTML += `<p class="p-4">Your score is ${askedCount}.</p>`;
          // _playAgain.style.display = "block";
          checkBtn.style.display = "none";
        } else {
          setTimeout(function () {
            loadQuestion();
          }, 300);
        }
      }
    } else {
      checkBtn.disabled = false;
    }
  }
}

function selectOption() {
  let selectedOption;
  _options.querySelectorAll("li").forEach(function (option) {
    option.addEventListener("click", function () {
      if (_options.querySelector(".selected")) {
        selectedOption = _options.querySelector(".selected");
        selectedOption.classList.remove("selected");
      }
      option.classList.add("selected");
    });
  });
}

function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function restartQuiz() {
  correctScore = askedCount = 0;
  _playAgain.style.display = "none";
  checkBtn.style.display = "block";

  // askedCount++;
  // console.log(_correctScore);
  // console.log(askedCount);
  // correctScore = _correctScore;
  // if (askedCount == 10) {
  //   setTimeout(function () {
  //     console.log("");
  //   }, 5000);

  //   _result.innerHTML += `<p>Your score is ${_correctScore}.</p>`;
  //   _playAgain.style.display = "block";
  //   checkBtn.style.display = "none";
  // } else {
  //   setTimeout(function () {
  //     loadQuestion();
  //   }, 300);
  // }
}
