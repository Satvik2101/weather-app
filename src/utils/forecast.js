const request = require("request");

const forecast = (lat, lon, callback) => {
  const WEATHERSTACK_KEY = "743387d1b8584136c4f5f522e1acaa48";
  const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_KEY}&query=${lat},${lon}`;
  console.log(weatherStackUrl);
  request({ url: weatherStackUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      // console.log(response.body);

      callback(undefined, {
        temp: response.body.current.temperature,
        description: response.body.current.weather_descriptions,
        precip: response.body.current.precip,
      });
    }
  });
};

module.exports = forecast;
