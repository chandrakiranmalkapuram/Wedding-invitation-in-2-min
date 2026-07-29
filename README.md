# Wedding Invitation Website

A single-page, mobile-first digital wedding invitation with a South Indian
Hindu temple theme — an ornate gopuram silhouette, gold ornamentation,
flickering diyas, floating petals, a scratch-to-reveal save-the-date card,
and smooth scroll animations. Pure HTML/CSS/JS — no frameworks, no build
step, no login, nothing to install to run it.

**Live demo:** open `index.html` in any browser — that's it.

---

## 1. Project structure

```
wedding-invite/
├── index.html      → all page structure & content sections
├── style.css       → colors, type, layout, all animations
├── script.js       → editable content (WEDDING object), petals, reveals,
│                      music, parallax, scratch-card logic
├── README.md        → this file
└── assets/
    └── music.mp3    → you add this (see step 3 below)
```

There is no build tool, no `package.json`, no dependencies to install.
Everything is plain HTML/CSS/JS that runs directly in the browser.

---

## 2. Edit your details

Everything you're likely to change lives in **one place**: the `WEDDING`
object at the top of `script.js`.

```js
const WEDDING = {
  brideName:    "Write bride name here",
  groomName:    "Write groom name here",
  weddingDate:  "23rd August 2026",
  weddingDay:   "Sunday",
  weddingTime:  "11:10 AM",
  venueName:    "Write venue name here",
  venueAddress: "Write venue address here",
  mapsLink:     "Paste google maps link here",
  phone1:       "+91 90********",
  phone2:       "+91 98********",
  whatsapp:     "+91 90********",
  whatsappLink: "https://gayathri-anuragsai.netlify.app/",
  email:        ""   // Write your email if you want
};
```

Change any value and every section that uses it (hero, ceremony card,
scratch-to-reveal date, venue, contact card, footer, thank-you section)
updates automatically — you don't need to touch `index.html` for text
changes.

To change the two quotes ("Two hearts, one beautiful journey" and the
blessings line), search for `<p class="quote"` in `index.html` and edit the
text directly.

---

## 3. Add the background music 

The invitation was written with **"Chanakya" by Rishab Rikhiram Sharma** in
mind. For copyright reasons this project ships without the actual audio file
— you'll need to add it yourself:

1. Get an MP3 of a track you have the rights to use.
2. Rename the file to `music.mp3`.
3. Place it inside the `assets/` folder, so the path is `assets/music.mp3`.

If you skip this step, the site still works perfectly — it just plays no
sound. The site tries to autoplay music, and if the browser blocks that (all
mobile browsers do until a visitor interacts with the page), it shows a
**"Tap to Begin"** button on the loading screen instead. A speaker icon in
the top-right corner lets guests mute/unmute at any time.

---

## 4. Run it locally (optional, to preview before deploying)

Because it's plain HTML/CSS/JS, you can just double-click `index.html`.
For a closer match to production behavior (some browsers treat audio/autoplay
differently on `file://` URLs than on a real server), serve it locally
instead:

```bash
cd wedding-invite
python3 -m http.server 8080
# then open http://localhost:8080 in your browser
```

or, if you have Node installed:

```bash
npx serve .
```

---

## 5. Upload to GitHub

If you don't already have a repo, here's the full sequence from scratch:

```bash
cd wedding-invite

git init
git add .
git commit -m "Initial commit: wedding invitation site"

# Create the repo on GitHub first (via github.com → New repository),
# then connect it as the remote — replace the URL with your own:
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

If you already created the repo with a README on GitHub's side, pull first
to avoid a conflict:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 6. Deploy for free

Any of these work with **zero configuration**, since there's no build step.

### Option A — GitHub Pages (uses the repo you just pushed to)
1. On GitHub, go to your repo → **Settings → Pages**.
2. Under "Build and deployment", set **Source** to *Deploy from a branch*.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait ~1 minute. Your site will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

### Option B — Netlify (fastest, drag-and-drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `wedding-invite` folder onto the page.
3. You get an instant live link. Rename the site from the Netlify dashboard
   (Site settings → Change site name) for something shorter and prettier.
4. Optional: connect the same GitHub repo in Netlify for auto-deploys on
   every push (Site settings → Build & deploy → Link repository).

### Option C — Vercel
```bash
npm i -g vercel      # one-time install
cd wedding-invite
vercel               # follow the prompts — no config needed
```

Any of the three gives you a shareable link you can send straight to guests.

---

## 7. Updating the site after it's live

Whenever you edit `script.js` or `index.html` again:

```bash
git add .
git commit -m "Update wedding details"
git push
```

- **GitHub Pages** and **Netlify (if linked to GitHub)** will redeploy
  automatically within a minute or two.
- **Netlify (drag-and-drop)** — just drag the folder onto
  [app.netlify.com/drop](https://app.netlify.com/drop) again.
- **Vercel** — run `vercel --prod` again from the project folder.

---

## Design notes

- **No photographs** are used anywhere — all decoration is built from CSS
  gradients and inline SVG (petals, the ornate temple gopuram silhouette,
  diyas, temple bells, mandapa pillars), so there are no external image
  files to manage or replace.
- **Scratch-to-reveal save-the-date card** — guests scratch a gold foil card
  in the Ceremony section to reveal the wedding date, using real pointer/touch
  scratch physics (not a simple tap-to-reveal).
- **Floating petals, scroll reveals, parallax** on the temple silhouette, a
  shimmering gold sweep across the couple's names, and a pulsing gold glow
  on key cards are all handled in `script.js` / `style.css`, and everything
  respects `prefers-reduced-motion` for guests who have that setting enabled.
- Fonts (Cormorant Garamond, Cinzel, Mulish) load from Google Fonts via a CDN
  link in `index.html` — no local font files needed.

## License

This is your personal wedding invitation — use, edit, and share it freely.
