

function typeText() {
  if (i < message.length) {
    text.innerHTML += message.charAt(i);
    i++;
    setTimeout(typeText, 50);
  }
}

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);

// ❤️ HEART PARTICLE
class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 15 + 10;
    this.speed = Math.random() * 1 + 0.5;
    this.alpha = Math.random() * 0.6 + 0.4;
    this.drift = Math.random() * 0.6 - 0.3;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath();

    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    ctx.bezierCurveTo(
      this.x, this.y,
      this.x - this.size / 2, this.y,
      this.x - this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2,
      this.x, this.y + (this.size + topCurveHeight) / 2,
      this.x, this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x, this.y + (this.size + topCurveHeight) / 2,
      this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2,
      this.x + this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x + this.size / 2, this.y,
      this.x, this.y,
      this.x, this.y + topCurveHeight
    );

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    this.x += this.drift;

    if (this.y < -50) {
      this.y = canvas.height + 50;
      this.x = Math.random() * canvas.width;
    }
  }
}

// CREATE HEARTS
function createHearts(count) {
  for (let i = 0; i < count; i++) {
    hearts.push(new Heart());
  }
}
createHearts(60);

// ANIMATION LOOP
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animate);
}
animate();

/* REVEAL ON SCROLL */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.3 });

reveals.forEach(r => observer.observe(r));

/* GALLERY DATA */
const galleries = {
  gallery1: ["love23.JPG", "love21.JPG", "love22.JPG"],
  gallery2: ["love31.jpeg", "love32.jpeg", "love33.jpeg","love34.jpeg"],
  gallery3:["love41.jpeg", "love42.jpeg", "love43.jpeg","love45.jpeg"],
  gallery4: ["heart1.jpg", "heart2.jpg", "heart3.jpg"]
};

const modal = document.getElementById("galleryModal");
const galleryContent = document.getElementById("galleryContent");
const closeBtn = document.getElementById("closeGallery");

/* OPEN GALLERY */
document.querySelectorAll(".memory-img").forEach(img => {
  img.addEventListener("click", () => {
    const key = img.dataset.gallery;
    galleryContent.innerHTML = "";
    galleries[key].forEach(src => {
      const i = document.createElement("img");
      i.src = "assets/images/" + src;
      galleryContent.appendChild(i);
    });

    modal.style.display = "flex";

    /* OPTIONAL: slow hearts */
    if (window.setHeartSpeed) setHeartSpeed(0.2);
  });
});

/* CLOSE GALLERY */
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  if (window.setHeartSpeed) setHeartSpeed(1);
});


/* VIDEO FOCUS MODE */
const videos = document.querySelectorAll(".video-card video");

videos.forEach(video => {
  video.addEventListener("play", () => {
    document.body.classList.add("video-playing");
    videos.forEach(v => v.closest(".video-card").classList.remove("active"));
    video.closest(".video-card").classList.add("active");

    if (window.setHeartSpeed) setHeartSpeed(0.2);
  });

  video.addEventListener("pause", () => {
    document.body.classList.remove("video-playing");
    if (window.setHeartSpeed) setHeartSpeed(1);
  });
});
const loveBtn = document.getElementById("loveBtn");

loveBtn.addEventListener("click", () => {
  loveBtn.innerText = "Always ❤️";
  loveBtn.style.pointerEvents = "none";

  if (window.setHeartSpeed) setHeartSpeed(0.15);

  setTimeout(() => {
    document.querySelector(".final-scene").scrollIntoView({
      behavior: "smooth"
    });
  }, 1200);
});/* ===============================
   FINAL HEART & LETTER LOGIC
   =============================== */

const heart = document.getElementById("heart");
const heartStage = document.getElementById("heartStage");
const letterStage = document.getElementById("finalLetter");
const typedText = document.getElementById("typedText");

const finalMessage = `
My Love,

You are my miracle,
my strength,
and the safest place my heart has ever known.

Thank you for choosing me,
for loving me,
and for building this beautiful life with me.

Every heartbeat of mine
will always choose you.
`;

let letterIndex = 0;
let heartOpened = false;

heart.addEventListener("click", () => {
  if (heartOpened) return; // prevent double click
  heartOpened = true;

  heart.classList.add("open");
  heartStage.style.opacity = "0";

  if (window.setHeartSpeed) setHeartSpeed(0.1);

  setTimeout(() => {
    heartStage.style.display = "none";
    letterStage.style.display = "block";
    typeFinalLetter();
  }, 2000);
});

function typeFinalLetter() {
  if (letterIndex < finalMessage.length) {
    typedText.innerHTML += finalMessage.charAt(letterIndex);
    letterIndex++;
    setTimeout(typeFinalLetter, 45);
  }
}
