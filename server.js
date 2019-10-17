// Scrape a website, then place the data in a MongoDB database. 
// Be sure to make the database and collection before running this exercise.

// Dependencies
require('dotenv').config();
let express = require('express');
var exphbs = require("express-handlebars");
let mongoose = require('mongoose');
let logger = require('morgan');
let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder for access to JS and CSS
// Parse request body as JSON     
// ex. had False for configure body parser for AJAX requests in the Setup Heroku example

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);
// var routes = require("./controllers/controller");
// app.use(routes);

mongoose.Promise = global.Promise;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// * Connect to the Mongo DB 
// console.log("MONGODB_URI = ", MONGODB_URI)
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// * Listen on PORT Variable
app.listen(PORT, function() {
	// console.log(`App running on PORT: ${PORT}`);
	console.log(
		"==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
		PORT,
		PORT
	  );
});

// =========

//    END

// Promise = require("bluebird")
// mongoose.Promise = Promise;
// let bodyParser = require('body-parser');
// let mongojs = require('mongojs');