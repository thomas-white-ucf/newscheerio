$(document).ready(function() {
	console.log('Public > JS > test.js Loaded.');
	console.log('=============================');

	// ONCLICK _ AJAX post > saveToArticles > /api/savescrape/then calls renderFromDatabase for AJAX GET after 1500ms setTimeout
	$('#scrapeButton').on('click', saveToArticles);
	function saveToArticles() {
		// Clear last scraped articles
		$('#newArticles').empty();

		// POST SCRAPED ARTICLES WITH AJAX > RENDER CARD ELEMENTS DYNAMICALLY
		$.ajax({
			type: 'POST',
			url: '/api/savescrape'
		}).then(renderFromDatabase);
	}
	function renderFromDatabase() {
		console.log('renderFormDatabase');

		$.ajax({
			type: 'GET',
			url: '/all/json'
		}).then(function(results) {
			console.log('GET> /all/AJAX results = ', results);
			for (var i = 0; i < results.length; i++) {
				var card = `
					<div class="card my-4 p-4 text-center" style="width: 60rem;">
						<div class="card-header">
							<h3>${results[i].title}</h3>
							<button class="saveButton btn btn-info float-right" data-id="${results[i]._id}">
								Save Article
							</button> 
						</div> 
						<div class="card-body">
							<a class="text-info mx-auto" rel="noopener noreferrer" target="_blank" href="${results[i].link}">
							${results[i].link}</a>
						</div>
					</div>
				`;

				$('#newArticles').append(card);
			}
		});
	}

	// Search Gifs on Gif Button Click
	$('#newArticles').on('click', '.saveButton', function() {
		event.preventDefault();

		const thisId = $(this).attr('data-id');
		// Grabbing and storing the data-name property value from the selected button
		// console.log('thisId = ', thisId);

		$.ajax({
			type: 'PUT',
			url: '/savearticle/' + thisId
		}).then(console.log('Updated article DB parameter :> :>   saved : true'));
	});
});

// =======================================

//  ===========
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
