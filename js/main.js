// Questions Array
let questions = [
    { question: 'Enter your first name' },
    { question: 'Enter your last name' },
    { question: 'Enter your email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create your password', type: 'password' }
]

// Transition times
const shakeTime = 100;
const switchTime = 200;

// Initi current question at first question
let position = 0;

// Init DOM elements
const formBox = document.querySelector('#form-box');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLable = document.querySelector('#input-lable');
const inputProgress = document.querySelector('#input-progress');
const barProgress = document.querySelector('#bar-progress');


// EVENTS

// Get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next button click
nextBtn.addEventListener('click', validate);

// Prev button click
prevBtn.addEventListener('click', previousBtn);

// FUNCTIONS

function previousBtn(){
    if (position <= 0) {
         return false 
    } else {
        position--; 
        getQuestion()
    }
}

// Go to next question if user press 'enter' 
inputField.addEventListener('keyup', e => {
    if (e.keyCode == 13){
        validate();
    }
})

// Validate Form input
function validate(){
    // Make sure patterns matches if there is one
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        fieldFail();
    } else {
        fieldPass();
    }
}

// Transform Helper function
function transform(x,y){
    formBox.style.transition = `transform ${0.3}s ease`;
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

function fieldFail(){
    formBox.className = 'error';
    // Repeat shake motion - set i to number of shake
    for (let i = 0; i < 6; i++){
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
    
}

function fieldPass(){
    // Remove error color
    formBox.className = '';
    // Success motion ran
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    // Store answer in array
    questions[position].answer = inputField.value;

    // Increment position
    position++;

    // If new question, hide current and show new
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // If no more question
        hideQuestion();
        formBox.className = 'close';
        barProgress.style.width = '100%';
        
        
        // Form complete
        formComplete();
    }
}


// All field complete - show h1 end
function formComplete(){
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    let text = document.createTextNode(`Thanks ${questions[0].answer}, Your are registered and will get a email shortly`);
    h1.appendChild(text);
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => h1.style.opacity = 1, 50);
    }, 1000)
}


// Get question from array & add up to markup 
function getQuestion(){
    // Get current question
    inputLable.textContent = questions[position].question;
    // Get current type (text by default)
    inputField.type = questions[position].type || 'text';
    // Get current answers and add to the array
    inputField.value = questions[position].answer || '';
    
    // Focus on
    inputField.focus();

    // Update progress width according to remaining question 
    barProgress.style.width = (position * 100) / questions.length + '%';

    // Add User Icon OR Back-Arrow depending on question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    
    showQuestion();
}

// Start showing user the question
function showQuestion(){
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

// Start hiding user the question
function hideQuestion(){
    inputGroup.style.opacity = 0;
    inputLable.style.marginLeft = 0;
    inputProgress.style.transition = 'none';
    inputProgress.style.width = 0;
    inputGroup.style.border = null;
}
