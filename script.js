const gameContainer = document.getElementById("game-container");
const easterEgg = document.getElementById("easter-egg-1");
const startBtn = document.getElementById("start-btn");
const containerTop = gameContainer.getBoundingClientRect().top;
const containerBottom = gameContainer.getBoundingClientRect().bottom;
const containerLeft = gameContainer.getBoundingClientRect().left;
const containerRight = gameContainer.getBoundingClientRect().right;

const srcTable = [
  "/media/easter-egg-1.webp",
  "/media/easter-egg-2.webp",
  "/media/easter-egg-gold.webp",
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
    return Math.round(Math.random() * 2);
  }
  let src = srcTable[getRandomSrc()];
  imageItem.src = src;

  imageItem.style.left = x + "px";
  imageItem.style.top = y + "px";
  imageItem.style.width = 30 + "px";
  imageItem.classList.add("item");
  imageItem.style.position = "absolute";
  gameContainer.appendChild(imageItem);
  imageItem.addEventListener("click", (e) => {
    imageItem.style.display = "none";
  });
}

startBtn.addEventListener("click", (e) => {
  setInterval(() => {
    createItem();
  }, 2000);
});
