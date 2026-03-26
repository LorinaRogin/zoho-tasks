let fname = document.querySelector("#fname");
let fnameError = document.querySelector("#fnameError");

fname.addEventListener("keyup", function () {

    let firstName = fname.value;

    if (!isNaN(firstName) || firstName === "") {
        fnameError.textContent = "Invalid name";
    }
    else {
        fnameError.textContent = "";
    }

});
let lname = document.querySelector("#lname");
let lnameError = document.querySelector("#lnameError");
lname.addEventListener("keyup", function () {

    let lastName = lname.value;

    if (!isNaN(lastName) || lastName === "") {
        lnameError.textContent = "Invalid name";
    }
    else {
        lnameError.textContent = "";
    }

});
let email = document.querySelector("#email");
let emailError = document.querySelector("#emailError");
email.addEventListener("keyup", function () {
    let emailValue = email.value;
    if (!emailValue.includes("@") || !emailValue.includes(".")) {
        emailError.textContent = "Invalid email";
        email.style.border = "3px solid red";
    }
    else {
        emailError.textContent = "";
        email.style.border = "";
    }

}

);
let number = document.querySelector("#number");
let numberError = document.querySelector("#numberError");
number.addEventListener("keyup", function () {
    number.value = number.value.slice(0, 10);
    let numberValue = number.value;

    if (isNaN(numberValue)) {
        numberError.textContent = "Only numbers allowed!"
    }
    else {
        numberError.textContent = "";
    }
});
let form = document.querySelector("#validation-form");

form.addEventListener("submit", function (event) {

    if (
        fname.value === "" ||
        lname.value === "" ||
        !email.value.includes("@") ||
        !email.value.includes(".") ||
        isNaN(number.value) ||
        number.value.length !== 10
    ) {
        alert("Please fill the form correctly");
        event.preventDefault();
    }
    else {
        alert("Form submitted successfully!");
    }

});