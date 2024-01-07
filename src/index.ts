import "./index.scss";

interface IItem {
  id: number;
  icon: string;
  sound: string;
  bg: string;
  color: string;
}
interface ISoundSettings {
  items: IItem[];
  selectedId: number | null;
  audio: any;
}

const app: ISoundSettings = {
  items: [
    { id: 1, icon: "sun.svg", sound: "summer.mp3", bg: "summer-bg.jpg", color: "orangered" },
    { id: 2, icon: "cloud-rain.svg", sound: "rain.mp3", bg: "rainy-bg.jpg", color: "plum" },
    { id: 3, icon: "cloud-snow.svg", sound: "winter.mp3", bg: "winter-bg.jpg", color: "darkolivegreen" }
  ],
  selectedId: 1,
  audio: new Audio()
};

function start() {
  displayApp();
  const buttonList = document.querySelectorAll(".button");
  const input = document.querySelector(".input") as HTMLInputElement;
  buttonList?.forEach(button => button.addEventListener("click", selectSound));
  input.addEventListener("input", volumeSound);
}

start();

function selectSound(event: any) {
  event.preventDefault();
  const currentButton = document.querySelector(`#button-${app.selectedId}`);
  const currentSvg = currentButton.querySelector(".svg") as HTMLImageElement;
  const currentItem = app.items.find(item => item.id === app.selectedId);
  const currentBackground = document.querySelector(`#bg-${currentItem.id}`) as HTMLImageElement;
  const button = event.target.closest(".button");
  const svg = button.querySelector(".svg");
  const id = +button.dataset.id;
  const item = app.items.find(item => item.id === id);
  const background = document.querySelector(`#bg-${item.id}`) as HTMLImageElement;
  const title = document.querySelector(`.title`) as HTMLTitleElement;

  if (app.selectedId !== id) {
    currentSvg.src = `./assets/icons/${currentItem.icon}`;
    background.classList.add("current");
    currentBackground.classList.remove("current");
    title.setAttribute("style", `color: ${item.color}`);
    app.selectedId = id;
    app.audio.src = `./assets/sounds/${item.sound}`;
  }
  if (app.audio.paused === true) {
    app.audio.src = `./assets/sounds/${item.sound}`;
    app.audio.play();
    svg.src = "./assets/icons/pause.svg";
  } else {
    app.audio.pause();
    svg.src = `./assets/icons/${item.icon}`;
  }
}

function volumeSound(event: any) {
  app.audio.volume = event.target.value / 100;
}

function displayApp() {
  const root = document.querySelector("#root") as HTMLDivElement;
  root.innerHTML = `
  <div class="wrapper">
    <h1 class="title">Weather sound</h1>
    <main class="sounds">
    ${app.items
      .map(
        item =>
          `
        <button class="button" id="button-${item.id}" data-id="${item.id}">
          <img src="./assets/${item.bg}" class="background">
          <img src="./assets/icons/${item.icon}" class="svg">
        </button>
        `
      )
      .join("")}
    </main>
    <input type="range" class="input">
    ${app.items.map(item => `<img src="./assets/${item.bg}" class="background" id="bg-${item.id}">`).join("")}
  </div>
  `;
}
