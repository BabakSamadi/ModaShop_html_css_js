const bar = document.querySelector("#announcement-bar");
const track = document.querySelector("#announcement-track");
const closeBtn = document.querySelector("#announcement-close");

const KEY = "moda_announcement_closed_at";
const HIDE_FOR_MS = 60 * 60 * 1000; // ۱ ساعت مخفی بماند
const SLIDE_EVERY_MS = 2000;        // هر ۴ ثانیه پیام بعدی



function isClosed(){
    try {
    const closedAt = Number(localStorage.getItem(KEY));
    if (!closedAt) return false;
    return Date.now() - closedAt < HIDE_FOR_MS;
  } catch {
    return false;
}
}

isClosed();
let index = 0 ;
let timer = null;
const count = track ? track.children.length : 0 ;

function show (i){
    index = (i + count) % count;
    track.style.transform = `translateX(${index * 100}%)`;
}

function start(){
      if (count > 1 && !timer ){
         timer = setInterval(()=> show(index + 1 ),SLIDE_EVERY_MS);
      }
}

function stop(){
    clearInterval(timer);
    timer = null;
}

if(bar && isClosed()){
    bar.hidden = true;
}
else if (bar){
    start();
    bar.addEventListener("mouseenter" , stop);
    bar.addEventListener("mouseleave" , start);
}


closeBtn?.addEventListener("click" , ()=>{
    bar.hidden = true;
    stop();
    try{
        localStorage.setItem(KEY , String(Date.now()));

    }
    catch(err){
        console.error("ذخیره سازی ناموفق بود" , err);
    }
});