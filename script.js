const apiKey = '2e336ad9a76d972f5a84be0064a3fe88'; // Replace with your OpenWeatherMap API key

function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('location').innerText = `Location: ${data.name}`;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
            document.getElementById('conditions').innerText = `Conditions: ${data.weather[0].description}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').innerText = 'Unable to retrieve weather data.';
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
        }, () => {
            document.getElementById('weather').innerText = 'Unable to retrieve location.';
        });
    } else {
        document.getElementById('weather').innerText = 'Geolocation is not supported by this browser.';
    }
}

// Refresh weather on button click
document.getElementById('refresh-btn').addEventListener('click', getLocation);

// Get the user's location when the page loads
window.onload = getLocation;
