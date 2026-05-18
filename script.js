const colors = ['#f4a0b8', '#e08099', '#c0392b', '#ff6b9d', '#ffb3c6', '#ff8fab'];
const player = document.getElementById('player');
let playing = false;

document.querySelectorAll('.reveal').forEach(el => {
  el.classList.remove('show');
});

// ===== ดอกไม้ร่วง =====
for (let i = 0; i < 30; i++) {
  const d = document.createElement('div');
  d.className = 'petal';
  d.style.left = Math.random() * 100 + '%';
  d.style.animationDuration = (3 + Math.random() * 4) + 's';
  d.style.animationDelay = (Math.random() * 6) + 's';
  d.style.background = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById('page').appendChild(d);
}

// ===== รูปภาพ =====
const grid = document.getElementById('photo-grid');
const images = ['รูป1.png', 'รูป2.png', 'รูป3.png'];
for (let i = 0; i < 3; i++) {
  const frame = document.createElement('div');
  frame.className = 'photo-frame';
  frame.innerHTML = `<img src="${images[i]}" alt="รูปที่ ${i + 1}">`;
  grid.appendChild(frame);
}

// ===== เพลง =====
function playMusic() {
  if (playing) {
    player.pause();
    playing = false;
    document.getElementById('disc').style.animationPlayState = 'paused';
  } else {
    player.play();
    playing = true;
    document.getElementById('disc').style.animationPlayState = 'running';
  }
}

