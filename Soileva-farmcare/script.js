(() => {
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');
 if(toggle&&nav){
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');nav.classList.toggle('open',!open);document.body.classList.toggle('menu-open',!open)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');nav.classList.remove('open');document.body.classList.remove('menu-open')}));
  window.addEventListener('resize',()=>{if(innerWidth>820){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open')}});
 }
 const slides=[...document.querySelectorAll('.hero-slide')],dots=[...document.querySelectorAll('.dot')],number=document.getElementById('slide-number');let index=0,timer;
 function show(n){index=(n+slides.length)%slides.length;slides.forEach((s,i)=>{s.classList.toggle('active',i===index)});dots.forEach((d,i)=>d.classList.toggle('active',i===index));if(number)number.textContent=String(index+1).padStart(2,'0')}
 function restart(){clearInterval(timer);timer=setInterval(()=>show(index+1),6500)}
 document.querySelectorAll('.arrow').forEach(b=>b.addEventListener('click',()=>{show(index+Number(b.dataset.step));restart()}));
 dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart()}));
 if(slides.length>1)restart();
 const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
})();