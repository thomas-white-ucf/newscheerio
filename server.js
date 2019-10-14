// Using the tools and techniques you learned so far,
// you will scrape a website of your choice, then place the data
// in a MongoDB database. Be sure to make the database and collection
// before running this exercise.

// Consult the assignment files from earlier in class
// if you need a refresher on Cheerio.

// Dependencies
var express = require('express');
var mongojs = require('mongojs');
// Require axios and cheerio. This makes the scraping possible
var axios = require('axios');
var cheerio = require('cheerio');

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = 'drudge';
var collections = [ 'drudge' ];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(error) {
	console.log('Database Error:', error);
});

// Main route (simple Hello World Message)
app.get('/', function(req, res) {
	res.send('Hello world');
});

// TODO: make two more routes

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
			results.push({
				title: title,
				link: link
			});
		});

		// Log the results once you've looped through each of the elements found with cheerio
		console.log(results);
	});
});

// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?
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

			// Save these results in an object that we'll push into the results array we defined earlier
			results.push({
				title: title,
				link: link
			});
		});

		// Log the results once you've looped through each of the elements found with cheerio
		// console.log(results);

		// LIMITED PULLS TO 10
		for (var i = 0; i < 10; i++) {
			db.drudge.insert({ title: results[i].title, link: results[i].link });
		}
	});
	res.send('Scrape Complete');
});

/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(3000, function() {
	console.log('App running on port 3000!');
});
