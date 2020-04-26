const request = require("request");

const geoCode = (location, callback) => {
  let geoCodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1IjoiYWxpcmV6YWthemVtaTEiLCJhIjoiY2s5ZmFodDhpMDk1YjNlcDQxbXVxY29raSJ9.AtLoZNLFaGU88jX3knpMbQ&limit=1";

  request(
    {
      url: geoCodeUrl,
      json: true
    },
    (error, { body } = {}) => {
      if (error) {
        callback("You don't have access to service!", undefined);
      } else if (body.features.length == 0) {
        callback("Unable to find location!", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          place: body.features[0].place_name
        });
      }
    }
  );
};
module.exports = geoCode;
