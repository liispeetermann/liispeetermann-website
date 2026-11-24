/**
 * Contact form → Google Sheet + email
 * ------------------------------------------------------------
 * Paste this whole file into Extensions → Apps Script of the Google Sheet
 * that should collect the messages, then deploy it as a Web app
 * (Execute as: Me · Who has access: Anyone).
 *
 * Each message from the website contact form is:
 *   1. saved as a new row in the first tab of the Sheet, and
 *   2. emailed to you, with "Reply" going straight to the sender.
 */

// Where notifications go. Leave empty to use the Google account that deploys this script.
var NOTIFY_EMAIL = '';

var SUBJECT_PREFIX = 'Website enquiry';

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Spam trap: real visitors never see or fill the "website" field.
  if (p.website) return reply_({ ok: true });

  var first = clean_(p.first, 100);
  var last = clean_(p.last, 100);
  var email = clean_(p.email, 200);
  var message = clean_(p.message, 5000);

  if (!first || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply_({ ok: false, error: 'missing-fields' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'First name', 'Last name', 'Email', 'Message', 'Page']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), first, last, email, message, clean_(p.page, 300)]);
  } finally {
    lock.releaseLock();
  }

  var name = (first + ' ' + last).trim();
  var to = NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  MailApp.sendEmail({
    to: to,
    replyTo: email,
    name: 'liispeetermann.com',
    subject: SUBJECT_PREFIX + ' from ' + name,
    body: message + '\n\n—\n' + name + '\n' + email + '\n\nSaved to: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  });

  return reply_({ ok: true });
}

// Lets you open the web app URL in a browser to check it is running.
function doGet() {
  return reply_({ ok: true, status: 'Contact form endpoint is running' });
}

function clean_(v, max) {
  return String(v || '').replace(/^[=+\-@]+/, '').trim().slice(0, max);
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