// ===== แมว =====
(function () {
  // ---- เปลี่ยนตรงนี้: true = ใช้รูป, false = ใช้การ์ตูน SVG ----
  const USE_IMAGE = true;
  const CAT_IMAGE = 'cat.png'; // ชื่อไฟล์รูปแมว
  // -----------------------------------------------------------

  const catSVG = `
  <svg id="cat-svg" width="110" height="130" viewBox="0 0 110 130" xmlns="http://www.w3.org/2000/svg" style="display:block">
    <path id="tail" d="M55 118 Q20 110 18 90 Q16 75 30 72" fill="none" stroke="#333" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="55" cy="100" rx="32" ry="28" fill="#f0f0f0" stroke="#333" stroke-width="2"/>
    <ellipse cx="42" cy="95" rx="9" ry="11" fill="#333"/>
    <ellipse cx="68" cy="105" rx="7" ry="8" fill="#555"/>
    <ellipse cx="55" cy="62" rx="30" ry="27" fill="#f0f0f0" stroke="#333" stroke-width="2"/>
    <polygon points="28,44 22,22 42,36" fill="#f0f0f0" stroke="#333" stroke-width="2" stroke-linejoin="round"/>
    <polygon points="30,42 26,28 40,37" fill="#ffb3c6"/>
    <polygon points="82,44 88,22 68,36" fill="#f0f0f0" stroke="#333" stroke-width="2" stroke-linejoin="round"/>
    <polygon points="80,42 84,28 70,37" fill="#ffb3c6"/>
    <ellipse cx="44" cy="55" rx="10" ry="9" fill="#333"/>
    <ellipse id="eye-l" cx="43" cy="57" rx="5" ry="6" fill="white"/>
    <circle id="pupil-l" cx="43" cy="58" r="3" fill="#111"/>
    <circle cx="44" cy="56" r="1.2" fill="white"/>
    <ellipse id="eye-r" cx="67" cy="57" rx="5" ry="6" fill="white"/>
    <circle id="pupil-r" cx="67" cy="58" r="3" fill="#111"/>
    <circle cx="68" cy="56" r="1.2" fill="white"/>
    <polygon points="55,67 52,71 58,71" fill="#e08099"/>
    <path id="mouth" d="M52,71 Q55,75 58,71" fill="none" stroke="#555" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="25" y1="66" x2="46" y2="68" stroke="#999" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="25" y1="70" x2="46" y2="70" stroke="#999" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="64" y1="68" x2="85" y2="66" stroke="#999" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="64" y1="70" x2="85" y2="70" stroke="#999" stroke-width="1.2" stroke-linecap="round"/>
    <rect x="35" y="122" width="14" height="10" rx="5" fill="#f0f0f0" stroke="#333" stroke-width="1.5"/>
    <rect x="61" y="122" width="14" height="10" rx="5" fill="#f0f0f0" stroke="#333" stroke-width="1.5"/>
  </svg>`;

  const isMobile = window.innerWidth <= 768;
const catSize = isMobile ? '110px' : '150px';
  const catIMG = `<img src="${CAT_IMAGE}" alt="แมว" style="width:${catSize};height:${catSize};object-fit:contain;display:block">`;

  // สร้าง scene
  const scene = document.createElement('div');
  scene.id = 'cat-scene';
  
  scene.style.cssText = `
  position: absolute  ;            /* กลับมาใช้ fixed เพื่อให้เกาะจอล่าง */
  bottom: -10px;             /* 🌟 ตอนแรกซ่อนตัวให้จมลงไปใต้จอก่อน (ปรับตัวเลขตามขนาดรูปแมว) */
  left: 0;
  width: 100%;
  height: 100px;
  background: transparent;
  border: none;
  margin: 0;
  z-index: 999;
  overflow: visible;
  pointer-events: auto;

  /* 🌟 ใส่ CSS Animation ตรงนี้เพื่อให้มันค่อยๆ สไลด์ขึ้นมาจากใต้จอ */
  animation: slideUpCat 1.5s ease-out forwards;
  animation-delay: 2s;        /* ⏳ หน่วงเวลา 2 วินาทีค่อยโผล่มา */
`;

  

  const hint = document.createElement('div');
  hint.style.cssText = 'position:absolute;bottom:0px;width:100%;text-align:center;font-size:10px;color:#c07090;pointer-events:none;font-family:\'Lato\',sans-serif;z-index= 0';
  
  scene.appendChild(hint);

  const speech = document.createElement('div');
  speech.style.cssText = `
    position:absolute;background:#fff;border:2px solid #e08099;
    border-radius:14px;padding:5px 12px;font-size:14px;
    font-weight:500;color:#8b1a35;white-space:nowrap;
    display:none;pointer-events:none;
    font-family:'Playfair Display',serif;font-style:italic;
  `;
  scene.appendChild(speech);

  const toy = document.createElement('div');
  toy.style.cssText = 'position:absolute;font-size:24px;display:none;pointer-events:none';
  scene.appendChild(toy);

  const catWrap = document.createElement('div');
  // เปลี่ยนตรง bottom: 44px; ให้กลายเป็นชิดขอบล่างสุดจริงๆ
catWrap.style.cssText = 'position:absolute; bottom:0px; left:50%; transform:translateX(-50%); cursor:pointer; pointer-events:auto; z-index:998';
  catWrap.innerHTML = USE_IMAGE ? catIMG : catSVG;
  scene.appendChild(catWrap);

  const fromTag = document.querySelector('.from-tag');
  document.body.appendChild(scene);

  // SVG elements (null ถ้าใช้รูป)
  const mouthEl = scene.querySelector('#mouth');
  const eyeL    = scene.querySelector('#eye-l');
  const eyeR    = scene.querySelector('#eye-r');
  const pupilL  = scene.querySelector('#pupil-l');
  const pupilR  = scene.querySelector('#pupil-r');
  const tailEl  = scene.querySelector('#tail');

  const meows = ['เหมียวว~ 😺', 'เมี้ยว!', 'ปวร์~', 'เหมียว เหมียว!', 'เมี้ยวๆ 😸', 'หิวแล้วว~', 'เล่นด้วย!','โบร์'];
  const toys   = ['🐠', '🐭', '🧶', '🍗', '🐦'];
  const faces  = {
    normal:    { mouth: 'M52,71 Q55,75 58,71', ry: 6, pr: 3 },
    happy:     { mouth: 'M50,70 Q55,77 60,70', ry: 4, pr: 3 },
    surprised: { mouth: 'M53,71 Q55,76 57,71', ry: 8, pr: 4 },
    sleepy:    { mouth: 'M52,72 Q55,74 58,72', ry: 3, pr: 2 },
    excited:   { mouth: 'M50,69 Q55,78 60,69', ry: 7, pr: 4 },
  };

  let catX = 0, targetX = 0;
  let isJumping = false, isSpeaking = false;
  let toyX = 0, toyY = 0, toyVX = 0, toyVY = 0, toyActive = false;

  function setFace(name) {
    if (!mouthEl) return; // ใช้รูปจริง ไม่มี SVG elements
    const f = faces[name] || faces.normal;
    mouthEl.setAttribute('d', f.mouth);
    eyeL.setAttribute('ry', f.ry); eyeR.setAttribute('ry', f.ry);
    pupilL.setAttribute('r', f.pr); pupilR.setAttribute('r', f.pr);
  }

  function showSpeech(text) {
    if (isSpeaking) return;
    isSpeaking = true;
    speech.textContent = text;
    speech.style.display = 'block';
    const cx = scene.offsetWidth / 2 + catX;
    speech.style.left = Math.max(4, cx - 60) + 'px';
    speech.style.top = (scene.offsetHeight - 150) + 'px';
    setTimeout(() => { speech.style.display = 'none'; isSpeaking = false; }, 1800);
  }

  function jump() {
    if (isJumping) return;
    isJumping = true;
    let h = 0, dir = -1, speed = 10;
    const iv = setInterval(() => {
      h += dir * speed; speed -= 1.2;
      catWrap.style.bottom = (0 - h) + 'px';
      if (speed <= 0) dir = 1;
      if (h <= 0 && dir === 1) {
        clearInterval(iv);
        catWrap.style.bottom = '0px';
        isJumping = false;
        setTimeout(() => setFace('normal'), 600);
      }
    }, 20);
  }

  function meowSound() {
    try {
      const ac = new AudioContext();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.frequency.setValueAtTime(600, ac.currentTime);
      osc.frequency.linearRampToValueAtTime(380, ac.currentTime + 0.18);
      gain.gain.setValueAtTime(0.12, ac.currentTime);
      gain.gain.linearRampToValueAtTime(0, ac.currentTime + 0.22);
      osc.start(); osc.stop(ac.currentTime + 0.22);
    } catch (e) {}
  }

  function throwToy(tx, ty) {
    toy.textContent = toys[Math.floor(Math.random() * toys.length)];
    toy.style.display = 'block';
    toyX = tx; toyY = ty;
    toyVX = (Math.random() - 0.5) * 3;
    toyVY = -15;
    toyActive = true;
    setFace('excited');
    targetX = tx - scene.offsetWidth / 2;
  }

  function spawnPaw(x, y) {
    const p = document.createElement('div');
    p.style.cssText = `position:absolute;font-size:16px;left:${x}px;top:${y}px;pointer-events:none;animation:pawfade 0.6s ease forwards`;
    p.textContent = '🐾';
    scene.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }

  if (!document.getElementById('cat-style')) {
    const s = document.createElement('style');
    s.id = 'cat-style';
    s.textContent = '@keyframes pawfade{0%{opacity:1;transform:scale(1.2)}100%{opacity:0;transform:scale(0.8) translateY(-20px)}}';
    document.head.appendChild(s);
  }

  function loop() {
    // toy physics
    if (toyActive) {
      toyVY += 1.2; toyX += toyVX; toyY += toyVY;
      const floorY = scene.offsetHeight - 70;
      if (toyY >= floorY) {
        toyY = floorY; toyVY *= -0.4; toyVX *= 0.8;
        if (Math.abs(toyVY) < 2) {
          toyActive = false;
          setTimeout(() => { toy.style.display = 'none'; setFace('normal'); }, 1200);
        }
      }
      toy.style.left = toyX + 'px';
      toy.style.top  = toyY + 'px';
    }

    // cat movement
    const maxX = scene.offsetWidth / 2 - 65;
    catX += (targetX - catX) * 0.07;
    catX = Math.max(-maxX, Math.min(maxX, catX));
    catWrap.style.left = (scene.offsetWidth / 2 + catX) + 'px';
    catWrap.style.transform = catX > 3
      ? 'translateX(-50%) scaleX(1)'
      : catX < -3
        ? 'translateX(-50%) scaleX(-1)'
        : 'translateX(-50%)';

    // หาง (เฉพาะ SVG)
    if (tailEl) {
      const t = catX * 0.3;
      tailEl.setAttribute('d', `M55 118 Q${20 + t} 110 ${18 + t * 0.5} 90 Q${16 + t * 0.3} 75 30 72`);
    }

    // วิ่งสุ่มเอง
    if (!toyActive && Math.random() < 0.002) {
      targetX = (Math.random() - 0.5) * (scene.offsetWidth - 130);
    }

    requestAnimationFrame(loop);
  }
  loop();

  catWrap.addEventListener('click', e => {
    e.stopPropagation();
    const faceList = ['happy', 'surprised', 'sleepy', 'excited'];
    setFace(faceList[Math.floor(Math.random() * faceList.length)]);
    showSpeech(meows[Math.floor(Math.random() * meows.length)]);
    jump();
    meowSound();
    const r = scene.getBoundingClientRect();
    spawnPaw(e.clientX - r.left, e.clientY - r.top);
  });

  scene.addEventListener('click', e => {
    if (catWrap.contains(e.target)) return;
    const r = scene.getBoundingClientRect();
    throwToy(e.clientX - r.left, e.clientY - r.top);
    spawnPaw(e.clientX - r.left, e.clientY - r.top);
  });
})();

