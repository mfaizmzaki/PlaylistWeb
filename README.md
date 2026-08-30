# SUKIPT 2026 · Presenter Cockpit

Two browser tabs on the venue laptop, synced automatically:

| Tab | Where | What |
|---|---|---|
| `public.html` | drag to the projector/HDMI screen, press F11 | shows the slide, plays all audio. **Click it once** to enable audio. |
| `presenter.html` | laptop screen | the officer's controls |

Open both by double-clicking them from the same folder, in the same browser (Chrome or Edge). No server needed.

## Medal ceremony (🏅 Medal Slide tab — the landing tab)
1. In each box — **EMAS / PERAK / GANGSA** — click the winning university. Type a name or short code in the box's search field to narrow the grid (Enter picks the only match). Tick **Two bronze medals** if there is a bronze tie; a fourth box and flag appear.
2. **📺 Show on projector** — logos are placed on the flag template automatically and the slide goes live.
3. **▶ Lagu Juara** — plays the gold university's anthem (falls back to LAGU SUKIPT for the 24 institutions without one).
4. **🧹 Clear all** before the next event.

Every shown medal slide is also kept in the Slides tab (←/→ to step through, useful for a replay).

## Files
- `teams.js` — the 64 registered institutions: `id` (from online.sukipt.com.my), `name`, `short` (search code), `logo` (in `LogoIPT/`), `anthem` (in `music/Lagu Universiti/`, `null` = use LAGU SUKIPT). Edit this to add or rename an institution.
- `Template Majlis Sukipt.png` — the three-flag background. The four-flag tie layout is synthesised from it; to use a hand-made 4-flag template, add the file and set `TEMPLATE4` in `presenter.html`.

## Hosted version (GitHub Pages)
Both pages ask for an access PIN once per browser (`gate.js`). Default PIN: `sukipt2026` — change it before going live: run `printf 'NEWPIN' | shasum -a 256` and paste the hash into `gate.js`. This keeps casual visitors out; it is not strong security (static hosting has no server-side login).
