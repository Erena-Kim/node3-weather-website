const path = require("path"); //typically states core modules before stating npm modules
const express = require("express"); //express is a single function
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000; //use the port that heroku provides, otherwise use 3000 local port

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); //set handlebars(npm module)
app.set("views", viewsPath); //Customize 'views' directory
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    //name that matches filename in views folder(can leave off extension)
    title: "Weather",
    name: "Erena Kim",
  }); //objects that node passes to the template(index.hbs)
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Erena Kim",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Erena Kim",
    content: "You can get help message here.",
  });
});

app.get("/weather", (req, res) => {
  //function that describes what it is going to do when someone visits the router
  if (!req.query.address) {
    return res.send({ error: "Address must be provided." });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   //allows us to send something back to the requester
  //   forecast: "It is 30 degrees outside.",
  //   location: "Uijeongbu",
  //   address: req.query.address,
  // }); //automatically stringify object to json
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    error: "Help article not found.",
    name: "Erena Kim",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    error: "Page not found.",
    name: "Erena Kim",
  });
});

// start server
app.listen(port, () => {
  console.log("Server is up on port " + port);
}); //provides port as an argument
