import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formElem = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const elems = evt.currentTarget.elements;

  let delay = Number(elems.delay.value);
  let step = Number(elems.step.value);
  let amount = Number(elems.amount.value);

  for (let position = 1; position <= amount; position++) {
    if (position !== 1) {
      delay += step;
    }
    createPromise(position, delay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`),
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`),
      );
  }
}

formElem.addEventListener('submit', onFormSubmit);