// PARTICLES
const container = document.getElementById('particles');
const makeDot = () => {
  const d = document.createElement('div');
  d.className = 'dot';
  const size = 4 + Math.random()*8;
  d.style.setProperty('--s', size+'px');
  // random horizontal start
  d.style.left = Math.random()*100 + 'vw';
  // slight horizontal drift
  d.style.setProperty('--x', (Math.random()*60 - 30) + 'vw');
  // random duration
  d.style.setProperty('--t', (6 + Math.random()*8) + 's');
  container.appendChild(d);
  // cleanup
  setTimeout(() => d.remove(), 15000);
};
setInterval(makeDot, 160);

// FLOATING LABELS need placeholder-shown trick
document.querySelectorAll('.field input').forEach(inp => {
  // ensure placeholder-shown works without showing text
  inp.setAttribute('placeholder', ' ');
  // pointer glow follow
  const glow = inp.parentElement.querySelector('.focus-glow');
  inp.addEventListener('pointermove', (e) => {
    const rect = inp.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.setProperty('--mx', x + '%');
    glow.style.setProperty('--my', y + '%');
  });
});

// RIPPLE / BURST on button
const button = document.querySelector('button.boom');
const rippleLayer = document.createElement('i');
button.appendChild(rippleLayer);

button.addEventListener('pointerdown', (e) => {
  const rect = button.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
  const y = ((e.clientY - rect.top) / rect.height) * 100 + '%';
  button.style.setProperty('--x', x);
  button.style.setProperty('--y', y);
  button.classList.add('rippling');
  setTimeout(() => button.classList.remove('rippling'), 450);
});

// SIMPLE DEMO LOGIN FEEDBACK
const form = document.getElementById('loginForm');
const msg = document.getElementById('message');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value.trim();
  if(u === 'admin' && p === '1234'){
    msg.textContent = '✅ Welcome, admin!';
    msg.style.color = '#00ffd9';
    // playful jiggle
    document.getElementById('card').animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }],
      { duration: 380, easing: 'cubic-bezier(.2,.9,.2,1.3)' }
    );
  }else{
    msg.textContent = '❌ Invalid credentials';
    msg.style.color = '#ff7b86';
    // shake animation on wrong
    form.animate(
      [
        { transform:'translateX(0)' },
        { transform:'translateX(-6px)' },
        { transform:'translateX(6px)' },
        { transform:'translateX(-4px)' },
        { transform:'translateX(0)' }
      ],
      { duration: 360, easing:'ease-in-out' }
    );
  }
});
