"use strict";

// UI elements
const bill = document.querySelector(".bill");
const labelSelectTip = document.querySelectorAll(".btn");
const customTip = document.querySelector(".tip-6");
const persons = document.querySelector(".select-persons");
const billError = document.querySelector(".bill-error");
const personError = document.querySelector(".person-error");
const tipAmount = document.querySelector(".tip-amount");
const totalAmount = document.querySelector(".total-amount");
const btnReset = document.querySelector(".btn-reset");

// init
function init() {
  // clear input fields
  bill.value = persons.value = customTip.value = "";

  // zero tips
  tipAmount.textContent = totalAmount.textContent = "$0.00";
}
init();

// showError when inputs is empty or zero
function showError(message, type) {
  message.textContent = "Can't be zero";
  type.classList.add("error");

  // disapear the message after 3 sec
  setTimeout(function disApear() {
    message.textContent = "";
    type.classList.remove("error");
  }, 1000);
}

// remove background color
function removeBackground() {
  labelSelectTip.forEach((btn) => btn.classList.remove("add"));
}

// calcTip
function calcTip(tipType) {
  // convert bill and person amount string into number
  const billNum = Number(bill.value);
  const personsNum = Number(persons.value);

  // check: if bill input is empty warn it
  if (bill.value === "" || billNum <= 0) {
    showError(billError, bill);
  }

  if (persons.value === "" || personsNum <= 0) {
    showError(personError, persons);
  }

  if (
    bill.value !== "" &&
    billNum >= 0 &&
    persons.value !== "" &&
    personsNum >= 0
  ) {
    // calculate the %
    const percent = (billNum / 100) * Number(tipType.value);

    // calculate per person tip
    const perPerson = percent / personsNum;

    // calculate per person bill
    const perPersonBill = (billNum + percent) / personsNum;

    tipAmount.innerHTML = `$${perPerson.toFixed(2)}`;
    totalAmount.innerHTML = `$${perPersonBill.toFixed(2)}`;
  }
}

// event for select tip
labelSelectTip.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    // remove background color
    removeBackground();

    // add background color
    // btn.classList.add("add");
    this.classList.add("add");

    // calctip
    calcTip(btn);
  })
);

// event for custom tip
document.querySelector("form").addEventListener("submit", function (e) {
  // prevent default reload
  e.preventDefault();

  // calcTip
  calcTip(customTip);
});

// event for reset
btnReset.addEventListener("click", init);

// remove btn background color if click outside
document.addEventListener("click", function (e) {
  // if click outside remove background
  if (!e.target.classList.contains("btn")) {
    // remove background
    removeBackground();
  }
});
