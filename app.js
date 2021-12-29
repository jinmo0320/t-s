const canvas = document.getElementById("one");
const ctx = canvas.getContext("2d");
const banvas = document.getElementById("two");
const btx = banvas.getContext("2d");

const upInput = document.querySelector(".up");
const downInput = document.querySelector(".down");
const btn = document.querySelector(".btn");

canvas.width = 700;
canvas.height = 700;
banvas.width = 700;
banvas.height = 700;

let isReady = false;

let values = [];

btn.addEventListener("click", () => {
  if (
    upInput.value &&
    downInput.value &&
    upInput.value >= 0 &&
    upInput.value <= 20 &&
    downInput.value >= 33 &&
    downInput.value <= 35
  ) {
    values.push({ t: upInput.value, s: downInput.value });
  }
});

const img = new Image();
img.src = "./img/img.png";
img.addEventListener("load", () => {
  ctx.drawImage(img, 0, 0, 702, 700);
  const imgData = ctx.getImageData(0, 0, 700, 700);
  ctx.clearRect(0, 0, 700, 700);
  for (let i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i] < 150) {
      const x = (i / 4) % 700;
      const y = Math.floor(i / 4 / 700);

      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgb(0,0,0)";
  ctx.strokeRect(100, 60, 477, 545);

  isReady = true;
});

function animate() {
  requestAnimationFrame(animate);
  if (isReady) {
    values.forEach((value) => {
      const x = 100 + ((value.s - 33) / 2) * 477;
      const y = 605 - (value.t / 20) * 545;

      btx.beginPath();
      btx.strokeStyle = "#506AD4";
      btx.lineWidth = 2;
      btx.setLineDash([10, 5]);
      btx.moveTo(x, 605);
      btx.lineTo(x, y);
      btx.lineTo(100, y);
      btx.stroke();

      btx.beginPath();
      btx.fillStyle = "#F2CC39";
      btx.arc(x, y, 10, 0, Math.PI * 2);
      btx.fill();
    });
  }
}
animate();
