(function () {
	'use strict';

	window.onload = function () {
		if (document.readyState === 'complete') {
			init();
		}
	};

	/**
	 * init
	 */
	function init() {
		var form = document.querySelector('form');

		form.addEventListener('submit', onSubmit);
	}

	function onSubmit(e) {
		e.preventDefault();
		var emailField = document.querySelector('#email');
		var email      = emailField.value.trim();

		if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
			alert('Invalid email, please try again.');
			// re-focus on the email field
			emailField.focus();

			return;
		}

		// process email subscription
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/subscribe');
		xhr.setRequestHeader('content-type', 'application/json');
		xhr.onload = function (result) {
			var message = JSON.parse(result.target.response).message;
			if (message === 'ok') {
				var confirmText = document.querySelector('.confirm-text');

				confirmText.textContent = 'Thanks for registering! Please check your email to confirm subscription request.';
				emailField.value = '';
			}
		};
		xhr.send('{"email" : "' + email + '"}');
	}
 })();
