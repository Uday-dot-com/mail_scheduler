//Required External Modules
const express = require("express");
var bodyParser = require("body-parser");

//App Variables
const app = express();
var router = express.Router();

// Parse incoming requests data
app.use(bodyParser.json());

var models = require("./models");

//initializing sequelize
models.sequelize
  .sync()
  .then(() => {
    console.log("Nice,Database looks fine");
  })
  .catch((err) => {
    console.log(err, "Something went wrong with database update !");
  });

require("./routes/scheduleRoute")(app, router);

//Server Activation
app.listen(3000, () => {
  console.log(`app listening at http://localhost:3000`);
});

module.exports = app;
