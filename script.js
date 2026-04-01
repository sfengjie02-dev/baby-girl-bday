const intro = document.getElementById("intro");

const letter = document.getElementById("letter");

const startBtn = document.getElementById("startBtn");

const tinyBtn = document.getElementById("tinyBtn");

const speedHint = document.getElementById("speedHint");

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

let W, H, dpr;

function resize(){

dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

W = canvas.width = Math.floor(window.innerWidth * dpr);

H = canvas.height = Math.floor(window.innerHeight * dpr);

[canvas.style](http://canvas.style).width = window.innerWidth + "px";

[canvas.style](http://canvas.style).height = window.innerHeight + "px";

ctx.setTransform(1,0,0,1,0,0);

}

window.addEventListener("resize", resize);

resize();

function showLetter(){

intro.classList.add("hidden");

letter.classList.remove("hidden");

window.scrollTo({ top: 0, behavior: "smooth" });

confettiBurst({ count: 90, spread: 80, power: 6, colors: ["#3aa7ff", "#6dd6ff", "#ffffff"] });

}

startBtn.addEventListener("click", showLetter);

tinyBtn.addEventListener("click", () => {

speedHint.textContent = "Okay good girl. Slowly.";

confettiBurst({ count: 40, spread: 40, power: 4, colors: ["#6dd6ff", "#ffffff"] });

});

function rand(min, max){ return Math.random() * (max - min) + min; }

let particles = [];

let animId = null;

function confettiBurst({

count = 120,

spread = 90,

power = 7,

colors = ["#3aa7ff", "#6dd6ff", "#ff5db1", "#ffffff"]

} = {}){

const angleCenter = -Math.PI / 2;

for(let i=0;i<count;i++){

const a = angleCenter + rand(-spread, spread) * Math.PI/180;

const v = rand(power*0.55, power)*  dpr;

particles.push({

x: W/2 + rand(-20, 20)*dpr,

y: H*0.22 + rand(-10, 10)*dpr,

vx: Math.cos(a) * v,

vy: Math.sin(a) * v,

g: rand(0.12, 0.18) * dpr,

r: rand(3, 6) * dpr,

rot: rand(0, Math.PI*2),

vr: rand(-0.18, 0.18),

color: colors[Math.floor(Math.random() * colors.length)],

life: rand(70, 120)

});

}

if(!animId) animate();

}

function animate(){

animId = requestAnimationFrame(animate);

ctx.clearRect(0,0,W,H);

particles = particles.filter(p => [p.life](http://p.life) > 0);

for(const p of particles){

[p.life](http://p.life) -= 1;

p.vy += p.g;

p.x += p.vx;

p.y += p.vy;

p.rot += p.vr;

[ctx.save](http://ctx.save)();

ctx.translate(p.x, p.y);

ctx.rotate(p.rot);

ctx.globalAlpha = Math.min(1, [p.life](http://p.life) / 30);

ctx.fillStyle = p.color;

ctx.fillRect(-p.r, -p.r, p.r*2, p.r*2);

ctx.restore();

}

if(particles.length === 0){

cancelAnimationFrame(animId);

animId = null;

}

}

// Confetti when opening each toggle

document.querySelectorAll("details.acc-item").forEach(d => {

d.addEventListener("toggle", () => {

if(![d.open](http://d.open)) return;

const mode = d.getAttribute("data-confetti");

if(mode === "big"){

confettiBurst({ count: 220, spread: 120, power: 9 });

}else if(mode){

confettiBurst({ count: 120, spread: 95, power: 7 });

}

});

});

// Final buttons

const replayConfetti = document.getElementById("replayConfetti");

const backTop = document.getElementById("backTop");

if(replayConfetti){

replayConfetti.addEventListener("click", () => {

confettiBurst({ count: 260, spread: 130, power: 9 });

});

}

if(backTop){

backTop.addEventListener("click", () => {

window.scrollTo({ top: 0, behavior: "smooth" });

});

}

/* -----------------------------

Gamified background collectibles (no Hello Kitty yet)

-------------------------------- */

const bgStickers = document.getElementById("bgStickers");

const toast = document.getElementById("toast");

function showToast(text){

if(!toast) return;

toast.textContent = text;

toast.classList.add("show");

clearTimeout(showToast._t);

showToast._t = setTimeout(() => toast.classList.remove("show"), 1400);

}

const rewards = [

"You found a secret sparkle ✨",

"Good girl — keep going 😈",

"Okay okay… that one was cute 💙",

"Collect 3 and you get extra confetti!",

"Slowly… don’t rush 😌"

];

let collected = 0;

function createCollectible({ xPct, yPct, emoji }){

const el = document.createElement("button");

el.className = "collectible";

el.type = "button";

[el.style](http://el.style).left = xPct + "%";

[el.style.top](http://el.style.top) = yPct + "%";

const span = document.createElement("span");

span.className = "emoji";

span.textContent = emoji;

el.appendChild(span);

el.addEventListener("click", () => {

collected += 1;

[el.style](http://el.style).opacity = "0";

[el.style](http://el.style).transform = "translate(-50%, -50%) scale(0.85)";

setTimeout(() => el.remove(), 220);

const msg = rewards[Math.floor(Math.random() * rewards.length)];

showToast(msg);

confettiBurst({ count: 50, spread: 70, power: 6, colors: ["#3aa7ff", "#6dd6ff", "#ffffff"] });

if(collected % 3 === 0){

confettiBurst({ count: 180, spread: 120, power: 9, colors: ["#3aa7ff", "#6dd6ff", "#ff5db1", "#ffffff"] });

showToast("Bonus confetti unlocked 💙");

}

});

bgStickers.appendChild(el);

}

function seedCollectibles(){

if(!bgStickers) return;

bgStickers.innerHTML = "";

const items = [

{ xPct: 10, yPct: 18, emoji: "⭐" },

{ xPct: 90, yPct: 22, emoji: "💙" },

{ xPct: 14, yPct: 78, emoji: "✨" },

{ xPct: 88, yPct: 76, emoji: "🫧" },

{ xPct: 6,  yPct: 48, emoji: "🎮" },

{ xPct: 94, yPct: 52, emoji: "🎀" }

];

items.forEach(createCollectible);

}

seedCollectibles();
