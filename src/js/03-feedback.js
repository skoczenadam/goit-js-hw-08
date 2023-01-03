const formElement = document.querySelector(".feedback-form");
const throttle = require('lodash.throttle');

const emailValue = document.querySelector("input");
const messageValue = document.querySelector("textarea");

const parseStorageKeeper = JSON.parse(localStorage.getItem("feedback-form-state"));

window.addEventListener("load", () => {
    emailValue.value = parseStorageKeeper ? parseStorageKeeper.email : "";
    messageValue.value = parseStorageKeeper ? parseStorageKeeper.message : "";
});

formElement.addEventListener("input", throttle(function() {
    const storageKeeper = {
        email: formElement[0].value,
        message: formElement[1].value
    };

    localStorage.setItem("feedback-form-state", JSON.stringify(storageKeeper));
}, 500));

formElement.addEventListener("submit", e => {
    e.preventDefault();
    localStorage.removeItem("feedback-form-state");
    console.log(`Email: ${emailValue.value}`);
    console.log(`Message: ${messageValue.value}`);
    formElement.reset();
});