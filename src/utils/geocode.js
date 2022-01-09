const request = require("request");

const geocode = (address, callback) => {
  const MAPBOX_KEY =
    "pk.eyJ1Ijoia2lsbGJveDIxNTciLCJhIjoiY2t4eDh2NTVpMW9tdTJub3p5eHVqcDMzbiJ9.6FNc6xMselY-BRp_19M7kg";
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_KEY}&limit=1`;

  request({ url: mapboxUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geocoding service", undefined);
    } else if (
      response.body.message === "Not Found" ||
      response.body.features.length === 0
    ) {
      callback("Unable to find geocoding location", undefined);
    } else {
      // console.log(response.body);
      const lat = response.body.features[0].center[1];
      const lon = response.body.features[0].center[0];
      const location = response.body.features[0].place_name;
      callback(undefined, { lat, lon, location });
    }
  });
};

module.exports = geocode;
