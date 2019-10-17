// var db = require('../models');

module.exports = function(app) {
    
    app.get('/api', function(req, res) {
		res.render("saved");
    });
    
    // get saved articles
	// app.get('/api/saved', function(req, res) {
		// db.articles.findAll({}, function(error, found) {
		// 	// Show any errors
		// 	if (error) {
		// 		console.log(error);
		// 	} else {
		// 		// Otherwise, send the books we found to the browser as a json
		// 		res.redner('saved', { found: found });
		// 	}
        // });
        // res.send("saved")
	// });
};
