// ==UserScript==
// @name         Tab Close
// @version      3.0.0
// @description  Tab Close
// @author       Fumizo
// @include      http://*
// @include      https://*
// @run-at       document-end
// ==/UserScript==

var closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('id', 'TABCLOSE');
    closeButton.setAttribute('lang', 'ja');
    closeButton.innerHTML = "✕";

document.body.appendChild(closeButton);

const closeButtonCss = document.createElement('style');
closeButtonCss.textContent = `
#TABCLOSE {
  display: block !important;
  position: fixed !important;
  bottom: 2% !important;
  right: 2% !important;
  transform: translateX(-50%) !important;
  font-family: 'sans-serif' !important;
  font-size: 16px !important;
  font-weight: bold !important;
  font-style: normal !important;
  color: #fff !important;
  background: rgba(0, 0, 0, 0.5) !important;
  box-sizing: border-box !important;
  border: 1px solid #ccc !important;
  border-radius: 50% !important;
  width: 40px !important;
  height: 40px !important;
  line-height: 40px !important;
  margin: 0 !important;
  padding: 0 !important;
  outline: 0 !important;
  vertical-align: baseline !important;
  quotes: none !important;
  text-decoration: none !important;
  letter-spacing: normal !important;
  user-select: none !important;
  z-index: 9999999;
}
#TABCLOSE::before, #TABCLOSE::after {
  content: none !important;
}
`;

document.body.appendChild(closeButtonCss);

closeButton.addEventListener('click', () => {
  window.open('about:blank', '_self').close();
});


//ロングタップで非表示
var check_sec2 = 500; //ミリ秒

long_press2(closeButton,normal_func2,long_func2,check_sec2);

function normal_func2() {
  return;
}
function long_func2(){
  closeButton.remove()
}

function long_press2(el,nf,lf,sec) {
  let longclick = false;
  let longtap = false;
  let touch = false;
  let timer;
  el.addEventListener('touchstart',()=>{
    touch = true;
    longtap = false;
    timer = setTimeout(() => {
      longtap = true;
      lf();
    }, sec);
  })
  el.addEventListener('touchend',()=>{
    if(!longtap){
      clearTimeout(timer);
      nf();
    }else{
      touch = false;
    }
  })

  el.addEventListener('mousedown',()=>{
    if(touch) return;
    longclick = false;
    timer = setTimeout(() => {
      longclick = true;
      lf();
    }, sec);
  })
  el.addEventListener('click',()=>{
    if(touch){
      touch = false;
      return;
    }
    if(!longclick){
      clearTimeout(timer);
      nf();
    }
  });
}
