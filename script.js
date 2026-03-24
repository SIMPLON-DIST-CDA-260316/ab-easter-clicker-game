const gameContainer = document.getElementById("game-container");
const startBtn = document.getElementById("start-btn");
const containerTop = gameContainer.getBoundingClientRect().top;
const containerBottom = gameContainer.getBoundingClientRect().bottom;
const containerLeft = gameContainer.getBoundingClientRect().left;
const containerRight = gameContainer.getBoundingClientRect().right;
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
let isFinished = true;

let total = 0;
let time = 10;
let timerInterval;
let generateItem;

const srcTable = [
  { name: "egg choco", src: "/media/easter-egg-1.webp", score: 1 },
  { name: "egg choco", src: "/media/easter-egg-2.webp", score: 1 },
  { name: "egg gold", src: "/media/easter-egg-gold.webp", score: 5 },
  { name: "egg crack", src: "/media/chick.webp", score: -2 },
  { name: "chicken", src: "/media/chicken.webp", score: -2 },
];

function createItem() {
  let x;
  let y;
  function getRandomX() {
    return Math.abs(Math.random() * (containerRight - containerLeft) - 30);
  }
  function getRandomY() {
    return Math.abs(Math.random() * (containerBottom - containerTop) - 40);
  }
  x = getRandomX();
  y = getRandomY();

  let imageItem = document.createElement("img");
  function getRandomSrc() {
    return Math.round(Math.random() * 4);
  }

  const randomItem = getRandomSrc();
  let src = srcTable[randomItem].src;
  let points = srcTable[randomItem].score;
  imageItem.src = src;

  imageItem.style.left = x + "px";
  imageItem.style.top = y + "px";
  imageItem.style.maxWidth = 30 + "px";
  imageItem.classList.add("item");
  imageItem.style.position = "absolute";

  gameContainer.appendChild(imageItem);
  imageItem.addEventListener("click", (e) => {
    imageItem.style.display = "none";
    console.log(points);
    total += points;
    scoreElement.innerHTML = total;
  });

  setTimeout(() => {
    imageItem.style.display = "none";
  }, 4000);
}

function startGame() {
  total = 0;
  time = 10;
  gameContainer.innerHTML = "";
  isFinished = false;
  scoreElement.innerHTML = total;
  timerElement.innerHTML = time;
  clearInterval(timerInterval);
  clearInterval(generateItem);
  timerInterval = setInterval(() => {
    if (time > 0) {
      time -= 1;
      timerElement.innerHTML = time;
    }
    if (time === 0) {
      isFinished = true;
    }
    if (isFinished) {
      clearInterval(timerInterval);
      gameContainer.innerHTML = "";
      return;
    }
  }, 1000);

  generateItem = setInterval(() => {
    if (!isFinished) {
      createItem();
    }
    if (isFinished) {
      clearInterval(generateItem);
      gameContainer.innerHTML = "";
      return;
    }
  }, 1500);
}

startBtn.addEventListener("click", (e) => {
  startGame();
  startBtn.innerHTML = "Relancer une partie";
});
