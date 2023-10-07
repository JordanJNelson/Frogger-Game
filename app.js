const timeLeftDisplay = document.querySelector('#time-left')
const result = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

// global variables
const grid = 80;
let keys = [];
let score = 0
let collisonsCount= 0;
let frame = 0;
let gameSpeed = 1;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];

console.log(squares)
let currentIndex = 76;
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 60;

// Move the frog
function moveFrog(e) {
  squares[currentIndex].classList.remove('frog')

  switch (e.key) {
    case 'ArrowLeft':
      if (currentIndex % width !== 0) currentIndex -= 1;
      break;
    case 'ArrowRight':
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case 'ArrowUp':
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case 'ArrowDown':
      if (currentIndex + width < width * width) currentIndex += width
      break;
  }

  squares[currentIndex].classList.add('frog')

}
// moving logs
function autoMoveElements() {
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  logsLeft.forEach(logLeft => moveLogLeft(logLeft));
  logsRight.forEach(logRight => moveLogRight(logRight));
  carsLeft.forEach(carLeft => moveCarLeft(carLeft));
  carsRight.forEach(carRight => moveCarRight(carRight));
}

function checkOutcomes() {
  lose()
  win()
}

// move logs to the left
function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains('l1') :
      logLeft.classList.remove('l1')
      logLeft.classList.add('l2')
      break 
     case logLeft.classList.contains('l2') :
        logLeft.classList.remove('l2')
        logLeft.classList.add('l3')
        break  
     case logLeft.classList.contains('l3') :
      logLeft.classList.remove('l3')
      logLeft.classList.add('l4')
      break 
    case logLeft.classList.contains('l4') :
      logLeft.classList.remove('l4')
      logLeft.classList.add('l5')
      break 
    case logLeft.classList.contains('l5') :
      logLeft.classList.remove('l5')
      logLeft.classList.add('l1')
      break 
  }
}

// move logs to the right
function moveLogRight(logRight) {
  switch (true) {
    case logRight .classList.contains('l1') :
      logRight.classList.remove('l1')
      logRight.classList.add('l5')
      break 
     case logRight.classList.contains('l2') :
        logRight.classList.remove('l2')
        logRight.classList.add('l1')
        break  
     case logRight.classList.contains('l3') :
      logRight.classList.remove('l3')
      logRight.classList.add('l2')
      break 
    case logRight.classList.contains('l4') :
      logRight.classList.remove('l4')
      logRight.classList.add('l3')
      break 
    case logRight.classList.contains('l5') :
      logRight.classList.remove('l5')
      logRight.classList.add('l4')
      break 
  }
}

// move cars to the left
function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains('c1') :
      carLeft.classList.remove('c1')
      carLeft.classList.add('c2')
      break 
     case carLeft.classList.contains('c2') :
        carLeft.classList.remove('c2')
        carLeft.classList.add('c3')
        break  
     case carLeft.classList.contains('c3') :
      carLeft.classList.remove('c3')
      carLeft.classList.add('c1')
      break
  }
}

// move cars to the right
function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains('c1') :
      carRight.classList.remove('c1')
      carRight.classList.add('c3')
      break 
     case carRight.classList.contains('c2') :
        carRight.classList.remove('c2')
        carRight.classList.add('c1')
        break  
     case carRight.classList.contains('c3') :
      carRight.classList.remove('c3')
      carRight.classList.add('c2')
      break
  }
}

// lose logic
function lose() {
  if (
    squares[currentIndex].classList.contains('c1') || 
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') ||
    currentTime <= 0
    ) {
    resultDisplay.textContent = 'You lose!';
    clearInterval(timerId)
    clearInterval(outcomeTimerId)
    squares[currentIndex].classList.remove('frog')
    document.removeEventListener('keyup', moveFrog)
  }
}

// win logic
function win() {
  if (squares[currentIndex].classList.contains('ending-block')) {
    resultDisplay.textContent = 'You win!'
    clearInterval(timerId)
    clearInterval(outcomeTimerId)
    document.removeEventListener('keyup', moveFrog)
  }
}

// set timer
startPauseButton.addEventListener('click', () => {
   if(timerId){
      clearInterval(timerId);
      clearInterval(outcomeTimerId);
      outcomeTimerId = null;
      timerId = null;
      document.removeEventListener('keyup', moveFrog);
   } else {
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutcomes, 50);
    document.addEventListener('keyup', moveFrog);
  }
})




// Frogger
class Frogger {
  constructor(){
    this.spriteWidth = 250;
    this.spriteHeight = 250;
    this.width = this.spriteWidth/5;
    this.height = this.spriteHeight/5;
    this.x = canvas.width/2 - this.width/2;
    this.y = canvas.height - this.height - 40;
    this.moving = false;

  }
  update(){
    console.log('update');
    if (keys[38]){ // up
      if(this.moving === false){
        this.y -= grid;
        this.moving = true;
      }
    }
    if (keys[40]){ // down
      if(this.moving === false && this.y < canvas.height - this.height * 2){
          this.y += grid;
          this.moving = true;
        }
      }
    if (keys[37]){ // left
      if(this.moving === false && this.x > this.width){
          this.x -= grid;
          this.moving = true;
        }
      }
      if (keys[39]){
        if(this.moving === false && this.x < canvas.width - this.width * 2){
          this.x += grid;
          this.moving = true;
        }
      }
      if (this.y < 0) scored();
   }
  drawFrog(){
    ctx3.fillStyle = "green";
    ctx3.fillRect(this.x, this.y, this.width, this.height)
  }
jump(){

  }
}

const frogger = new Frogger();

function animate(){
  ctx3.clearRect(0, 0, canvas.width, canvas.height);
  frogger.drawFrog();
  frogger.update();
  handleObstacles();
  requestAnimationFrame(animate);
}


animate();


// event listeners
windows.addEventListener('keydown', function(e){
  keys = [];
  keys[e.keyCode] = true;
  if (keys[37] || keys[38] || keys[39] || keys[40]) {
    frogger.jump();
  }
});

window.addEventListener('keyup', function(e){
  delete keys[e.keyCode];
  frogger.moving = false;
});

function scored(){
  score++;
  gameSpeed += 0.05;
  frogger.x = canvas.width/2 - this.width/2;
  frogger.y = canvas.height - this.height - 40;
}

class Obstacle {
  constructor(x, y, width, height, speed, type){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;
  }
  drawFrog(){
    ctx1.fillRect(this.x, this.y, this.width, this.height);
  }
  update(){
    this.x += this.speed * gameSpeed; 
    if(this.x > canvas.width + this.width){
      this.x = 0 - this.width;
    }

  }
}

function initObstacles(){
  // lane 
  for(let i = 0; i < 2; i++){
    let x = i * 350;
    carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car'));
  }
}


initObstacles();

function handleObstacles(){
  for (let i = 0; i < carsArray.length; i++){
    carsArray[i].update();
    carsArray[i].draw();
  }
}