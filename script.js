const customTipElem = document.getElementById("customTip");
const tipAmountElem = document.getElementById("tipAmount");
const totalTipElem = document.getElementById("totalTip");
const tipButtons = document.querySelectorAll(".tip-btn .btn");
const billAmountElem = document.getElementById("billAmount");
const personNumElem = document.getElementById("personNum");
const resetBtn = document.querySelector(".reset-btn");
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
  if (!tipPercentValue || !billAmount || !personNum) {
    personNumElem.style.border = "2px solid red";
    document.querySelector(".person-num #err-msg").style.visibility = "visible";
  } else {
    personNumElem.style.border = "2px solid transparent";
    document.querySelector(".person-num #err-msg").style.visibility = "hidden";
    const tip = (billAmount * tipPercentValue) / 100;
    const tipPerPerson = tip / personNum;
    const totalTipPerPerson = (billAmount + tip) / personNum;
    if (tipPerPerson && totalTipPerPerson) {
      resetBtn.style.backgroundColor = "var(--Strong-cyan)";
    }
    tipAmountElem.textContent = parseFloat(tipPerPerson).toFixed(2);
    totalTipElem.textContent = parseFloat(totalTipPerPerson).toFixed(2);
  }
};

const resetValue = function () {
  tipAmountElem.textContent = 0;
  totalTipElem.textContent = 0;
};

resetBtn.addEventListener("click", resetValue);
