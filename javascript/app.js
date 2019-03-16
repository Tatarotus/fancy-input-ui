// *** DOM Elements

const body = document.querySelector('body');
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// *** Transition Time

const shakeTime = 70; // Shake Transition Time
const switchTime = 200; // Transition between questions

// Question Array
const questions = [
  {info: 'Enter your first name'},
  {info: 'Enter your last name'},
  {info: 'Enter your email', pattern: /\S+@\S+\.\S+/},
  {info: 'Create a password', type: 'password'},
];

// Init Position at the first question
let position = 0;

//  *** Functions

// Get question from the array and show in the markup
const getQuestion = () => {
  // Show current question
  inputLabel.innerHTML = questions[position].info;
  // Get current type
  inputField.type = questions[position].type || 'text';
  // Get current infoResponse
  inputField.value = questions[position].infoResponse || '';
  // Focus on Element
  inputField.focus();

  // Set progress bar width - In reason to the  questions length

  progress.style.width = (position * 100) / questions.length + '%';

  // Add user icon or back arrow  depending on question

  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

  showQuestion();
};

// Display Question to user
const showQuestion = () => {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
};

// Hide questions from the user

const hideQuestion = () => {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
};

// Check if email pattern is OK

const validate = () => {
  // Make sure Pattern matches if there is one
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
};

// Transform to create a shake motion
const transform = (x, y) => {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
};

const inputFail = () => {
  formBox.className = 'error';
  // Repeat Shake motion - Set i to number of shakes
  for (let i = 0; i < 4; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 4, 0, 0);
    inputField.focus();
  }
};

const inputPass = () => {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store info in array
  questions[position].infoResponse = inputField.value;
  // Increment Position
  position++;
  // If new question - Hide current & get next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form Complete
    formComplete();
  }
};

const formComplete = () => {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(
    document.createTextNode(
      `Thanks ${
        questions[0].infoResponse
      }, you are registered and will get an email shortly!`,
    ),
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => {
      h1.style.opacity = 1;
    }, 50);
  }, 1000);
  console.log(questions);
};

// *** Events

// Get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);
// Next Button Click
nextBtn.addEventListener('click', validate);
document.addEventListener('keyup', e => {
  let key = e.which || e.keyCode;
  if (key === 13) {
    validate();
  }
});

// All Fields complete
