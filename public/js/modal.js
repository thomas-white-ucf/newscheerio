$(document).ready(function() {
	console.log('Modal.JS > > > HITS');

	$('#savedArtciles').on('click', '.addNoteButton', function() {
		var id = $(this).data('id');
		console.log('id ===== ', id);
		$('.thisNote #articleId').val(id);
		$('#addNoteModal').modal('show');
	});

	// Delete Article on Button Click
	// $('#otherNotes').on('click', '#confirmAddNote', function() {
	// 	event.preventDefault();

	//     const thisId = $(this).attr('id');
	//     console.log({thisId})

	// Grabbing and storing the data-name property value from the selected button

	// 	$.ajax({
	// 		type: 'PUT',
	// 		url: '/api/remove/' + thisId
	// 	}).then(location.reload());
	// });
});
