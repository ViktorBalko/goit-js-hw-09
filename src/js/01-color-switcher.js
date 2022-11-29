const startButton = document.querySelector('button[data-start]'); 
const stopButton = document.querySelector('button[data-stop]');
const elemBody = document.querySelector('body');

stopButton.disabled = true;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeColor() {
  startButton.disabled = true;
  stopButton.disabled = false;
  timerId = setInterval(() => {
    elemBody.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function stopChangeColor() {
  clearInterval(timerId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', startChangeColor);
stopButton.addEventListener('click', stopChangeColor);
