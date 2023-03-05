// import img1 from "./public/clay-elliot-DLkwX8_B9Ns-unsplash.jpg";
// import img2 from "./public/gabor-kozmon-a2zK5tC3u1c-unsplash.jpg";
// import img3 from "./public/marek-piwnicki-pXoNNmHgAlw-unsplash.jpg";
// import img4 from "./public/nico-baum-jr0GS51wwyE-unsplash.jpg";

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.querySelector(".clock").textContent = timeString;
}
// setInterval(updateTime, 1000);

// Login using local storage
const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");
const userName = document.querySelector("#user-name");
const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  if (username && password) {
    userName.innerHTML = `${username}님 안녕하세요`;
    loginForm.style = "display: none";
  }
});

const storedUsername = localStorage.getItem("username");
const storedPassword = localStorage.getItem("password");
if (storedUsername && storedPassword) {
  usernameInput.value = storedUsername;
  passwordInput.value = storedPassword;
  userName.innerHTML = `${storedUsername}님 안녕하세요`;
  loginForm.style = "display: none";
}

// Todo list using local storage
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-items");
const todoForm = document.querySelector(".todo-form");

function renderTodoItems() {
  const todoItems = JSON.parse(localStorage.getItem("username")) || [];
  todoList.innerHTML = "";
  todoItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.text;
    todoList.appendChild(li);
  });
}
function addTodoItem(text) {
  const newItem = {
    id: JSON.parse(localStorage.getItem("todoItems")) || [],
    text: text,
  };
  const temp = JSON.parse(localStorage.getItem("todoItems")) || [];

  temp.push(newItem);
  localStorage.setItem("todoItems", JSON.stringify(temp));
  renderTodoItems();
}
renderTodoItems();
console.log(todoForm, "todoForm");
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    addTodoItem(todoText);
    todoInput.value = "";
  }
  // localStorage.setItem("todoItems", JSON.stringify(todo)
});

// Display weather and location using geolocation and weather API
const locationElement = document.querySelector("#location");
const temperatureElement = document.querySelector("#temperature");
const bodyElement = document.querySelector(".container");

const imageUrls = [
  "https://fastly.picsum.photos/id/27/3264/1836.jpg?hmac=p3BVIgKKQpHhfGRRCbsi2MCAzw8mWBCayBsKxxtWO8g",
  "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
  "https://fastly.picsum.photos/id/14/2500/1667.jpg?hmac=ssQyTcZRRumHXVbQAVlXTx-MGBxm6NHWD3SryQ48G-o",
  "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
];

function displayRandomImage() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const imageUrl = imageUrls[randomIndex];
  console.log(imageUrl);
  bodyElement.style.backgroundImage = `url(${imageUrl})`;
}

displayRandomImage();

function displayWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const weatherApiKey = "4ae95ae9030a75e229c06a207a010c5b";
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`;

  fetch(weatherApiUrl)
    .then((response) => response.json())
    .then((data) => {
      const cityName = data.name;
      const temperature = data.main.temp - 273.15; // convert from Kelvin to Celsius
      locationElement.textContent = ` ${cityName} : ${temperature.toFixed(
        1
      )} °C`;
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      locationElement.textContent = "Error fetching weather";
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayWeather, (error) => {
      console.error("Error getting location:", error);
      locationElement.textContent = "Error getting location";
    });
  } else {
    locationElement.textContent =
      "Geolocation is not supported by your browser";
  }
}

// getLocation();
