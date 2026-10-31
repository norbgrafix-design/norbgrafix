// ===== EDIT THESE LINES ONLY =====
var SITE={email:'norbgrafix@gmail.com',whatsapp:'233592429015',tiktok:'norbgrafix',instagram:'norbgrafix',
// Google AdSense: leave empty until approved. client like 'ca-pub-1234567890123456', slot is your ad unit number
adsenseClient:'',adsenseSlot:''};
// =================================
(function(){
var d=document,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return[].slice.call((r||d).querySelectorAll(s))};
d.documentElement.classList.add('js');
var wa='https://wa.me/'+SITE.whatsapp+'?text='+encodeURIComponent('Hi NorbGrafix, I would like to talk about a design project.');
$$('[data-wa]').forEach(function(a){a.href=wa});
$$('[data-mail]').forEach(function(a){a.href='mailto:'+SITE.email});$$('[data-mailtext]').forEach(function(s){s.textContent=SITE.email});
$$('[data-tk]').forEach(function(a){a.href='https://www.tiktok.com/@'+SITE.tiktok});
$$('[data-ig]').forEach(function(a){a.href='https://www.instagram.com/'+SITE.instagram});
// footer social icons
var I={whatsapp:'<path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 9.5c.5 2.2 2.6 4.3 5 5l1.6-1.3-2-1.2-1 .9c-.8-.4-1.6-1.2-2-2l.9-1-1.2-2z"/>',instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',tiktok:'<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2 4.2 5 4.5"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'};
var L=[['WhatsApp','whatsapp',wa],['Instagram','instagram','https://www.instagram.com/'+SITE.instagram],['TikTok','tiktok','https://www.tiktok.com/@'+SITE.tiktok],['Email','mail','mailto:'+SITE.email]];
var f=$('footer'),ul=d.createElement('ul');ul.className='social';
ul.innerHTML=L.map(function(l){return'<li><a href="'+l[2]+'" aria-label="'+l[0]+'"'+(l[2].indexOf('http')==0?' target="_blank" rel="noopener"':'')+'><svg viewBox="0 0 24 24" aria-hidden="true">'+I[l[1]]+'</svg></a></li>'}).join('');f.insertBefore(ul,f.firstChild);
// menu
var b=$('#menuBtn'),m=$('#menu');
function tog(o){m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);d.body.style.overflow=o?'hidden':''}
b.onclick=function(){tog(!m.classList.contains('open'))};m.onclick=function(e){if(e.target.tagName=='A')tog(false)};d.onkeydown=function(e){if(e.key=='Escape')tog(false)};
// scroll reveal + count up
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
$$('[data-n]',e.target).forEach(function(n){var t=+n.dataset.n,i=0,s=setInterval(function(){i+=Math.ceil(t/30);if(i>=t){i=t;clearInterval(s)}n.textContent=i},35)})})},{threshold:.12});
$$('.rv').forEach(function(x){io.observe(x)});
// ads
var real=SITE.adsenseClient&&SITE.adsenseSlot;
if(real){var s=d.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+SITE.adsenseClient;d.head.appendChild(s)}
$$('[data-ad]').forEach(function(a){if(real){a.classList.add('live');a.insertAdjacentHTML('beforeend','<ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="'+SITE.adsenseClient+'" data-ad-slot="'+SITE.adsenseSlot+'" data-ad-format="auto" data-full-width-responsive="true"></ins>');try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}}else a.classList.add('ph')});
// portfolio filter + lightbox
var chips=$$('.chip'),items=$$('.item');
chips.forEach(function(c){c.onclick=function(){var k=c.dataset.f,n=0;chips.forEach(function(x){x.setAttribute('aria-pressed',x===c)});items.forEach(function(i){var ok=k=='all'||i.dataset.cat==k;i.hidden=!ok;if(ok)n++});$('.empty').hidden=n>0}});
var lb=$('#lb');if(lb){var cur=0,vis=function(){return items.filter(function(i){return!i.hidden})},img=$('img',lb),cap=$('p',lb);
function show(i){var v=vis();cur=(i+v.length)%v.length;var s=$('img',v[cur]);img.src=s.src;img.alt=s.alt;cap.textContent=s.alt}
items.forEach(function(it){$('.open',it).onclick=function(){show(vis().indexOf(it));lb.showModal()}});
$('.close',lb).onclick=function(){lb.close()};$('.prev',lb).onclick=function(){show(cur-1)};$('.next',lb).onclick=function(){show(cur+1)};
lb.onclick=function(e){if(e.target===lb)lb.close()};var x0;lb.ontouchstart=function(e){x0=e.touches[0].clientX};lb.ontouchend=function(e){var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))}}
// contact form
var fm=$('#form');if(fm)fm.onsubmit=function(e){e.preventDefault();var b='Name: '+fm.name.value+'\nEmail: '+fm.email.value+'\nNeed: '+fm.type.value+'\n\n'+fm.msg.value;location.href='mailto:'+SITE.email+'?subject='+encodeURIComponent('Project enquiry from '+fm.name.value)+'&body='+encodeURIComponent(b)};
})();
