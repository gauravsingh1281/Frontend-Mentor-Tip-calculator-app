const customTipElem = document.getElementById("customTip");
const tipAmountElem = document.getElementById("tipAmount");
const totalTipElem = document.getElementById("totalTip");
const tipButtons = document.querySelectorAll(".tip-btn .btn");
const billAmountElem = document.getElementById("billAmount");
const personNumElem = document.getElementById("personNum");
const resetBtn = document.querySelector(".reset-btn");
resetBtn.disabled = true;
let customTipValue, billAmountValue, personNumValue, tipPercent;

tipButtons.forEach((tipBtn) => {
  tipBtn.addEventListener("click", function () {
    billAmountValue = Number(billAmountElem.value);
    personNumValue = personNumElem.value;
    // Remove active class from all buttons
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to the clicked button if it's not the custom tip
    if (this.getAttribute("id") !== "customTip") {
      this.classList.add("active");
    }
    tipPercent = Number(this.value);
    calculateTip(tipPercent, billAmountValue, personNumValue);
  });
});

// Custom tip input field logic
customTipElem.addEventListener("change", function () {
  customTipValue = Number(customTipElem.value);
  billAmountValue = Number(billAmountElem.value);
  personNumValue = personNumElem.value;

  // Remove active class from all buttons when custom tip is selected
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  calculateTip(customTipValue, billAmountValue, personNumValue);
});

const calculateTip = (tipPercentValue, billAmount, personNum) => {
  let isValid = true;

  // Tip Percentage Validation
  if (!tipPercentValue) {
    document.querySelector(".select-tip #err-msg").style.visibility = "visible";
    isValid = false;
  } else {
    document.querySelector(".select-tip #err-msg").style.visibility = "hidden";
  }

  // Bill Amount Validation
  if (!billAmount) {
    billAmountElem.style.border = "2px solid red";
    document.querySelector(".input-bill #err-msg").style.visibility = "visible";
    isValid = false;
  } else {
    billAmountElem.style.border = "2px solid transparent";
    document.querySelector(".input-bill #err-msg").style.visibility = "hidden";
  }

  // Person Number Validation
  if (!personNum) {
    personNumElem.style.border = "2px solid red";
    document.querySelector(".person-num #err-msg").style.visibility = "visible";
    isValid = false;
  } else {
    personNumElem.style.border = "2px solid transparent";
    document.querySelector(".person-num #err-msg").style.visibility = "hidden";
  }

  // If any validation fails, exit early
  if (!isValid) return;

  // Calculate Tips
  const tip = (billAmount * tipPercentValue) / 100;
  const tipPerPerson = tip / personNum;
  const totalTipPerPerson = (billAmount + tip) / personNum;

  if (tipPerPerson && totalTipPerPerson) {
    resetBtn.style.backgroundColor = "var(--Strong-cyan)";
    resetBtn.disabled = false;
  }

  tipAmountElem.textContent = tipPerPerson.toFixed(2);
  totalTipElem.textContent = totalTipPerPerson.toFixed(2);
};

// reset value to initial state
const resetValue = function () {
  tipAmountElem.textContent = 0;
  totalTipElem.textContent = 0;
  billAmountElem.value = 0;
  personNumElem.value = 0;
  customTipElem.value = "";
  resetBtn.style.backgroundColor = "var(--Dark-grayish-cyan)";
};

resetBtn.addEventListener("click", resetValue);
