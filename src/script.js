
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('submitted')) return;

  // --- CONFETTI ---
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 9998;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  resize();
  addEventListener('resize', resize);

  const colors = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#5856d6'];
  const particles = Array.from({length: 120}, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * -innerHeight * 0.5,
    w: 6 + Math.random() * 8,
    h: 6 + Math.random() * 8,
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 6,
    rot: Math.random() * Math.PI * 2,
    rotSpeed: -0.1 + Math.random() * 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 0.5
  }));

  let last = performance.now();
  const duration = 3500;
  const started = performance.now();

  function draw(now) {
    const dt = now - last;
    last = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let p of particles) {
      p.vy += 0.02 * (dt / 16);
      p.x += p.vx * (dt / 16);
      p.y += p.vy * (dt / 16);
      p.rot += p.rotSpeed * (dt / 16);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2 + Math.sin(p.x * 0.01) * p.tilt, p.w, p.h);
      ctx.restore();
    }

    if (now - started < duration) {
      requestAnimationFrame(draw);
    } else {
      fadeOutAndRemove();
    }
  }

  function fadeOutAndRemove() {
    let alpha = 1;
    const fadeStep = 0.03;
    (function fade() {
      alpha -= fadeStep;
      canvas.style.opacity = Math.max(alpha, 0);
      if (alpha > 0) {
        requestAnimationFrame(fade);
      } else {
        canvas.remove();
      }
    })();
  }

  requestAnimationFrame(draw);

  // --- MODAL ---
    const modal = document.querySelector('.thanks-modal');
    if (modal) {
        modal.style.display = 'flex'; // reveal modal
    }

    // close button
    const closeBtn = modal?.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        });
    }

    // auto-hide after 5s
    setTimeout(() => {
        if (modal) modal.style.display = 'none';
    }, 5000);
});

