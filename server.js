// Using the tools and techniques you learned so far,
// you will scrape a website of your choice, then place the data
// in a MongoDB database. Be sure to make the database and collection
// before running this exercise.

// Consult the assignment files from earlier in class
// if you need a refresher on Cheerio.

// Dependencies
require('dotenv').config();
let express = require('express');
// let HANDLEBARS + REQUIRE>>()
let bodyParser = require('body-parser');
// let mongojs = require('mongojs');
let mongoose = require('mongoose');
let app = express();
let PORT = process.env.PORT || 3000;

// Require all models
var db = require('./models');

// Require axios and cheerio. This makes the scraping possible
let axios = require('axios');
let cheerio = require('cheerio');

// Parse request body as JSON     ** --- they had false for configure body parser for AJAX requests in the Setup Heroku example
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Make public a static folder
app.use(express.static('/'));

mongoose.Promise = global.Promise;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

// console.log("MONGODB_URI = ", MONGODB_URI)
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// mongoose.connection.once('open', function(){
// 	console.log('Conection has been made!');
//   }).on('error', function(error){
// 	  console.log('Error is: ', error);
//   });

// Database configuration
// let databaseUrl = 'drudge';
// let collections = [ 'drudge' ];

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on('error', function(error) {
// 	console.log('Database Error:', error);
// });

// Main route (simple Hello World Message)
app.get('/', function(req, res) {
	res.send('Hello world');
});

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get('/all', function(req, res) {
	// Make a request via axios to grab the HTML body from the site of your choice
	axios.get('https://www.drudgereport.com/').then(function(response) {
		// Load the HTML into cheerio and save it to a variable
		// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
		var $ = cheerio.load(response.data);

		// console.log(response.data);

		// An empty array to save the data that we'll scrape
		var results = [];

		// Select each element in the HTML body from which you want information.
		// NOTE: Cheerio selectors function similarly to jQuery's selectors,
		// but be sure to visit the package's npm page to see how it works
		$('a').each(function(i, element) {
			var title = $(element).children().text();
			// var link = $(element).find("a").attr("href");
			var link = $(element).attr('href');

			// Save these results in an object that we'll push into the results array we defined earlier
			if (title && link) {
				results.push({
					title: title,
					link: link
				});
			}
		});

		// Log the results once you've looped through each of the elements found with cheerio
		console.log(results);
	});
});

// Route 2
// =======
// When you visit this route, the server will scrape data from the site of your choice, and save it to MongoDB.
app.get('/drudge', function(req, res) {
	axios.get('https://www.drudgereport.com/').then(function(response) {
		// Load the HTML into cheerio and save it to a variable
		// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
		var $ = cheerio.load(response.data);
		// console.log(response.data);

		// An empty array to save the data that we'll scrape
		var results = [];

		// Select each element in the HTML body from which you want information.
		// NOTE: Cheerio selectors function similarly to jQuery's selectors,
		// but be sure to visit the package's npm page to see how it works
		$('a').each(function(i, element) {
			var title = $(element).children().text();
			// var link = $(element).find("a").attr("href");
			var link = $(element).attr('href');

			if (title && link) {
				// Save these results in an object that we'll push into the results array we defined earlier
				results.push({
					title: title,
					link: link
				});
			}
		});

		// Log the results once you've looped through each of the elements found with cheerio
		// console.log(results);
		for (var i = 0; i < 10; i++) {
			db.Article
				.create(results[i])
				.then(function(dbArticle) {
					// View the added result in the console
					console.log(dbArticle);
				})
				.catch(function(err) {
					// If an error occurred, log it
					console.log(err);
				});
		}
	});
	res.send('Scrape Complete');
});

// Listen on PORT Variable
app.listen(PORT, function() {
	console.log(`App running on PORT: ${PORT}`);
});
