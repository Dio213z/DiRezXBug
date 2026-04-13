// Fire Dust (Embers) Animation
const canvas = document.getElementById('fire-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.baseColor = `255, ${Math.floor(Math.random() * 100 + 50)}, 0`;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.opacity -= 0.002;

    if (this.y < -10 || this.opacity <= 0) {
      this.reset();
    }
  }

  draw() {
    const color = `rgba(${this.baseColor}, ${this.opacity})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

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
