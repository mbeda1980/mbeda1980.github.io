//Collapse Education section
var education = document.querySelectorAll('#education .time-ref');
var edButton = document.querySelector('#education button');
var edVisible = true;

edButton.addEventListener('click', function(evt) {
	if (edVisible == true) {
		for (var i = 0; i < 3; i++) {
			education[i].classList.add('hidden');
		};
		edButton.textContent = '(Show)';
		edVisible = false;
	}
	else {
		for (var i = 0; i < 3; i++) {
			education[i].classList.remove('hidden');
		};
		edButton.textContent = '(Hide)';
		edVisible = true;	
	}
});

//Collapse Experience section
var experience = document.querySelectorAll('#experience .time-ref');
var exButton = document.querySelector('#experience button');
var exVisible = true;

exButton.addEventListener('click', function(evt) {
	if (exVisible == true) {
		for (var i = 0; i < 7; i++) {
			experience[i].classList.add('hidden');
		};
		exButton.textContent = '(Show)';
		exVisible = false;
	}
	else {
		for (var i = 0; i < 7; i++) {
			experience[i].classList.remove('hidden');
		};
		exButton.textContent = '(Hide)';
		exVisible = true;	
	}
});