const request = require("request");

const getWeather = (latitude, longitude, callback) => {
  let Url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=421b71f44da64c147bbe3e77cdec5f40&units=metric";
  request({ url: Url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("You don't have access to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = getWeather;
