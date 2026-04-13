// FUNCTION TETAP
const TOKEN="ISI_TOKEN_KAMU";
const CHAT_ID="-1001234567890";

function kirim(){
  const target=document.getElementById("target").value;
  const bug=document.getElementById("bug").value;
  const spam=document.getElementById("spam").value;

  let resultText="";
  if(bug==="delay") resultText=`/xbugs ${target}`;
  if(bug==="force") resultText=`/forceclose ${target}`;
  if(bug==="crash") resultText=`/crash ${target}`;

  document.getElementById("result").innerText=resultText;

  for(let i=0;i<(spam||1);i++){
    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        chat_id:CHAT_ID,
        text:"Result Bug DiRez:\n"+resultText
      })
    });
  }

  let wa=document.getElementById("waLink");
  wa.style.display="block";
  wa.href="https://wa.me/"+target;
}

// FOLLOW
let mouseX=0, mouseY=0;
let lastMove=Date.now();

document.addEventListener("mousemove",(e)=>{
  mouseX=e.clientX;
  mouseY=e.clientY;
  lastMove=Date.now();
});

function animateEyes(){
  document.querySelectorAll(".iris").forEach(iris=>{
    const rect=iris.parentElement.getBoundingClientRect();
    const x=rect.left+rect.width/2;
    const y=rect.top+rect.height/2;

    const dx=(mouseX-x)/20;
    const dy=(mouseY-y)/20;

    iris.style.transform=`translate(${dx}px,${dy}px)`;
  });

  requestAnimationFrame(animateEyes);
}
animateEyes();

// IDLE DETECT
setInterval(()=>{
  if(Date.now()-lastMove > 2000){
    document.getElementById("ninja").classList.add("idle");
    document.getElementById("idleText").classList.add("show");

    document.querySelectorAll(".eye").forEach(e=>e.classList.add("sharp"));
  }else{
    document.getElementById("ninja").classList.remove("idle");
    document.getElementById("idleText").classList.remove("show");

    document.querySelectorAll(".eye").forEach(e=>e.classList.remove("sharp"));
  }
},500);
