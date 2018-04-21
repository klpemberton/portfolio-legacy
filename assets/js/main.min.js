//********************************
// main.js - kristinepemberton.com
//********************************

// ES6 document.querySelector and document.querySelectorAll shorthands
let dqs = document.querySelector.bind(document),
	dqsa = document.querySelectorAll.bind(document);

// Define helper objects such as form validation rules
// ---------------------------------------------------
let helperObjects = {
	"formRules": {
		"name" : {
			"required" : "Oops, it looks like you need to enter your name.",
			"minimum"  : 2,
			"minlength": "Please enter at least 2 letters for your name."
		},
		"email" : {
			"regex"   : new RegExp(/^[a-zA-Z0-9\-\._]+[@][a-zA-Z0-9\-\._]+\.[a-zA-Z0-9\-\._]+$/),
			"required": "Oops, it looks like you need to enter your email address.",
			"format"  : "Oops, you haven't entered a valid email address. Please try again."
		},
		"message" : {
			"required" : "Please enter your message.",
			"minimum"  : 10,
			"minlength": "Please provide a few more details."
		}
	}
};

// Perform form field validation
// -----------------------------
function formFieldValidation(formField) {
	let el      = formField.getAttribute('id'),
		elType  = formField.getAttribute('type'),
		elValue = formField.value,
		isBlank = (formField.value === ""),
		isRequired = formField.classList.contains('required'),
		hasMinLength = (typeof helperObjects.formRules[el] !== "undefined" && helperObjects.formRules[el].minimum);

	if (typeof elType !== "undefined" && elType !== "hidden") { // ignore hidden fields

		// Reset errors, if any
		// --------------------
		dqs('#' + el).classList.remove('error');
		dqs('#' + el).removeAttribute('data-error');
		dqs('#' + el).nextElementSibling.innerHTML = '';
		dqs('#' + el).nextElementSibling.classList.remove('error');
		formField.classList.remove('error');

		// Regular Expression test
		// -----------------------
		if (!isBlank && (typeof helperObjects.formRules[el] !== "undefined") && (!(new RegExp(helperObjects.formRules[el].regex)).test(elValue))) {
			throwError(el, 'format');
		}

		// Required field test
		// -------------------
		if (isRequired) {
			if (isBlank) {
				throwError(el, 'required');
			} 
		}

		// Minimum length test
		// -------------------
		if (hasMinLength) {
			if (!isBlank && elValue.length < helperObjects.formRules[el].minimum) {
				throwError(el, 'minlength');
			}
		}

		// Is it still good?
		// -----------------
		if ((dqs('#' + el).nextElementSibling.innerHTML === '') && !isBlank) {
			dqs('#' + el).nextElementSibling.classList.add('ok');
			dqs('#' + el).classList.add('ok');
		}
	}
}

// Form validation error handling (display error messages)
// -------------------------------------------------------
function throwError(e, err) {
	let errorEl = dqs('#' + e).nextElementSibling;

	dqs('#' + e).setAttribute('data-error', 'error');
	dqs('#' + e).classList += ' error';
	errorEl.innerHTML = '<span/>' + helperObjects.formRules[e][err];
	errorEl.classList += ' error';
}

// Upon exiting a form field, run necessary validation
// ---------------------------------------------------
if (dqsa('input, textarea')) {
	let allInputs = dqsa('input, textarea');

	for (i = 0; i < allInputs.length; i++) {
		allInputs[i].addEventListener('blur', function() {
			let el = this;
			formFieldValidation(el);
		});
	}
}

// Process contact form on submit
// ------------------------------
function processForm() {
	let allInputs = dqsa('input, textarea'),
		name = dqs('#name').value,
		email = dqs('#email').value,
		message = dqs('#message').value,
		dataString,
		isValidForm = true;

	for (i = 0; i < allInputs.length; i++) {
		let el = allInputs[i];
		formFieldValidation(el);
	}

	if (dqsa('.error').length > 0) {
		isValidForm = false;
	}

	if (isValidForm) {
		message = encodeURIComponent(message.trim());
		dataString = 'name=' + name + '&email=' + email + '&message=' + message;
		dqs('#send').textContent = 'Sending...';

		fetch('processForm.php', {
			method: 'POST',
			headers: {
				"Content-type": "application/x-www-form-urlencoded"
			},
			body: dataString
		}).then((response) => {
			return response.text();
		}).then((text) => {
			dqs('#contact-form').style.display = 'none';
			dqs('aside').style.display = 'none';
			dqs('#contact-intro').innerHTML = text;
		}).catch((error) => {
			console.error('Message failed: ' + error);
		});
	} else {
		event.preventDefault();
	}
}

if (dqs('#send')) {
	dqs('#send').addEventListener('click', function(event) {
		event.preventDefault();
		processForm();
	});
}

// Image handling: display and controls
// ------------------------------------
if (dqs('.thumbnail')) {
	let thumbnails = dqsa('.thumbnail'),
		imgActions = dqsa('.img-controls a, .overlay-img img'),
		activeThumbnail,
		images,
		nextImage,
		previousImage;

	for (let i = 0; i < thumbnails.length; i++) {
		thumbnails[i].addEventListener('click', function() {
			activeThumbnail = this;
			let imgsrc = this.querySelector('img').getAttribute('src');
			this.className += ' current';
			dqs('.overlay').style.display = 'block';
			dqs('.overlay-img img.popup-img').setAttribute('src', imgsrc);
		});
	}

	for (let i = 0; i < imgActions.length; i++) {
		imgActions[i].addEventListener('click', function() {
			let imgAction = this.getAttribute('class');
			images = findImages();

			if (imgAction === 'next-img' || imgAction === 'popup-img') {
				navigateImages(images[0]);
			} else if (imgAction === 'prev-img') {
				navigateImages(images[1]);
			} else {
				dqs('.overlay').style.display = 'none';
			}
		});
	}
	// Allow arrow keys, escape key to navigate images
	// -----------------------------------------------
	if ( !dqs('.overlay').classList.contains('hidden') ) {
		dqs('html').addEventListener('keyup', function(event) {
			images = findImages();
			if ( event.keyCode == 39 ) {
				navigateImages(images[0]);
			} else if ( event.keyCode == 37 ) {
				navigateImages(images[1]);
			} else if ( event.keyCode == 27 ) {
				dqs('.overlay').style.display = 'none';
			}
		});
	}

	function findImages() {
		nextImage = activeThumbnail.nextElementSibling;
		previousImage = activeThumbnail.previousElementSibling;
		activeThumbnail.classList.remove('current');
		return [nextImage, previousImage];
	}

	function navigateImages(image) {
		if (image !== null) {
			if (image === nextImage) {
				nextImage.classList.add('current');
				activeThumbnail = nextImage;
			} else {
				previousImage.classList.add('current');
				activeThumbnail = previousImage;
			}
			dqs('.overlay-img img').setAttribute('src', activeThumbnail.querySelector('img').getAttribute('src'));
		} else {
			if (image === nextImage) {
				dqs('.thumbnail').classList.add('current');
			} else {
				thumbnails[thumbnails.length - 1].classList.add('current');
			}
			dqs('.overlay-img img').setAttribute('src', dqs('.current').querySelector('img').getAttribute('src'));
			activeThumbnail = dqs('.thumbnail.current');
		}
	}
}