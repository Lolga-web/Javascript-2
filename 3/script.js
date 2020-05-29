
let form = document.querySelector('form');
let name = form.name;
let email = form.email;
let phone = form.phone;

form.addEventListener('submit', (event) => {
	event.preventDefault();
	validateForm()?console.log('форма отправлена'):console.log('форма заполнена неверно');
});

function validateForm () {
	let checkName = validateName();
	let checkEmail = validateEmail();
	let checkPhone = validatePhone();
	(checkName)?name.classList.remove('red'):name.classList.add('red');
	(checkEmail)?email.classList.remove('red'):email.classList.add('red');
	(checkPhone)?phone.classList.remove('red'):phone.classList.add('red');
	if (checkName == true && checkEmail == true && checkPhone == true) return true;
	return false;
};

function validateName() {
	const trueName = /[a-za-яёЁ]{1,}$/i;
	console.log(`${trueName.test(name.value)} - ${name.value}`);
	return trueName.test(name.value);
};

function validateEmail() {
	const trueEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-_]+\.[a-zA-Zа-яА-Я]{2,5}$/u;
	console.log(`${trueEmail.test(email.value)} - ${email.value}`);
	return trueEmail.test(email.value);
};

function validatePhone() {
	const truePhone = /^(\+7)(\(\d{3}\))\d{3}-\d{4}$/;
	console.log(`${truePhone.test(phone.value)} - ${phone.value}`);
	return truePhone.test(phone.value);
};

