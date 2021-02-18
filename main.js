const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=e8fe36e661c871e0f65adc9cea6c0e3d';
const units = '&units=metric';
let city;
let url;
let i = 0;

const getWeather = () => {
    city = (!input.value && i === 0) ? 'Warszawa' : input.value;
    url = apiLink + city + apiKey + units;
    i++;

    axios.get(url)
        .then(res => {
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather)

            cityName.textContent = res.data.name;
            weather.textContent = status.main;
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';

            warning.textContent = '';
            input.value = '';

            if (status.id >= 200 && status.id <= 232) {
                photo.setAttribute('src', 'img/thunderstorm.png');
            } else if (status.id >= 300 && status.id <= 321) {
                photo.setAttribute('src', 'img/drizzle.png');
            } else if (status.id >= 701 && status.id <= 781) {
                photo.setAttribute('src', 'img/fog.png');
            } else if (status.id >= 500 && status.id <= 531) {
                photo.setAttribute('src', 'img/ice.png');
            } else if (status.id === 800) {
                photo.setAttribute('src', 'img/sun.png');
            } else if (status.id >= 801 && status.id <= 804) {
                photo.setAttribute('src', 'img/Cloud.png');
            } else {
                photo.setAttribute('src', 'img/unknown.png');
            }
        }).catch(() => warning.textContent = 'Wpisz poprawną nazwę!')
};

const enterCheck = key => {
    if(key.keyCode == 13) {
        getWeather();
    }
}
getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);