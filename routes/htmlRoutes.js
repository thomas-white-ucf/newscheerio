var db = require('../models');

// Require axios and cheerio. This makes the scraping possible
let axios = require('axios');
let cheerio = require('cheerio');

module.exports = function(app) {
	//  * Route *   =======  PUBLIC STATIC ROUTE
	app.get('/', function(req, res) {
		res.render('index', { msg: 'Welcome to News Cheerio!' });
	});

	// * Route *   =======   GET - USER SAVED -articles
	app.get('/saved', function(req, res) {
		// Grab every document in the Articles collection - in MongoDB
		db.Article
			.find({})
			.then(function(dbArticle) {
				// If we were able to successfully find Articles, send them back to the client
				console.log(dbArticle);
				res.render('saved', { dbArticle: dbArticle });
			})
			.catch(function(err) {
				// If an error occurred, send it to the client
				res.json(err);
			});
	});

	// * Route *   =======   GET - ALL - saved articles
	app.get('/all/saved', function(req, res) {
		// Grab every document in the Articles collection - in MongoDB
		db.Article
			.find({})
			.then(function(dbArticle) {
				// If we were able to successfully find Articles, send them back to the client
				console.log(dbArticle);
				res.render('allsaved', { dbArticle: dbArticle });
			})
			.catch(function(err) {
				// If an error occurred, send it to the client
				res.json(err);
			});
	});

	// * Route *  =======  Server will scrape data from the site of your choice.Saves data in MongoDB.
	app.post('/savearticle/:id', function(req, res) {
		
		id = req.params.id
		console.log({id})
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

		res.send('Save Article to Database Complete');
	});
};

// ====================================
// * Catch any other Routes *   =======
// app.get('*', function(req, res) {
// 	res.render('index', { msg: 'Page Not Found' });
// });
