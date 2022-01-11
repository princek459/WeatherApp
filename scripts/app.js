
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


/**
 * Updating the location
 */

const updateCity = async (city) => {
    // Get the city typed by user and store in cityDets
    const cityDets = await getCity(city);
    // get the eather response and pass in the key and store response in weather
    const weather = await getWeather(cityDets.Key);
    // return 2 objects that stores 2 details weather and city details
    return { cityDets, weather };
};
/** 
 * Attaching event listener to the city form and listening for submit
 */

 cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();
    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();
    // update the ui with new city
    updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);

  });

  // Setting the UI to save to local storage
  if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
  };

/** 
 * Function for taking the data and outputting to the browser.
 */

const updateUI = (data) => {
    // Destructure properties
    const { cityDets, weather } = data;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    // Update the night/day & icon images
    const iconSrc = `icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    let timeSrc = weather.isDayTime ? 'icons/day.svg' : 'icons/night.svg';

    // let timeSrc = null;
    //     if (weather.IsDayTime) {
    //         timeSrc = 'icons/day.svg';
    // } else {
    //     timeSrc = 'icons/night.svg';
    // }
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    };
};


// Ternary operator
// const result = false ? 'value 1' : 'value 2';
// console.log(result);