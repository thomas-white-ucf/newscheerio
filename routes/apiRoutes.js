var db = require('../models');
let axios = require('axios');
let cheerio = require('cheerio');

module.exports = function(app) {
	// * Route *  =======  This route will retrieve all of the data from the scraped collection as a json
	app.get('/api/scrape', function(req, res) {
		// Make a request via axios to grab the HTML body from the site of your choice
		axios
			.get('https://www.drudgereport.com/')
			.then(function(response) {
				console.log('Cheerio Scrape Response...');
				// Load the HTML into cheerio and save it to a variable
				// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
				var $ = cheerio.load(response.data);
				// console.log(response.data);
				var results = [];

				$('a').each(function(i, element) {
					var title = $(element).children().text();
					var link = $(element).attr('href');

					// Save these results to results array
					if (title && link) {
						results.push({
							title: title,
							link: link
						});
					}
				});

				// SAVE ARTICLES IN MONGOOSE MODEL
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

				// Log the results found with cheerio
				console.log('Results < /scrape =', results);

				// res.render('index', { results: results });
                res.render('index', results );
				// res.send(results)
				// res.json(results)
				// res.send( { results: results} );
			})
			.catch(function(err) {
				// If an error occurred, send it to the client
				res.json(err);
			});
	});

	app.get('/api/scrape/saveall', function(req, res) {
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
};
