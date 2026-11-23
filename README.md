# liispeetermann.com — website files

A complete, static version of the Liis Peetermann website, ready to host for free on **GitHub Pages**. No build tools, no code to compile: every page is plain HTML, one shared stylesheet and one small script.

---

## 1. Folder structure

```
liispeetermann-website/
├── index.html                  →  /                    (Home)
├── giftsession/index.html      →  /giftsession/        (Gift a Session)
├── about/index.html            →  /about/
├── contact/index.html          →  /contact/
├── payments/index.html         →  /payments/
├── faq/index.html              →  /faq/
├── privacy-policy/index.html   →  /privacy-policy/
├── cookie-policy/index.html    →  /cookie-policy/
├── terms-of-service/index.html →  /terms-of-service/
├── 404.html                    →  shown for any address that doesn't exist
├── assets/
│   ├── css/style.css           →  all colours, fonts, spacing and mobile layout
│   ├── js/main.js              →  mobile menu, FAQ accordion, contact form → email
│   ├── js/animations.js        →  parallax photos and fade-in-on-scroll effects
│   └── images/                 →  all photos, logos, QR codes and the favicon
├── sitemap.xml                 →  list of pages for Google
├── robots.txt                  →  tells search engines where the sitemap is
├── .nojekyll                   →  tells GitHub to serve the files exactly as they are
└── README.md                   →  this guide
```

Each page lives in its own folder as `index.html`. That is what gives you clean addresses like `liispeetermann.com/about/` instead of `about.html`.

**Important:** keep the folder structure exactly as it is. The pages link to each other and to `assets/` with relative paths, so moving or renaming a file will break links or images.

---

## 2. Upload to GitHub (no coding needed)

### Step 1 — Create a GitHub account
Go to https://github.com and sign up (free).

### Step 2 — Create a repository
1. Click **+** (top right) → **New repository**.
2. Name it, e.g. `liispeetermann-website`.
3. Set it to **Public** (GitHub Pages is free for public repositories).
4. Leave everything else unticked and click **Create repository**.

### Step 3 — Upload the files
1. Unzip `liispeetermann-website.zip` on your computer.
2. In your new repository, click **uploading an existing file** (or **Add file → Upload files**).
3. Open the unzipped `liispeetermann-website` folder, select **everything inside it** (all folders and files, not the outer folder itself) and drag it into the browser window.
   - On a Mac, press `Cmd + Shift + .` in Finder to show the hidden `.nojekyll` file so it gets uploaded too.
4. Scroll down and click **Commit changes**.

Check that `index.html` sits at the top level of the repository (not inside another folder).

### Step 4 — Turn on GitHub Pages
1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. After 1–2 minutes the page shows your address, e.g. `https://YOUR-USERNAME.github.io/liispeetermann-website/`.

Open it and click through the pages to check everything works.

---

## 3. Connect your own domain (liispeetermann.com)

Your domain is currently connected to Squarespace. Only do this step when you're ready to switch the live site over.

### In GitHub
1. **Settings → Pages → Custom domain** → enter `www.liispeetermann.com` → **Save**.
2. Once the DNS check passes, tick **Enforce HTTPS**.

### At your domain provider (where liispeetermann.com is registered, e.g. Squarespace Domains)
Remove the old Squarespace website records, then add:

| Type  | Host / Name | Value                      |
|-------|-------------|----------------------------|
| A     | @           | 185.199.108.153            |
| A     | @           | 185.199.109.153            |
| A     | @           | 185.199.110.153            |
| A     | @           | 185.199.111.153            |
| CNAME | www         | YOUR-USERNAME.github.io    |

DNS changes can take a few minutes up to 24–48 hours. Check GitHub's current guide before changing records: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

> The custom 404 page uses links that start from the site root, so it works fully once the custom domain is connected.

---

## 4. Things to set up before going live

1. **Contact form.** GitHub Pages can't send email by itself. Right now, pressing *Submit* opens the visitor's email app with a message addressed to lpeetermann@gmail.com. For messages that arrive automatically, sign up for a free form service such as **Formspree** (https://formspree.io), then in `contact/index.html`:
   - change `<form id="contact-form" …>` to `<form id="contact-form" action="https://formspree.io/f/YOUR-ID" method="POST" …>`
   - and remove the `contact-form` block at the bottom of `assets/js/main.js`.
2. **Newsletter sign-up (footer).** The email field is design-only. Connect it to your newsletter tool (e.g. Mailchimp, MailerLite, Kit) by pasting the form `action` URL they give you onto the footer `<form>` on every page.
3. **Gift a session buttons** currently go to the Contact page. When you have a gift checkout (e.g. a Stripe payment link or gift card), replace the links on `giftsession/index.html`, `index.html` and the top banner.
4. **Cookie banner.** Your Cookie Policy describes a consent banner. The new site sets no tracking cookies, but if you add Google Analytics or a Meta Pixel, add a consent tool (e.g. Cookiebot, CookieYes) first.
5. **Payments.** The Stripe *Buy* button and both QR codes point to your existing Stripe and Wise links. Scan both QR codes once to double-check.

---

## 5. How to edit later

You can edit any file directly on GitHub: open the file → click the **pencil icon** → make the change → **Commit changes**. The live site updates within a minute or two.

- **Text:** open the page's `index.html` and edit the words between the tags.
- **Prices:** search for `€260`, `€90` and `€190` in `index.html` and `giftsession/index.html`.
- **Holiday banner:** the dark red bar at the top of every page is marked `<!-- GIFT BAR -->`. Delete that block from each page after the holidays.
- **Photos:** upload a new image into `assets/images/` with the same file name to replace one everywhere. Export photos as **sRGB JPEG** (about 2000–2400 px wide) so the colours stay true and don't look faded.
- **Colours and fonts:** in `assets/css/style.css`. The deep red is `#4e1414`, the beige backgrounds are `#f5f0e8` and `#fbf7f2`, headlines use **Castoro** and body text uses **Inter** (both from Google Fonts).

The header and footer are repeated on every page. If you change a menu or footer link, update it on all nine pages plus `404.html`.

---

## 6. Scroll animations

`assets/js/animations.js` adds the motion across every page:

- **Parallax photos:** the full-width photo strips and the large hero photos drift more slowly than the page as you scroll, which gives depth.
- **Hero text:** the headline fades in on load, then gently floats and fades as you scroll past the hero.
- **Reveal on scroll:** headings, paragraphs, cards, testimonials and the footer fade up into place as they come into view. Items side by side appear one after another.
- **Photos inside sections:** they settle from a slight zoom as they appear.

Visitors whose device is set to "reduce motion" see the site without animations.

**To tune it:** in `animations.js`, change `speed: 0.18` (photo strips) or `speed: 0.28` (hero) to adjust the parallax strength. In `style.css`, the `.reveal` rules set the fade distance and timing. **To turn all animations off:** delete the `animations.js` line from the `<head>` of each page.

---

## 7. Preview on your own computer (optional)

Because links point to folders (e.g. `about/`), double-clicking `index.html` opens the homepage but some links won't open in the browser. To preview the whole site locally, open a terminal in the folder and run:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.
