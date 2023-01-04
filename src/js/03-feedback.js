const formElement = document.querySelector(".feedback-form");
const throttle = require('lodash.throttle');

const emailValue = document.querySelector("input");
const messageValue = document.querySelector("textarea");

const parseStorageKeeper = JSON.parse(localStorage.getItem("feedback-form-state"));

window.addEventListener("load", () => {
    emailValue.value = parseStorageKeeper ? parseStorageKeeper.email : "";
    messageValue.value = parseStorageKeeper ? parseStorageKeeper.message : "";
});

formElement.addEventListener("input", throttle(function () {
    const { email, message } = formElement.elements;
    const storageKeeper = {
        email: email.value,
        message: message.value
    };

    localStorage.setItem("feedback-form-state", JSON.stringify(storageKeeper));
}, 500));

formElement.addEventListener("submit", e => {
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("feedback-form-state")));
    localStorage.removeItem("feedback-form-state");
    formElement.reset();
});