// ===== พลุ =====
const canvas = document.getElementById('fw-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function launchFireworks() {
  for (let b = 0; b < 8; b++) {
    setTimeout(() => {
      const x = 100 + Math.random() * (window.innerWidth - 200);
      const y = 80 + Math.random() * (window.innerHeight * 0.5);
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 3 + Math.random() * 4
        });
      }
    }, b * 200);
  }
  requestAnimationFrame(animateFW);
}

function animateFW() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.alpha > 0.02);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.alpha *= 0.96;
    ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill(); ctx.restore();
  });
  if (particles.length > 0) requestAnimationFrame(animateFW);
  else ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function openLetter() {
  const intro = document.getElementById('intro');
  intro.style.opacity = '0';
  intro.style.pointerEvents = 'none';

  setTimeout(() => {
    intro.remove();
    player.play().catch(() => {});
    playing = true;

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('show');
      }, i * 500);
    });

    // ← เริ่มนับหลังเปิดซอง
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);

  }, 1000);
}
function toggleMessage(title) {
  const text = title.nextElementSibling;
  const arrow = title.querySelector('.arrow');
  if (text.style.display === 'none') {
    text.style.display = 'block';
    text.style.animation = 'fadeUp 0.6s ease forwards';
    arrow.textContent = '▲';

    const slider = document.querySelector('.photo-slider');
    if (slider) slider.classList.add('show');

    // ← เพิ่มบรรทัดนี้
    const sliderLeft = document.querySelector('.photo-slider-left');
    if (sliderLeft) sliderLeft.classList.add('show');

  } else {
    text.style.display = 'none';
    arrow.textContent = '▼';

    const slider = document.querySelector('.photo-slider');
    if (slider) slider.classList.remove('show');

    // ← เพิ่มบรรทัดนี้
    const sliderLeft = document.querySelector('.photo-slider-left');
    if (sliderLeft) sliderLeft.classList.remove('show');
  }
}
// ===== โน้ตดนตรีลอยออกจากจาน =====
const notes = ['♫'];

