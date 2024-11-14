let balance = document.querySelector('#balance span');
let level = document.querySelector('#level span');
let video = document.getElementById('video-tap');
let popup_div = document.getElementById('popup');
let available = document.querySelector('#available span');
let income = document.querySelector('.header__row-item span');
let completed = document.querySelector('.completed');
let need = document.getElementById('need');
let video_bg = document.querySelector('.video-bg');
let need_num = 0;
let completed_width = 0;
let available_left;

let levels = {
    1: 500,
    2: 1000,
    3: 1500,
    4: 3000,
    5: 4000,
    6: 6500,
}


level.innerText = 1;
available_left = levels[level.innerText];
updateBalance(available_left);
setInterval(plusAvailable, 4000);
income = 0;

video.addEventListener('click', tap.bind(event));


function tap(e) {
    if (available_left >= 0){
        balance.innerText = Number(balance.innerText) + 1;
        popup = document.createElement('div');
        popup.innerText = '+1';
        mouseX = e.clientX;
        mouseY = e.clientY;
        popup.style = `top: ${mouseY + -50 + 'px'}; left: ${mouseX + 'px'}`;
        popup.className = 'popup_class';
        popup_div.appendChild(popup);
        setTimeout(deletePopup, 700);
        updateBalance(available_left);
        available_left -= 1;
        completed_width += 1;
        updateScale(completed_width);
    }
    
}

function deletePopup(){
    popup_div.removeChild(popup_div.firstElementChild)
}

function updateBalance(available_left) {
    available.innerText = `${available_left}/${levels[level.innerText]}`
}

function plusAvailable(){
    if(available_left < levels[level.innerText]) {
        available_left += 1;
        updateBalance(available_left);
    }
}

function updateScale(x){
    let y = (100*x)/1000;
    console.log(y);
    completed.style.width = y + '%';
    need_num += 1;
    if (need_num <=1000){
        need.innerText = `${need_num}/1000`;
    }

}
