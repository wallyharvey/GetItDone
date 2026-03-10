/* ============================================
   FILE: background.js
   PURPOSE: Animated gradient background
   EFFECT: Mouse-tracking indigo glow + ambient
           drifting pink/indigo blobs
   ============================================ */

// Create a full-screen background element behind everything
const gradientBg = document.createElement('div');
gradientBg.style.position = 'fixed';
gradientBg.style.top = '0';
gradientBg.style.left = '0';
gradientBg.style.width = '100vw';
gradientBg.style.height = '100vh';
gradientBg.style.zIndex = '-1';
gradientBg.style.pointerEvents = 'none';
gradientBg.style.backgroundColor = '#020617';
document.body.appendChild(gradientBg);

// Track the mouse position (start at centre of screen)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
let time = 0;

// Update mouse position whenever the cursor moves
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Main animation loop (runs ~60 times per second)
function animate() {
    // Smooth easing — the glow follows the mouse but with a slight delay
    const ease = 0.12;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    // Slow-moving ambient blobs (independent of mouse)
    time += 0.003;

    // Blob 1: Pinkish, drifts in wide sine waves
    const driftX1 = (window.innerWidth * 0.3) + Math.sin(time) * 200;
    const driftY1 = (window.innerHeight * 0.4) + Math.cos(time * 0.8) * 150;

    // Blob 2: Indigo, drifts in opposite direction
    const driftX2 = (window.innerWidth * 0.7) + Math.cos(time * 0.6) * 200;
    const driftY2 = (window.innerHeight * 0.6) + Math.sin(time * 0.7) * 150;

    // Layer all the gradients together
    gradientBg.style.background = `
        radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(99, 102, 241, 0.35), transparent 45%),
        radial-gradient(1000px circle at ${driftX1}px ${driftY1}px, rgba(236, 72, 153, 0.12), transparent 60%),
        radial-gradient(1000px circle at ${driftX2}px ${driftY2}px, rgba(99, 102, 241, 0.10), transparent 60%),
        #020617
    `;

    // Keep the loop running
    requestAnimationFrame(animate);
}

// Start the animation
animate();
