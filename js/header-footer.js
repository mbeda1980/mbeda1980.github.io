/*****HEADER******
*****************/

// getting a handle of header
if (page == 'index' || page == 'contact') {
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
h1.textContent = "Ana Bedacarratz";
headerA.appendChild(h1);

//creating <h2> and appending it to <a>
var h2 = document.createElement('h2');
h2.textContent = "PhD Candidate at University of Denver";
headerA.appendChild(h2);

//creating nav & appending it to <header>
var nav = document.createElement('nav');
header.appendChild(nav);

//creating ul & appending it to <header>
var ul = document.createElement('ul');
nav.appendChild(ul);

//creating <li> & appending it to <ul>
var li1 = document.createElement('li');
ul.appendChild(li1);
var li1A = document.createElement('a');
li1A.setAttribute('href', 'index.html');
if (page == 'index') {
	li1A.classList.add('selected');
}
li1A.textContent = "About Me";
li1.appendChild(li1A);

//creating <li> & appending it to <ul>
var li2 = document.createElement('li');
ul.appendChild(li2);
var li2A = document.createElement('a');
li2A.setAttribute('href', 'resume.html');
if (page == 'resume') {
	li2A.classList.add('selected');
}
li2A.textContent = "Resume";
li2.appendChild(li2A);

//creating <li> & appending it to <ul>
var li3 = document.createElement('li');
ul.appendChild(li3);
var li3A = document.createElement('a');
li3A.setAttribute('href', 'contact.html');
if (page == 'contact') {
	li3A.classList.add('selected');
}
li3A.textContent = "Contact";
li3.appendChild(li3A);

/*****FOOTER******
*****************/
// getting a handle of footer
var footer = document.querySelector('body footer');

// creating <a> & appending it to <footer>
var footerA1 = document.createElement('a');
footerA1.setAttribute('href', 'http://www.linkedin.com/in/anadraghici');
footer.appendChild(footerA1);

// creating <img> & appending it to <a>
var imgLinkedin = document.createElement('img');
imgLinkedin.setAttribute('src', 'img/linkedin-wrap.jpg');
imgLinkedin.setAttribute('alt', 'linkedin logo');
imgLinkedin.classList.add('social-icon');
footerA1.appendChild(imgLinkedin);

// creating <p> & appending it to <footer>
var p = document.createElement('p');
p.textContent = '© 2015 Ana Bedacarratz.';
footer.appendChild(p);


