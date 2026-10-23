# PAIGE 18 Production — Website (Concept 01 · Dark)

Static site for PAIGE 18 Production, a Vancouver film / theatre / web-series company.

- `index.html` — Home: Hero (trailer) · About · Works · Press & Awards · People · Behind the Work · Contact · Footer
- `work.html?id=<work-id>` — Work detail template
- `about.html` — About detail page
- `assets/js/data.js` — **Edit works, people, news & media here**
- `assets/js/motion.js` — Intro loader, split-text reveals, image wipes, parallax, custom cursor
- `assets/img/logo.png` (full), `logo-wordmark.png` (header), `favicon.png` — logo files
- `assets/css/style.css` — Design tokens at `:root` (point red `--red: #b5372f`)

## Replacing placeholders
- Hero trailer: replace the `.hero__media` div in `index.html` with
  `<video class="hero__media" src="assets/video/reel.mp4" autoplay muted loop playsinline></video>`
- Posters / hover previews: set `poster` and `preview` paths per work in `data.js`
- Any `data-ph="IMG"` element: add `data-src="path/to/image.jpg"`
- Festival laurels, press quotes, address, stats are placeholder copy.

Open `index.html` directly in a browser — no build step.

## Images
Placeholder imagery and the hero loop are AI-generated (OpenArt), stored in `assets/img/` and `assets/video/`.
Replace the files (or the paths in `data.js`) with real key art, stills and trailer. If an image fails to load, the styled IMG placeholder is shown instead.
