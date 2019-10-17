// var express = require('express');
// var router = express.Router();
// Require all models

var db = require('../models');

// Require axios and cheerio. This makes the scraping possible
let axios = require('axios');
let cheerio = require('cheerio');

module.exports = function(app) {

	// Main route (simple Hello World Message) (test)
	app.get('/', function(req, res) {
		res.render("index", {msg: "Welcome to Drudger!"});
	});

	// * Route *
	//  =======
	// This route will retrieve all of the data from the scrapedData collection as a json
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
			res.render('index', { results: results });
		});
	});

	// * Route *
	// =======
	// When you visit this route, the server will scrape data from the site of your choice, and save it to MongoDB.
	// change this to <<< /api/: when the button is clicked route
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

	// * Catch any other Routes * *
	// =======
	app.get('*', function(req, res) {
		res.render('index', { msg: 'Page Not Found' });
	});
};
