const CONFIG = {
  password: "1234",          // غيّر كلمة السر هنا
  startDate: "2025-08-14T00:00:00",
  name: "جاهز؟",
  audioFile: ""              // ضع اسم ملف mp3 هنا مثل: "song.mp3"
};

const $ = (s) => document.querySelector(s);
const lockScreen = $("#lockScreen");
const homeScreen = $("#homeScreen");
const messageScreen = $("#messageScreen");
const password = $("#password");
const unlockBtn = $("#unlockBtn");
const messageBtn = $("#messageBtn");
const backBtn = $("#backBtn");
const nextMessage = $("#nextMessage");
const audio = $("#audio");
const playBtn = $("#playBtn");
const playBtn2 = $("#playBtn2");
const trackStatus = $("#trackStatus");

$("#lockName").textContent = CONFIG.name;

function show(screen){
  [lockScreen,homeScreen,messageScreen].forEach(x => x.classList.remove("active"));
  screen.classList.add("active");
  window.scrollTo({top:0,behavior:"instant"});
}

function unlock(){
  if(password.value === CONFIG.password){
    show(homeScreen);
    burstHearts(18);
  }else{
    password.animate([
      {transform:"translateX(0)"},{transform:"translateX(-8px)"},
      {transform:"translateX(8px)"},{transform:"translateX(0)"}
    ],{duration:260});
    password.focus();
    $("#passwordHint").textContent = "كلمة السر مش صحيحة ♡";
  }
}
unlockBtn.addEventListener("click",unlock);
password.addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});
messageBtn.addEventListener("click",()=>{show(messageScreen);burstHearts(14)});
backBtn.addEventListener("click",()=>show(homeScreen));

const messages = [
  "من أول يوم دخلت فيه حياتي وأنا حاسس إن في حاجة مختلفة. يمكن الكلام ده بسيط، بس كل لحظة معاك بتفضل عندي أغلى من أي حاجة.",
  "شكراً على كل ضحكة، كل كلمة، وكل ذكرى حلوة جمعتنا. ولسه عندي كلام كتير نفسي أقولهولك... بس الأهم إنك تعرف إنك غالي عندي أوي. ♥",
  "ومهما عدّى وقت، نفسي أفضل أضيف صور وذكريات جديدة لحكايتنا. دي مش النهاية... دي البداية بس. ♡"
];
let mi=0;
nextMessage.addEventListener("click",()=>{
  mi=(mi+1)%messages.length;
  $("#letterText").animate([{opacity:0},{opacity:1}],{duration:350});
  $("#letterText").innerHTML=messages[mi];
  burstHearts(8);
});

function updateCounter(){
  const start = new Date(CONFIG.startDate).getTime();
  let diff = Math.max(0,Date.now()-start);
  const d=Math.floor(diff/86400000); diff%=86400000;
  const h=Math.floor(diff/3600000); diff%=3600000;
  const m=Math.floor(diff/60000); diff%=60000;
  const s=Math.floor(diff/1000);
  $("#days").textContent=String(d).padStart(2,"0");
  $("#hours").textContent=String(h).padStart(2,"0");
  $("#minutes").textContent=String(m).padStart(2,"0");
  $("#seconds").textContent=String(s).padStart(2,"0");
}
updateCounter(); setInterval(updateCounter,1000);

function setupAudio(){
  if(CONFIG.audioFile){
    audio.src=CONFIG.audioFile;
    audio.volume=.7;
  }else{
    trackStatus.textContent="أضف ملف الأغنية في CONFIG.audioFile";
  }
}
setupAudio();

function toggleAudio(){
  if(!CONFIG.audioFile){
    trackStatus.textContent="ضع اسم ملف mp3 داخل script.js";
    return;
  }
  if(audio.paused){audio.play();setPlaying(true)}
  else{audio.pause();setPlaying(false)}
}
function setPlaying(on){
  playBtn.textContent=on?"❚❚":"▶";
  playBtn2.textContent=on?"❚❚":"▶";
  trackStatus.textContent=on?"يتم التشغيل ♡":"متوقف";
}
playBtn.addEventListener("click",toggleAudio);
playBtn2.addEventListener("click",toggleAudio);
audio.addEventListener("ended",()=>setPlaying(false));
$("#volume").addEventListener("input",e=>audio.volume=e.target.value);

function heart(){
  const el=document.createElement("span");
  el.className="fheart";
  el.textContent=["♥","♡","❤","💕"][Math.floor(Math.random()*4)];
  el.style.left=Math.random()*100+"%";
  el.style.setProperty("--s",(9+Math.random()*15)+"px");
  el.style.animationDuration=(5+Math.random()*6)+"s";
  $("#hearts").appendChild(el);
  setTimeout(()=>el.remove(),12000);
}
function burstHearts(n=10){
  for(let i=0;i<n;i++) setTimeout(heart,i*80);
}
setInterval(()=>{ if(Math.random()>.15) heart(); },900);
burstHearts(7);
