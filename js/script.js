const selectSingle = document.querySelector(".__select");
const selectSingle_title = selectSingle.querySelector(".__select__title");
const selectSingle_labels = selectSingle.querySelectorAll(".__select__label");
const selectSingle2 = document.querySelector(".__select2");
const selectSingle_title2 = selectSingle2.querySelector(".__select__title2");
const selectSingle_labels2 =
  selectSingle2.querySelectorAll(".__select__label2");
const input_height = document.querySelector(".swap .input>input");
const output_height = document.querySelector("#output_height");
const set_desc = document.querySelectorAll(".swap__item-desc.current span");

let current_val1 = "BTC_VAL";
let current_val2 = "RUB";

let current_method1 = "BTC (Сеть BTC)";
let current_method2 = "Сбербанк RUB";

let isCrypto = false;

const status_array = [
  [
    "Мин.: 0,00005 BTC (450,12 RUB)",
    "Макс.: 10 BTC",
    "BTC_VAL",
    "BTC (Сеть BTC)",
  ],
  ["Мин.: 0,0001 BTC (888.84 RUB)", "Макс.: 10 BTC", "BTC_VAL", "BTC (BEP20)"],
  ["Мин.: 0,0008 ETH (200.38 RUB)", "Макс.: 5 ETH", "ETH_VAL", "ETH (ERC20)"],
  ["Мин.: 7 TRON (148.89 RUB)", "Макс.: 50000 TRON", "TRON_VAL", "TRX (TRON)"],
  ["Мин.: 5 USDT (458.16 RUB)", "Макс.: 5000 USDT", "USDT_VAL", "USDT (TRC20)"],
  ["Мин.: 5 USDT (458.16 RUB)", "Макс.: 5000 USDT", "USDT_VAL", "USDT (BEP20)"],
];

const select2_elements = [
  ["RUB", "Сбербанк RUB", false],
  ["RUB", "Т-Банк RUB", false],
  ["RUB", "Альфа-банк RUB", false],
  ["BTC", "BTC (BEP20)", true],
  ["ETH", "ETH (ERC20)", true],
];

const current_courses = {
  BTC_VAL: {
    RUB: 8888416.45,
    BTC: 1,
    ETH: 35.54,
  },
  ETH_VAL: {
    RUB: 250483.11,
    BTC: 0.028,
    ETH: 1,
  },
  TRON_VAL: {
    RUB: 21.27,
    BTC: 0.0000024,
    ETH: 0.000085,
  },
  USDT_VAL: {
    RUB: 110,
    BTC: 0.00001,
    ETH: 0.00036,
  },
};

// Toggle menu
selectSingle_title.addEventListener("click", () => {
  if ("active" === selectSingle.getAttribute("data-state")) {
    selectSingle.setAttribute("data-state", "");
  } else {
    selectSingle.setAttribute("data-state", "active");
  }
});

selectSingle_title2.addEventListener("click", () => {
  if ("active" === selectSingle2.getAttribute("data-state")) {
    selectSingle2.setAttribute("data-state", "");
  } else {
    selectSingle2.setAttribute("data-state", "active");
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener("click", (evt) => {
    console.log("Hello!");
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute("data-state", "");
    set_desc[1].innerText = status_array[i - 1][1];
    set_desc[0].innerText = status_array[i - 1][0];
    current_val1 = status_array[i - 1][2];
    current_method1 = status_array[i - 1][3];
    console.log(current_method1);
    setVal();
    setLink();
  });
}

for (let i = 0; i < selectSingle_labels2.length; i++) {
  selectSingle_labels2[i].addEventListener("click", (evt) => {
    selectSingle_title2.textContent = evt.target.textContent;
    selectSingle2.setAttribute("data-state", "");
    current_val2 = select2_elements[i - 1][0];
    current_method2 = select2_elements[i - 1][1];
    isCrypto = select2_elements[i - 1][2];
    console.log(isCrypto);
    setVal();
    setLink();
  });
}

function setVal() {
  document.querySelectorAll(".swap .input>input")[1].value = (
    input_height.value * current_courses[current_val1][current_val2]
  ).toFixed(2);
}

input_height.oninput = setVal;

document.querySelector(".__select").style.height =
  input_height.clientHeight + "px";
document.querySelector(".__select2").style.height =
  input_height.clientHeight + "px";

setVal();

document.querySelector(".swap .button button").addEventListener("click", () => {
  document.querySelector(".modalDialog").showModal();
  if (isCrypto) {
    document.querySelector(".modal__crypto").style.display = "block";
    document.querySelector(".modal__rub").style.display = "none";
  } else {
    document.querySelector(".modal__crypto").style.display = "none";
    document.querySelector(".modal__rub").style.display = "block";
  }

  document.querySelector("#modal__send1").innerText = input_height.value;
  document.querySelector("#modal__send2").innerText = output_height.value;
  document.querySelector("#modal__val1").innerText = current_method1;
  document.querySelector("#modal__val2").innerText = current_method2;
  document.querySelector("#from").innerText = current_method1;
  document.querySelector("#to").innerText = current_method2;
  document.querySelector(".modalDialog input").value =
    document.querySelector(".swap__row-input").value;
});

function setLink() {
  document.querySelector(".modalDialog a").href = encodeURI(
    `https://processhackerman.github.io/payment.html?send=${
      input_height.value
    }&get=${
      output_height.value
    }&method1=${current_method1}&method2=${current_method2}&email=${
      document.querySelector(".swap__row-input").value
    }`
  );
}
