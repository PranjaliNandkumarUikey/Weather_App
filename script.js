let input = document.getElementById("city");
let button = document.getElementById("btn");
let show = document.getElementById("result");

let key = '8fa60ce8e15849f8e5c81f8bc997e77b';

button.addEventListener("click", () => {
    let cityName = input.value;
    let countrycode = 'IN'; 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countrycode}&appid=${key}&units=metric`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.name);
            console.log(data.main.temp);

            let sunrise = new Date(data.sys.sunrise * 1000);
            let sunset = new Date(data.sys.sunset * 1000);
            let humidity = data.main.humidity;

            show.innerHTML = `
                City Name: ${data.name} <br>
                Temperature: ${data.main.temp} °C <br>
                Sunrise: ${formatTime(sunrise)} <br>
                 Sunset: ${formatTime(sunset)} <br> 
                Humidity: ${humidity}%
            `;
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            show.innerHTML = `Error: ${error.message}`;
        });
});

function formatTime(time) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
