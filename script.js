// hero label letter-in animation
const heroLabel = document.getElementById('heroLabel');
const text = heroLabel.textContent;
heroLabel.innerHTML = '';
[...text].forEach((ch, i)=>{
  const s = document.createElement('span');
  s.className = 'char';
  s.style.animationDelay = (i*0.02)+'s';
  s.textContent = ch === ' ' ? '\u00A0' : ch;
  heroLabel.appendChild(s);
});
const style = document.createElement('style');
style.textContent = '@keyframes charIn{to{opacity:1;}}';
document.head.appendChild(style);

// scroll reveal
const els = document.querySelectorAll('.reveal-el');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); }
  });
}, { threshold:0.15 });
els.forEach(el=>io.observe(el));

// cursor glow
const glow = document.getElementById('cursorGlow');
window.addEventListener('pointermove', (e)=>{
  glow.style.setProperty('--mx', e.clientX+'px');
  glow.style.setProperty('--my', e.clientY+'px');
});

// scroll progress + active dot
const progress = document.getElementById('progress');
const dots = document.querySelectorAll('.dotnav a');
const sections = ['#top','#about','#work','#projects','#contact'].map(id=>document.querySelector(id));

function onScroll(){
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + '%';

  let current = 0;
  sections.forEach((sec, i)=>{
    if(sec && sec.getBoundingClientRect().top < window.innerHeight*0.5) current = i;
  });
  dots.forEach((d,i)=> d.classList.toggle('active', i===current));
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

// magnetic buttons
document.querySelectorAll('.role-chip, .work-link, .back-top, .social-item').forEach(btn=>{
  btn.addEventListener('mousemove', (e)=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.18}px, ${y*0.25}px)`;
  });
  btn.addEventListener('mouseleave', ()=>{ btn.style.transform = 'translate(0,0)'; });
});
