const API_KEY = "a91903b30ba5192621eabccd323f8e18";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(response => response.json()
    .then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    }));
}

function onGeoError() {
    const location = document.querySelector("#weather span:first-child");
    location.innerText = "No location";
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);