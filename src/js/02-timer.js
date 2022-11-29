import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startButton = document.querySelector('button');
const daysElem = document.querySelector('.value[data-days]');
const hoursElem = document.querySelector('.value[data-hours]');
const minutesElem = document.querySelector('.value[data-minutes]');
const secondsElem = document.querySelector('.value[data-seconds]');

let selectedDate = null;
let intervalId = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('The selected date is valid!');
      startButton.disabled = false;
      selectedDate = selectedDates[0].getTime();
    }
  },
};

flatpickr('#datetime-picker', options);

function startCounter() {
  intervalId = setInterval(() => {
    const deltaTime = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      return;
    }

    startButton.disabled = true;

    updateTimer({ days, hours, minutes, seconds });
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysElem.textContent = `${days}`;
  hoursElem.textContent = `${hours}`;
  minutesElem.textContent = `${minutes}`;
  secondsElem.textContent = `${seconds}`;
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Кількість мілісекунд на одиницю часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Решта днів
  const days = addZero(Math.floor(ms / day));
  // Решта годин
  const hours = addZero(Math.floor((ms % day) / hour));
  // Решта хвилин
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Решта секунд
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', startCounter);