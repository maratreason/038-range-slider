/**
 * Range slider
 */
const rangeInput = document.querySelectorAll(".range-input .range-input__group input");
const priceInput = document.querySelectorAll(".price-input input");
const progress = document.querySelector(".slider .progress");
const minPrice = document.querySelector(".range-price__min");
const maxPrice = document.querySelector(".range-price__max");

const PRICE_GAP = 2000;
const MAX_GAP = 10000;

// range data
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < PRICE_GAP) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - PRICE_GAP;
        
      } else {
        rangeInput[1].value = minVal + PRICE_GAP;
        maxPrice.style.zIndex = 5;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";

      minPrice.style.left = parseInt(progress.style.left) - 10 + "%";
      minPrice.style.zIndex = 1;
      minPrice.textContent = minVal + " ₽";

      maxPrice.style.right = parseInt(progress.style.right) - 10 + "%";
      maxPrice.style.zIndex = 1;
      maxPrice.textContent = maxVal + " ₽";
    }

    if (e.target.classList.contains("range-min")) {
      minPrice.style.zIndex = 2;
      maxPrice.style.zIndex = 1;
    } if (e.target.classList.contains("range-max")) {
      minPrice.style.zIndex = 1;
      maxPrice.style.zIndex = 2;
    }
  });
});

// input field data
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(priceInput[0].value);
    let maxVal = parseInt(priceInput[1].value);

    if (maxVal - minVal >= PRICE_GAP && maxVal <= MAX_GAP) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minVal;
        progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxVal;
        progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
      }

      minPrice.textContent = minVal + " ₽";
      maxPrice.textContent = maxVal + " ₽";
    }
  });

  input.addEventListener("blur", (e) => {
    if (+e.target.value > MAX_GAP) {
      maxPrice.textContent = MAX_GAP + " ₽";
      priceInput[1].value = MAX_GAP;
    }

    if (+e.target.value < 0) {
      minPrice.textContent = 0 + " ₽";
      priceInput[0].value = 0;
    }
  });
});
