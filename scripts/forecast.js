
class Forecast{
    constructor(){
        this.key = 'HShAczGxvr5yfqIJnEMQrJVvbUJ66P8G';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    // Methods
    async updateCity(city){

    // Get the city typed by user and store in cityDets
    const cityDets = await this.getCity(city);

    // get the eather response and pass in the key and store response in weather
    const weather = await this.getWeather(cityDets.Key);

    // return 2 objects that stores 2 details weather and city details
    return { cityDets, weather };
    }

    // Get city information function
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURL + query);
        const data = await response.json();
        return data[0];
    }
    // Get weather information function
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURL + query);
        const data = await response.json();
        return data[0];
    }
}
