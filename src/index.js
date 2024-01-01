import "./index.scss";

const soundSettings = {
  icon: null,
  selected: null,
  audio: new Audio()
};

function start() {
  displayApp();
  const buttonList = document.querySelectorAll(".button");
  const input = document.querySelector(".input");
  buttonList?.forEach(button => button.addEventListener("click", selectSound));
  input.addEventListener("input", volumeSound);
}

start();

function selectSound(event) {
  event.preventDefault();
  const button = event.target.closest(".button");
  const svg = button.querySelector(".svg");
  const selected = button.dataset.parent;

  if (soundSettings.selected !== selected) {
    soundSettings.audio.src = `./assets/sounds/${selected}.mp3`;
    soundSettings.selected = selected;
  }
  if (soundSettings.audio.paused === true) {
    soundSettings.audio.play();
    soundSettings.icon = svg.src;
    svg.src = "./assets/icons/pause.svg";
  } else {
    soundSettings.audio.pause();
    svg.src = soundSettings.icon;
  }
}

function volumeSound(event) {
  soundSettings.audio.volume = event.target.value / 100;
}

function displayApp() {
  const root = document.querySelector("#root");
  root.innerHTML = `
  <div class="wrapper">
    <h1 class="title">Weather sound</h1>
    <main class="sounds">
      <button class="button" data-parent="summer">
        <img src="./assets/summer-bg.jpg" class="background">
        <img src="./assets/icons/sun.svg" class="svg">
      </button>
      <button class="button" data-parent="rain">
        <img src="./assets/rainy-bg.jpg" class="background">
        <img src="./assets/icons/cloud-rain.svg" class="svg">
      </button>
      <button class="button" data-parent="winter">
        <img src="./assets/winter-bg.jpg" class="background">
        <img src="./assets/icons/cloud-snow.svg" class="svg">
      </button>
    </main>
    <input type="range" class="input">
    <img src="./assets/summer-bg.jpg" class="background">
  </div>
  `;
}
