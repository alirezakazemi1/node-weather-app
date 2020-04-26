const locationProvider = require("./src/location");
const weatherProvider = require("./src/weather");
const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "/public");
const viewDirectory = path.join(__dirname, "/themeplate/views");
const partialsDirectory = path.join(__dirname, "/themeplate/partials");

app.set("view engine", "hbs");
app.set("views", viewDirectory);
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsDirectory);

app.get("", (req, res) => {
  res.render("index");
});
app.get("/help", (req, res) => {
  res.render("help");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/api/weather", (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.send({
      error: "location is required."
    });
  }
  locationProvider(location, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    weatherProvider(latitude, longitude, (error, { current } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      return res.send({
        current,
        place,
        location
      });
    });
  });
});
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log("Server is running!");
});
