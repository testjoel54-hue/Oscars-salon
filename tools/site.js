/** Progressive enhancement for the static, two-language Cloudflare export. */
(function () {
  'use strict';
  var isVi = document.documentElement.lang === 'vi';
  var toggle = document.querySelector('.mobile-toggle');
  var header = document.querySelector('.site-header');
  var menu = document.querySelector('.mobile-nav');
  var menuIcon = '<svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"></path></svg>';
  var closeIcon = '<svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19"></path></svg>';
  var backdrop = document.createElement('button');
  backdrop.className = 'menu-backdrop';
  backdrop.type = 'button';
  backdrop.setAttribute('aria-label', (toggle && toggle.dataset.closeLabel) || (isVi ? 'Đóng menu' : 'Close navigation'));
  backdrop.tabIndex = -1;
  function setMenu(isOpen) {
    if (!header || !toggle || !menu) return;
    menu.classList.toggle('mobile-nav-open', isOpen);
    menu.setAttribute('aria-hidden', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    toggle.innerHTML = isOpen ? closeIcon : menuIcon;
    document.body.classList.toggle('menu-open', isOpen);
    if (isOpen) header.appendChild(backdrop);
    else backdrop.remove();
  }
  if (header && toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    backdrop.addEventListener('click', function () { setMenu(false); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 800 && toggle.getAttribute('aria-expanded') === 'true') setMenu(false); });
  }
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) reveals.forEach(function (el) { el.classList.add('in-view'); });
  else {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(function (el) { obs.observe(el); });
  }
  var openDays = ['Monday','Wednesday','Thursday','Friday','Saturday'];
  function refreshBusinessTime() {
    var pieces = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var val = function (type) { return (pieces.find(function (part) { return part.type === type; }) || {}).value || ''; };
    var day = val('weekday'), minutes = Number(val('hour'))*60 + Number(val('minute'));
    var isOpen = openDays.indexOf(day) !== -1 && minutes >= 600 && minutes < 1080;
    var status = document.querySelector('.status-pill');
    if (status) {
      status.classList.toggle('status-open', isOpen);
      status.classList.toggle('status-closed', !isOpen);
      status.innerHTML = '<i></i>' + (isOpen ? (isVi ? 'Đang mở cửa' : 'Open now') : (isVi ? 'Đang đóng cửa' : 'Closed now'));
    }
    document.querySelectorAll('.hours-row').forEach(function (row) {
      var name = row.querySelector('span');
      if (!name) return;
      var badge = name.querySelector('small');
      if (badge) badge.remove();
      var today = row.dataset.weekday === day;
      row.classList.toggle('hours-row-today', today);
      if (today) { badge = document.createElement('small'); badge.textContent = isVi ? 'Hôm nay' : 'Today'; name.appendChild(badge); }
    });
  }
  refreshBusinessTime();
  window.setInterval(refreshBusinessTime, 60_000);
})();
