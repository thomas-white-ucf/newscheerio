var db = require('../models');
let axios = require('axios');
let cheerio = require('cheerio');
// let moment = require("moment")

module.exports = function(app) {
	// * Route *  =======  This route will retrieve all of the data from the scraped collection as a json
	app.post('/api/savescrape', function(req, res) {
		// Make a request via axios to grab the HTML body from the site of your choice
		// TODO: use Fetch functions to separate code more
		axios
			.get('https://www.drudgereport.com/')
			.then(function(response) {
				console.log('Cheerio Scrape Response...');

				// Load the HTML into cheerio and save it to a variable
				var $ = cheerio.load(response.data);
				// console.log(response.data);

				// var results = [];

				$('a').each(function(i, element) {
					var title = $(element).children().text();
					var link = $(element).attr('href');

					// Save these results to results array
					if (title && link) {
						// results.push({
						// 	title: title,
						// 	link: link
						// });
						let result = {
							title: title,
							link: link
						};
						db.Article.create(result).then(function(dbArticle) {
							console.log('create result = ', dbArticle);
						});
					}
				});

				// res.json(results);
			})
			.catch(function(err) {
				// If an error occurred, send it to the client
				res.json(err);
			});
	});

	// * Route *   =======   GET - ALL - saved articles
	app.get('/all/json', function(req, res) {
		console.log('/all/json HITTTTS ');
		// moment.duration(1500)
		// Grab every document in the Articles collection - in MongoDB
		db.Article
			.find({})
			.then(function(dbArticle) {
				// If we were able to successfully find Articles, send them back to the client
				// console.log(dbArticle);
				console.log('GET _ /all/JSON');

				res.send(dbArticle);
				// res.render('allsaved', { dbArticle: dbArticle });
			})
			.catch(function(err) {
				// If an error occurred, send it to the client
				res.json(err);
			});
	});

	// * Route *  =======  Server will update Saved Mongoose Article Parameter by _Id to MongoDB.
	app.put('/savearticle/:id', function(req, res) {
		id = req.params.id;
		console.log({ id });
		db.Article
			.update({ _id: id }, { saved: true })
			.then(function(dbArticle) {
				// View the added result in the console
				console.log('updated dbarticle', dbArticle);
			})
			.catch(function(err) {
				// If an error occurred, log it
				console.log(err);
			});

		res.send('Save Article to Database Complete');
	});

	// Deleted articles  - Could change to set FALSE INSTEAD
	app.put('/api/remove/:id', function(req, res) {
		id = req.params.id;
		console.log({ id });

		db.Article
		.update({ _id: id }, { saved: false })
		.then(function(dbArticle) {
			// View the added result in the console
			console.log('updated dbarticle', dbArticle);
		})
		.catch(function(err) {
			// If an error occurred, log it
			console.log(err);
		});

		res.send('Changed to not saved Article');
	});
};

// END
// ================
//

// db.Article
// 	.remove({ _id: id })
// 	.then(function(dbArticle) {
// View the added result in the console
// 		console.log('Deleted dbarticle', dbArticle);
// 	})
// 	.catch(function(err) {
// If an error occurred, log it
// 		console.log(err);
// 	});

// db.Article
// 	.find()
// 	.then(function(dbArticle) {
// 		console.log('.then.then....dbArticle = ', dbArticle);
// 		res.json(dbArticle);
// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});

// let result = {
// 	title: title,
// 	link: link
// };

// db.Article.create(result).then(function(dbArticle) {
// console.log('create result = ', dbArticle);
// 	results.push(dbArticle)
// });

// res.json(results)

// .then(function(response) {
// 	db.Article
// 		.find()
// 		.then(function(dbArticle) {
// 			console.log(".then.then....dbArticle = ", dbArticle);
// 			res.json(dbArticle);
// 		})
// 		.catch(function(err) {
// 			console.log(err);
// 		});
// });

// SAVE ARTICLES IN MONGOOSE MODEL
// for (var i = 0; i < 10; i++) {
// 	db.Article
// 		.create(results[i])
// 		.then(function(dbArticle) {
// View the added result in the console
// 	console.log("save to mongoose model >dbArticle =", dbArticle);
// })
// .catch(function(err) {
// If an error occurred, log it
// 	console.log(err);
// });
// }

// Log the results found with cheerio
// console.log('Results < /scrape =', results);
// db.Article
// 	.find()
// 	.then(function(dbArticle) {
// View the added result in the console
// console.log(dbArticle);
// respond to the AJAX request
// 	res.json(dbArticle);
// })
// .catch(function(err) {
// If an error occurred, log it
// 	console.log(err);
// });

// =================
// app.get('/api/scrape/saveall', function(req, res) {
// 	axios.get('https://www.drudgereport.com/').then(function(response) {
// Load the HTML into cheerio and save it to a variable
// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
// var $ = cheerio.load(response.data);
// console.log(response.data);

// An empty array to save the data that we'll scrape
// var results = [];

// Select each element in the HTML body from which you want information.
// NOTE: Cheerio selectors function similarly to jQuery's selectors,
// but be sure to visit the package's npm page to see how it works
// $('a').each(function(i, element) {
// 	var title = $(element).children().text();
// var link = $(element).find("a").attr("href");
// var link = $(element).attr('href');

// if (title && link) {
// Save these results in an object that we'll push into the results array we defined earlier
// 		results.push({
// 			title: title,
// 			link: link
// 		});
// 	}
// });

// Log the results once you've looped through each of the elements found with cheerio
// console.log(results);
// for (var i = 0; i < 10; i++) {
// 	db.Article
// 		.create(results[i])
// 		.then(function(dbArticle) {
// View the added result in the console
// 	console.log(dbArticle);
// })
// .catch(function(err) {
// If an error occurred, log it
// 					console.log(err);
// 				});
// 		}
// 	});
// 	res.send('Scrape Complete');
// });
