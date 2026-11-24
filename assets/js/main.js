// Mobile menu, FAQ (one open at a time) and contact form → email
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.menu-toggle').forEach(function (btn) {
    var menu = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  });
  var items = document.querySelectorAll('.faq details');
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var name = (f.first.value + ' ' + f.last.value).trim();
      var subject = 'Website enquiry' + (name ? ' from ' + name : '');
      var body = f.message.value + '\n\n' + name + '\n' + f.email.value;
      window.location.href = 'mailto:lpeetermann@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
});

// Newsletter sign-up (footer): MailerLite embedded form, restyled in style.css.
function ml_webform_success_48970971() {
  document.querySelectorAll('.ml-subscribe-form-48970971').forEach(function (box) {
    box.querySelector('.row-form').style.display = 'none';
    box.querySelector('.row-success').style.display = 'flex';
  });
}
document.addEventListener('DOMContentLoaded', function () {
  var box = document.querySelector('.ml-subscribe-form-48970971');
  if (!box) return;
  var ml = document.createElement('script');
  ml.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519';
  document.body.appendChild(ml);
  try { fetch('https://assets.mailerlite.com/jsonp/1984183/forms/205003947951261183/takel'); } catch (e) {}
});
