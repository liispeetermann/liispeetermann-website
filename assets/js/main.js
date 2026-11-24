// Mobile menu, FAQ (one open at a time), contact form and newsletter sign-up
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
  // Contact form: sends to a Google Form (answers are saved in its linked Google Sheet).
  // The Google Form address is in data-endpoint on the <form> in contact/index.html.
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    var thanks = document.querySelector('.form-thanks');
    var btn = form.querySelector('button[type=submit]');
    function say(msg) { status.textContent = msg; status.style.display = msg ? 'block' : 'none'; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var endpoint = form.getAttribute('data-endpoint');
      if (!endpoint) { say('Sorry, the form is not connected yet. Please try again soon.'); return; }
      var data = new URLSearchParams(new FormData(form));
      if (data.get('website')) { form.style.display = 'none'; if (thanks) thanks.style.display = 'flex'; return; } // spam trap
      data.delete('website');
      btn.disabled = true; btn.textContent = 'Sending…'; say('');
      // Google Forms doesn't allow reading its reply from another site, so a completed request counts as sent.
      fetch(endpoint, { method: 'POST', mode: 'no-cors', body: data })
        .then(function () {
          form.style.display = 'none';
          if (thanks) thanks.style.display = 'flex';
        })
        .catch(function () {
          say('Sorry, something went wrong and your message was not sent. Please try again in a moment.');
        })
        .then(function () { btn.disabled = false; btn.textContent = 'Send'; });
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
