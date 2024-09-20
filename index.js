// Wait for the DOM to be fully loaded before running our script
document.addEventListener('DOMContentLoaded', function() {
	// Get all the form elements we need
	const form = document.getElementById('registrationForm');
	const fullName = document.getElementById('fullName');
	const email = document.getElementById('email');
	const phone = document.getElementById('phone');
	const password = document.getElementById('password');
	const confirmPassword = document.getElementById('confirmPassword');

	// Add event listeners for real-time validation
	// This will check each field as the user types
	fullName.addEventListener('input', validateFullName);
	email.addEventListener('input', validateEmail);
	phone.addEventListener('input', validatePhone);
	password.addEventListener('input', validatePassword);
	confirmPassword.addEventListener('input', validateConfirmPassword);

	// Add submit event listener to the form
	form.addEventListener('submit', function(event) {
		// Prevent the form from submitting normally
		event.preventDefault();

		// Only submit if all validations pass
		if (validateForm()) {
			alert('Yay! Form submitted successfully!');
			form.reset(); // Clear the form
		}
	});

	// Function to run all validations
	function validateForm() {
		// Run all validations and return true only if all pass
		return (
			validateFullName() &&
			validateEmail() &&
			validatePhone() &&
			validatePassword() &&
			validateConfirmPassword()
		);
	}

	// Validate the full name
	function validateFullName() {
		const value = fullName.value.trim(); // Remove any extra spaces
		const errorElement = document.getElementById('fullNameError');

		// Check if name is at least 5 characters long
		if (value.length < 5) {
			showError(fullName, errorElement, 'Name must be at least 5 characters long');
			return false;
		}
		clearError(fullName, errorElement);
		return true;
	}

	// Validate the email
	function validateEmail() {
		const value = email.value.trim();
		const errorElement = document.getElementById('emailError');

		// Super simple email validation, just checking for @
		if (!value.includes('@')) {
			showError(email, errorElement, 'Please enter a valid email address');
			return false;
		}
		clearError(email, errorElement);
		return true;
	}

	// Validate the phone number
	function validatePhone() {
		const value = phone.value.trim();
		const errorElement = document.getElementById('phoneError');

		// Check if it's not 123456789, is 10 digits, and contains only numbers
		if (value === '123456789' || value.length !== 10 || !/^\d+$/.test(value)) {
			showError(phone, errorElement, 'Please enter a valid 10-digit phone number');
			return false;
		}
		clearError(phone, errorElement);
		return true;
	}

	// Validate the password
	function validatePassword() {
		const value = password.value;
		const errorElement = document.getElementById('passwordError');

		// Check password requirements
		if (value.toLowerCase() === 'password' ||
			value.toLowerCase() === fullName.value.toLowerCase() ||
			value.length < 8) {
			showError(password, errorElement, 'Password must be at least 8 characters and not be "password" or your name');
			return false;
		}
		clearError(password, errorElement);
		return true;
	}

	// Validate the confirm password field
	function validateConfirmPassword() {
		const errorElement = document.getElementById('confirmPasswordError');

		// Check if passwords match
		if (confirmPassword.value !== password.value) {
			showError(confirmPassword, errorElement, 'Passwords do not match');
			return false;
		}
		clearError(confirmPassword, errorElement);
		return true;
	}

	// Helper function to show error messages
	function showError(inputElement, errorElement, errorMessage) {
		inputElement.classList.add('is-invalid');
		errorElement.textContent = errorMessage;
		errorElement.style.display = 'block';
	}

	// Helper function to clear error messages
	function clearError(inputElement, errorElement) {
		inputElement.classList.remove('is-invalid');
		errorElement.textContent = '';
		errorElement.style.display = 'none';
	}
});
