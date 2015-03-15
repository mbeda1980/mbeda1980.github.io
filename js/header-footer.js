/*****HEADER******
*****************/

// getting a handle of header
if (page == 'index' || page == 'blog' || page == 'portfolio') {
	var header = document.querySelector('body header.blog-header');
}

else if (page == 'resume') {
	var header = document.querySelector('body header');
}

// creating <a> & appending it to <header>
var headerA = document.createElement('a');
headerA.setAttribute('id', 'logo');
headerA.setAttribute('href', 'index.html');
header.appendChild(headerA);

//creating <h1> and appending it to <a>
var h1 = document.createElement('h1');
h1.textContent = "Manuel Bedacarratz";
headerA.appendChild(h1);

//creating <h2> and appending it to <a>
var h2 = document.createElement('h2');
h2.textContent = "Web Entrepreneur & Photographer";
headerA.appendChild(h2);

//creating nav & appending it to <header>
var nav = document.createElement('nav');
header.appendChild(nav);

//creating ul & appending it to <nav>
var ul = document.createElement('ul');
nav.appendChild(ul);

//creating Welcome page on navigation
var li1 = document.createElement('li');
ul.appendChild(li1);
var li1A = document.createElement('a');
li1A.setAttribute('href', 'index.html');
if (page == 'index') {
	li1A.classList.add('selected');
}
li1A.textContent = "Welcome";
li1.appendChild(li1A);

//creating Resume page on navigation
var li2 = document.createElement('li');
ul.appendChild(li2);
var li2A = document.createElement('a');
li2A.setAttribute('href', 'resume.html');
if (page == 'resume') {
	li2A.classList.add('selected');
}
li2A.textContent = "Resume";
li2.appendChild(li2A);

//creating Blog page on navigation
var li3 = document.createElement('li');
ul.appendChild(li3);
var li3A = document.createElement('a');
li3A.setAttribute('href', 'blog.html');
if (page == 'blog') {
	li3A.classList.add('selected');
}
li3A.textContent = "Blog";
li3.appendChild(li3A);

//creating Portfolio page on navigation
var li4 = document.createElement('li');
ul.appendChild(li4);
var li4A = document.createElement('a');
li4A.setAttribute('href', 'portfolio.html');
if (page == 'portfolio') {
	li4A.classList.add('selected');
}
li4A.textContent = "Portfolio";
li4.appendChild(li4A);

/*****FOOTER******
*****************/
// getting a handle of footer
var footer = document.querySelector('body footer');

// creating <a> & appending it to <footer>
var footerA1 = document.createElement('a');
footerA1.setAttribute('href', 'http://twitter.com/MBedacarratz');
footer.appendChild(footerA1);

// creating <img> & appending it to <a>
var imgTwitter = document.createElement('img');
imgTwitter.setAttribute('src', 'img/twitter-wrap.png');
imgTwitter.setAttribute('alt', 'twitter logo');
imgTwitter.classList.add('social-icon');
footerA1.appendChild(imgTwitter);

// creating <a> & appending it to <footer>
var footerA2 = document.createElement('a');
footerA2.setAttribute('href', 'http://facebook.com/manuelbedacarratz');
footer.appendChild(footerA2);

// creating <img> & appending it to <a>
var imgFacebook = document.createElement('img');
imgFacebook.setAttribute('src', 'img/facebook-wrap.png');
imgFacebook.setAttribute('alt', 'facebook logo');
imgFacebook.classList.add('social-icon');
footerA2.appendChild(imgFacebook);

// Appending IP address to <footer>
$.ajax({
	url: 'https://httpbin.org/ip',
	type: 'GET',
	success: function(response) {
		var ip = response.origin;
		var p = document.createElement('p');
		p.textContent = 'Your IP: ' + ip;
		footer.appendChild(p);
	},
	error: function() {
		alert("IP request didn't work");
		var p = document.createElement('p');
		p.textContent = '© Manuel Bedacarratz';
		footer.appendChild(p);	
	}
});




