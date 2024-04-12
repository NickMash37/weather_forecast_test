const city = document.querySelector(".weather__city");
const forecast = document.querySelector(".weather__forecast");
const temp = document.querySelector(".weather__temp");
const icon = document.querySelector('.weather__icon')
const input = document.querySelector(".weather__choose-input");
const btn = document.querySelector(".weather__choose-btn");

input.addEventListener("change", () => {
  let cityName;
  cityName = input.value;
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&&appid=042c374a23c6008862fcbc42a98c7651`
  )
    .then((resp) => resp.json())
    .then((data) => {
      let lat = data[0].lat
      let lon = data[0].lon
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=042c374a23c6008862fcbc42a98c7651`
      )
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            lat = data.coord.lat
            lon = data.coord.lon
            city.innerHTML = data.name
            temp.textContent = Math.round(data.main.temp - 273)
            forecast.innerHTML = data.weather[0]['description']
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0]['icon']}.png`
            input.value = ''
        })
        .catch((error) => {
          console.error(error);
        });
    });
});