function spawnNote() {
  const disc = document.getElementById('disc');
  if (!disc) return;

  const rect = disc.getBoundingClientRect(); // ← เอาตำแหน่งจานจริงๆ
  const note = document.createElement('div');
  note.textContent = notes[Math.floor(Math.random() * notes.length)];

  const offsetX = (Math.random() - 0.5) * rect.width;
  const offsetY = (Math.random() - 0.5) * rect.height;

  note.style.cssText = `
    position: fixed;
    font-size: ${14 + Math.random() * 14}px;
    pointer-events: none;
    z-index: 1001;
    animation: noteFloat ${1.5 + Math.random()}s ease forwards;
    left: ${rect.left + rect.width / 2 + offsetX}px;
    top: ${rect.top + rect.height / 2 + offsetY}px;
    opacity: 1;
  `;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2500);
}

// inject keyframe
const noteStyle = document.createElement('style');
noteStyle.textContent = `
  @keyframes noteFloat {
    0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
    100% { transform: translateY(-120px) rotate(20deg); opacity: 0; }
  }
`;
document.head.appendChild(noteStyle);

// ออกทุก 0.8 วินาที
setInterval(() => {
  const disc = document.getElementById('disc');
  if (disc && disc.style.animationPlayState !== 'paused') {
    spawnNote();
  }
}, 300);

