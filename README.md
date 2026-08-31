# SUKIPT 2026 · Presenter Cockpit

Two browser tabs on the venue laptop, synced automatically:

| Tab | Where | What |
|---|---|---|
| `public.html` | drag to the projector/HDMI screen, press F11 | shows the backdrop / medal slide (no audio) |
| `presenter.html` | laptop screen | the officer's controls; **all audio plays from this tab** (connect the PA to the laptop) |

Open both by double-clicking them from the same folder, in the same browser (Chrome or Edge). No server needed.

## Medal ceremony (🏅 Medal Slide tab — the landing tab)
1. Click the **sport** (search by Malay or English name); it appears bottom-left of the slide.
2. In each box — **EMAS / PERAK / GANGSA** — click the winning university. Type a name or short code in the box's search field to narrow the grid (Enter picks the only match). Tick **Two bronze medals** if there is a bronze tie; a fourth box and flag appear.
3. Pick **Song when shown** — *Champion's anthem* (LAGU SUKIPT if that university has none on file) or *LAGU SUKIPT* — then **📺 Show on projector**: logos are placed on the flag template automatically, the slide goes live and the song starts.
4. **▶ Lagu Juara** — stops the anthem, or plays it again.
5. **🖼️ Backdrop** when the ceremony is over — the projector returns to the SUKIPT backdrop (it also shows this on start-up).
6. **🧹 Clear all** before the next event.

Every shown medal slide is also kept in the Slides tab (←/→ to step through, useful for a replay).

## Back-to-back ceremonies (🎬 Queue tab)
When several events finish at once, you no longer have to wait for one anthem to end before setting up the next medallists.

1. Build a ceremony on the Medal Slide tab exactly as above, but press **➕ Add to queue** instead of Show on projector. The medal boxes clear straight away (the sport stays — the next event is usually the same one) so you can enter the following ceremony immediately, even while a ceremony is on the projector.
2. Queue them all up, then on the **🎬 Queue** tab press **▶ Start queue**. Each ceremony puts its slide on the projector and starts its song together — the same thing Show on projector does, one button per ceremony.
3. When the medallists are ready, press **⏭ Next** on the green queue bar. It sits next to the master volume, so it is reachable from any tab, and the **N** key does the same. An accidental double-press is ignored — advancing twice inside 0.8 s would skip a ceremony.
4. Tick **Auto-advance when the song ends** to move on by itself after the chosen gap (3–30 s). It is off by default — medallists leave the podium at their own pace, so advancing is normally the officer's call. When the song finishes the queue bar says so and waits.

Per row: **▶** show that one now (jump the order), **↑ ↓** reorder, **✎** load it back into the editor to correct it (this takes it out of the queue — ➕ Add to queue puts it back), **✕** remove. The row being shown is locked while it is live.

**⏹ Stop** on the queue bar leaves the ceremonies in place so you can restart; **🧹 Clear queue** empties it. The queue is saved in the browser, so an accidental refresh mid-event does not lose it.


## Files
- `teams.js` — the 64 registered institutions: `id` (from online.sukipt.com.my), `name`, `short` (search code), `logo` (in `LogoIPT/`), `anthem` (in `music/Lagu Universiti/`, `null` = use LAGU SUKIPT). Edit this to add or rename an institution.
- `Template Majlis Sukipt.png` — the three-flag background. The four-flag tie layout is synthesised from it; to use a hand-made 4-flag template, add the file and set `TEMPLATE4` in `presenter.html`.

## Adding a university's song
1. Put the file in `music/Lagu Universiti/` (mp3 preferred; wav/mpeg also play).
2. In `teams.js`, find the institution and change `"anthem": null` to `"anthem": "music/Lagu Universiti/<file name>"`.
3. Commit and push — GitHub Pages updates within a minute. The University Songs tab and the Lagu Juara button both read `teams.js`, so nothing else changes.
