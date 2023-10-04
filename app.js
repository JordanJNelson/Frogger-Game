const timeLeftDisplay = document.querySelector('#time-left')
const result = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')

// Draw the frog
function moveFrog() {
  ctx.fillStyle = 'green';
  ctx.fillRect(frog.x, frog.y, frog.width, frog.height);
} 
document.addEventListener('keyup', moveFrog)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Frog properties
const frog = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  width: 30,
  height: 30,
  speed: 5,
};

function drawCars() {
  ctx.fillStyle = 'red';
  cars.forEach(car => {
      ctx.fillRect(car.x, car.y, car.width, car.height);
  });
}

function moveFrog(direction) {
  if (direction === 'left' && frog.x > 0) {
      frog.x -= frog.speed;
  } else if (direction === 'right' && frog.x + frog.width < canvas.width) {
      frog.x += frog.speed;
  } else if (direction === 'up' && frog.y > 0) {
      frog.y -= frog.speed;
      score += 10; // Increase the score when the frog moves up
  } else if (direction === 'down' && frog.y + frog.height < canvas.height) {
      frog.y += frog.speed;
  }
}

function updateGameArea() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrog();
  drawCars();
}
cars.forEach(car => {
  if (
      frog.x < car.x + car.width &&
      frog.x + frog.width > car.x &&
      frog.y < car.y + car.height &&
      frog.y + frog.height > car.y
  ) {
      // Collision detected, reset the frog
      frog.x = canvas.width / 2 - 15;
      frog.y = canvas.height - 30;
      score = 0;
  }
});

requestAnimationFrame(updateGameArea);


// Handle keyboard input
window.addEventListener('keydown', (event) => {
switch (event.key) {
  case 'ArrowUp':
      moveFrog('up');
      break;
  case 'ArrowDown':
      moveFrog('down');
      break;
  case 'ArrowLeft':
      moveFrog('left');
      break;
  case 'ArrowRight':
      moveFrog('right');
      break;
}
});

updateGameArea();
// Update the game state
function update() {
  // Handle user input here
  // Move the frog based on user input

  // Check for collisions with obstacles (e.g., cars)

  // Check if the frog reached the goal

  // Redraw the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveFrog();

  // Request the next frame
  requestAnimationFrame(update);
}

// Start the game loop
update();