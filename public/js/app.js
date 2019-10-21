$(document).ready(function() {
	console.log('Public > JS > test.js Loaded.');
	console.log('=============================');

	$('#scrapeButton').on('click', ajaxAPIScrape);

	function ajaxAPIScrape() {
		$.ajax({
			type: 'GET',
			url: '/api/scrape'
		})
		// .then(function(results) {
		// 	console.log('AJAX results = ', results);
			// console.log('AJAX Results = results.length = ', results.length);
			// console.log('results[0].title', results[0].title);
			// console.log('results[0].link', results[0].link);
			// for (var i = 0; i < results.length; i++) {
				// Display the apropos information on the page
			// 	$('#newArticles').append('<p>' + results[i].title + '<br />' + results[i].link + '</p>');
			// }
		// });
	}
});

//  ++++++
//    END

// =======================================

// data-id='" + data[i]._id + "

// Grab the articles as a json
// $.getJSON('/saved', function(data) {
// For each one
// 	for (var i = 0; i < data.length; i++) {
// Display the apropos information on the page
// 		$('#savedArticles').append(
// 			"<p data-id='" + data[i]._id + "'>" + data[i].title + '<br />' + data[i].link + '</p>'
// 		);
// 	}
// });
