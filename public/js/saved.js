$(document).ready(function() {
    console.log("saved.JS > > > HITS HITS HITS")


    // Delete Article on Button Click
	$('#savedArticles').on('click', '.deleteButton', function() {
		event.preventDefault();

		const thisId = $(this).attr('id');
		// Grabbing and storing the data-name property value from the selected button
		// console.log('thisId = ', thisId);

		$.ajax({
			type: 'PUT',
			url: '/api/remove/' + thisId
		}).then(console.log('Deleted Article from User Saved'));
	});
})