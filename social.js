// ============================================================
// EDIT THESE FOUR LINES ONLY. They update every page at once.
// ============================================================
var SITE = {
  email:     'norbgrafix@gmail.com',   // your real email
  whatsapp:  '233592429015',           // number with country code, digits only, no + or spaces
  tiktok:    'norbgrafix',             // TikTok name, without the @
  instagram: 'norbgrafix'              // Instagram name, without the @
};
// ============================================================

(function () {
  var footer = document.querySelector('footer');
  if (!footer) return;

  var icons = 'https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/';
  var links = [
    { name: 'WhatsApp',  href: 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent('Hi NorbGrafix, I would like to talk about a design project.'), img: 'whatsapp' },
    { name: 'Instagram', href: 'https://www.instagram.com/' + SITE.instagram, img: 'instagram' },
    { name: 'TikTok',    href: 'https://www.tiktok.com/@' + SITE.tiktok, img: 'tiktok' },
    { name: 'Email',     href: 'mailto:' + SITE.email,
      svg: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>' }
  ];

  var css = document.createElement('style');
  css.textContent =
    '.social{display:flex;justify-content:center;gap:12px;list-style:none;margin:0 0 1.25rem;padding:0}' +
    '.social a{display:flex;align-items:center;justify-content:center;width:48px;height:48px;padding:0;border:0;border-radius:50%;background:var(--accent,#3d5afe)}' +
    '.social a:hover{background:var(--accent-hover,#2c46e6)}' +
    '.social img{width:22px;height:22px;filter:invert(1)}';
  document.head.appendChild(css);

  var ul = document.createElement('ul');
  ul.className = 'social';
  ul.setAttribute('aria-label', 'Contact and social links');
  links.forEach(function (l) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = l.href;
    a.setAttribute('aria-label', l.name);
    if (l.href.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; }
    a.innerHTML = l.svg ? l.svg : '<img src="' + icons + l.img + '.svg" alt="" width="22" height="22">';
    li.appendChild(a);
    ul.appendChild(li);
  });
  footer.insertBefore(ul, footer.firstChild);

  // Desktop only: same icons in the header, next to the menu
  var bar = document.querySelector('.bar');
  if (bar) {
    var topCss = document.createElement('style');
    topCss.textContent =
      '.social-top{display:none}' +
      '@media(min-width:800px){' +
      '.social-top{display:flex;gap:8px;list-style:none;margin:0 0 0 1rem;padding:0}' +
      '.social-top a{display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border:1px solid rgba(255,255,255,.35);border-radius:50%}' +
      '.social-top a:hover{border-color:#ffc93c;background:transparent}' +
      '.social-top img{width:18px;height:18px;filter:invert(1)}' +
      '.social-top svg{width:18px;height:18px}}';
    document.head.appendChild(topCss);
    var top = document.createElement('ul');
    top.className = 'social-top';
    top.setAttribute('aria-label', 'Contact and social links');
    links.forEach(function (l) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = l.href;
      a.setAttribute('aria-label', l.name);
      if (l.href.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; }
      a.innerHTML = l.svg ? l.svg : '<img src="' + icons + l.img + '.svg" alt="" width="18" height="18">';
      li.appendChild(a);
      top.appendChild(li);
    });
    bar.appendChild(top);
  }
})();

// Mobile menu extras: lock page scroll, close on link tap or Esc
(function () {
  var btn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
  if (!btn || !menu) return;
  function close() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  new MutationObserver(function () {
    document.body.classList.toggle('menu-open', menu.classList.contains('open'));
  }).observe(menu, { attributes: true, attributeFilter: ['class'] });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { close(); btn.focus(); }
  });
  window.matchMedia('(min-width:800px)').addEventListener('change', function (e) { if (e.matches) close(); });
})();
