const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ac9018841a29b3a1d75a5e5e4d1ac396&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  request(
    { url, json: true },
    (error, { body }) => {
      //json should be written in lowercase
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else if (body.error) {
        callback("Unable to find location!", undefined);
      } else {
        const current = body.current;
        callback(
          undefined,
          `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
        );
      }
    } //function to run when we actually get error/response back
  );
};

module.exports = forecast;