// ===== ตัวนับวันคบกัน =====
function updateLoveCounter() {
  const start = new Date('2023-12-29T00:00:00');
  const now = new Date();
  const diff = now - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('love-days').textContent = `${days} Day` ;
  document.getElementById('love-detail').textContent =
    `${hours} ชั่วโมง ${mins} นาที ${secs} วินาที`;
}

// ===== ฉากจบ ปิดม่าน =====
player.addEventListener('ended', () => {
  const curtain = document.createElement('div');
  curtain.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // SVG ลายผ้าม่าน
  const curtainTexture = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <defs>
        <linearGradient id="fold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="rgba(0,0,0,0.15)"/>
          <stop offset="20%"  stop-color="rgba(255,255,255,0.08)"/>
          <stop offset="40%"  stop-color="rgba(0,0,0,0.12)"/>
          <stop offset="60%"  stop-color="rgba(255,255,255,0.06)"/>
          <stop offset="80%"  stop-color="rgba(0,0,0,0.10)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#fold)"/>
    </svg>
  `;
  const svgUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(curtainTexture);

  const curtainStyle = `
    position: absolute;
    top: 0; height: 100%;
    width: 52%;
    background-color: #8b0000;
    background-image: url("${svgUrl}");
    background-size: 60px 100%;
    box-shadow: inset 0 0 40px rgba(0,0,0,0.4);
    transition: transform 2.5s cubic-bezier(0.4, 0, 0.2, 1);
  `;

  const left = document.createElement('div');
  left.style.cssText = curtainStyle + `left:0; transform: translateX(-100%);
    border-right: 6px solid rgba(180,0,0,0.6);`;

  const right = document.createElement('div');
  right.style.cssText = curtainStyle + `right:0; transform: translateX(100%);
    border-left: 6px solid rgba(180,0,0,0.6);`;

  // ริ้วทองด้านบน
  const topBar = document.createElement('div');
  topBar.style.cssText = `
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 18px;
    background: linear-gradient(90deg, #7c5c00, #d4af37, #7c5c00, #d4af37, #7c5c00);
    z-index: 2;
  `;

  const msg = document.createElement('div');
  msg.style.cssText = `
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    opacity: 0;
    transition: opacity 1.2s ease 2.5s;
    text-shadow: 0 2px 12px rgba(0,0,0,0.6);
  `;
  msg.innerHTML = `
    <div style="font-size:clamp(40px,10vw,80px);margin-bottom:16px">🌹</div>
    <div style="font-size:clamp(20px,4vw,36px);margin-bottom:12px;color:#ffd6e7">จาก บีม ด้วยความรัก</div>
    <div style="font-size:clamp(14px,2.5vw,20px);opacity:0.85;color:#ffb3c6">ยินดีด้วยนะจ้าว 💕</div>
  `;

  curtain.appendChild(topBar);
  curtain.appendChild(left);
  curtain.appendChild(right);
  curtain.appendChild(msg);
  document.body.appendChild(curtain);

  setTimeout(() => {
    left.style.transform = 'translateX(0)';
    right.style.transform = 'translateX(0)';
    msg.style.opacity = '1';
  }, 300);
});