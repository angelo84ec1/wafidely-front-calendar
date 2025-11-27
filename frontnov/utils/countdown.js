// utils/countdown.js
import Cookies from 'js-cookie';

const twentyFourHours = 12 * 60 * 60 * 1000; // 24 horas en milisegundos
const cookieName = 'countdown_timer';

let currentTime = parseInt(localStorage.getItem(cookieName)) || Date.now();
const targetDate = currentTime + twentyFourHours;

const updateTimer = () => {
  currentTime = Date.now();
  localStorage.setItem(cookieName, currentTime.toString()); // Guardar el valor del contador en el localStorage
};

const getTimeLeft = () => {
  return targetDate - Date.now();
};

export { updateTimer, getTimeLeft };






