/*** Flickr ***/
if (page == 'portfolio') {
	var flickrurl = "http://api.flickr.com/services/feeds/photos_public.gne?tags=nature&format=json&jsoncallback=?";

	$.ajax({
	  dataType: "json",
	  url: flickrurl,
	  success: function(data) {
	  	$.each(data.items, function(i,item) {
	  		var newLi = $('<li></li>');
	  		var newA = $('<a></a>');
	  		var newImg = $('<img>');
	  		var newP = $('<p></p>');
	  		newA.attr("href",item.link);
	  		newImg.attr("src",item.media.m);
	  		newP.text(item.title);
	  		newA.append(newImg);
	  		newA.append(newP);
	  		newLi.append(newA);
	  		$('#flex-container').append(newLi);
	  	});
	  }
	});
}

/*** Form ***/
if (page =='index') {
	$('#index-form').parsley();

	$('#form-button').click(function(event){
		var nameForm = $('#nameForm').val();
		var emailForm = $('#emailForm').val();
		var messageForm = $('#messageForm').val();
		var background = $('#background').val();
		
		if(!nameForm == '' || !emailForm =='') {
			event.preventDefault();		
			var data = {
				firstName: nameForm,
				email: emailForm,
				message: messageForm,
				background: background,
			};

			$.ajax({
				url: 'https://httpbin.org/post',
				type: 'POST',
				data: data,
			})
			.done(function(response) {
				$('#form-results').prepend($('<p>Thanks for submitting the form! This is the info you just sent:</p>'))
				$('#form-results ul').append($('<li>First Name: ' + response.form.firstName + '</li>'));
				$('#form-results ul').append($('<li>Email: ' + response.form.email + '</li>'));
				$('#form-results ul').append($('<li>Message: ' + response.form.message + '</li>'));
				$('#form-results ul').append($('<li>Background: ' + response.form.background + '</li>'));
				
				$('#index-form').css('display','none');
			});
		}	
	});

	$('#local-storage').click(function() {	
		localStorage.setItem("firstName", "Manuel");
		localStorage.setItem("lastName", "Bedacarratz");
		localStorage.setItem("courseName", "ICT-4510");

		var first = localStorage.getItem("firstName");
		var last = localStorage.getItem("lastName");
		var course = localStorage.getItem("courseName");
		var textLocalStorage = '('  + first + ' ' + last + '. Course: ' + course + ')';
		var span = $('<span>' + textLocalStorage + '</span>');
		$('#local-storage').after(span);
		$('#local-storage').css("display","none");
	});

}
