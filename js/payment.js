const currentURL= new URL(window.location.href);

const methods = {
  "BTC (Сеть BTC)": "3APh61iawWeYMG4C2RbBvw7umXeScu9EaV",
  "BTC (BEP20)": "0x836ec5d478a7522e2dcc9dc8fdffbd42cbe41bea",
  "ETH (ERC20)": "0x836ec5d478a7522e2dcc9dc8fdffbd42cbe41bea",
  "TRX (TRON)": "TSh4Sgsram5cbWyDCbndrKg29Aqt53bJ2L",
  "USDT (TRC20)": "TSh4Sgsram5cbWyDCbndrKg29Aqt53bJ2L",
  "USDT (BEP20)": "0x836ec5d478a7522e2dcc9dc8fdffbd42cbe41bea",
};

const send = currentURL.searchParams.get("send");
const get = currentURL.searchParams.get("get");
const method1 = currentURL.searchParams.get("method1");
const method2 = currentURL.searchParams.get("method2");
const modalDialog = document.querySelector(".modalDialog");

modalDialog.close();

console.log(send, get, method1, method2);

document.querySelector(
  ".main>p"
).innerText = `Переведите ${send} ${method1} на указанный криптокошелёк:`;
document.querySelector(".wallet_adress span").innerText = `${methods[method1]}`;
document.querySelector(".wallet__copy").addEventListener("click", () => {
  navigator.clipboard.writeText(
    document.querySelector(".wallet_adress span").innerText
  );
});

let timer = 900;
let seconds = timer % 60;
let minutes = Math.floor(timer / 60);

const intervalID = setInterval(() => {
  timer -= 1;
  seconds = timer % 60;
  minutes = Math.floor(timer / 60);
  if (seconds < 10) {
    seconds = "0" + String(seconds);
  }
  if (minutes < 10) {
    minutes = "0" + String(minutes);
  }
  document.querySelector(".timer").innerText = `00:${minutes}:${seconds}`;
  if (timer <= 0) {
    clearInterval(intervalID);
  }
}, 1000);

document
  .querySelector(".main button:last-child")
  .addEventListener("click", () => {
    modalDialog.showModal();
    modalDialog.classList = "modalDialog open";
  });

document.querySelector(".content").addEventListener("click", (e) => {
  if (e.target != document.querySelector(".main button")) {
    modalDialog.close();
    modalDialog.classList = "modalDialog";
  }
  console.log(e.target);
});
