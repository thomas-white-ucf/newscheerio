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
			.find({saved: true })
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

};

// ====================================
// * Catch any other Routes *   =======
// app.get('*', function(req, res) {
// 	res.render('index', { msg: 'Page Not Found' });
// });
