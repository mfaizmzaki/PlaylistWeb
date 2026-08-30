// Shared medal-slide layout for presenter.html (static preview) and public.html (animated projector).
// Coordinates are measured on the 960x540 "Template Majlis Sukipt.png"; canvases are 1920x1080 (K = 2).
(function () {
  const K = 2;
  // Flag cloth rectangles (x0,y0,x1,y1) on the 3-flag template.
  const FLAG3 = { silver:[45,195,300,355], gold:[335,140,600,300], bronze:[628,218,895,385] };
  // One flag (middle one, rod + strings) cropped from the template; used to synthesise the 4-flag tie layout.
  // ponytail: replace with a real 4-flag template later by drawing it in drawBase instead of these sprites.
  const SPRITE = { x:326, y:0, w:286, h:318, cloth:[9,140,274,300], strings:100 };
  // Hi-res SUKIPT logo drawn over the template's baked-in (blurry) copy at the same spot.
  const LOGO = new Image(); LOGO.src = 'sukipt-logo.png';
  const LOGO_BOX = [590, 430, 932, 518];
  const TIE_SLOTS = [ ['silver',25,205,110], ['gold',238,250,50], ['bronze',496,205,140], ['bronze2',709,205,140] ]; // medal, x, width, rod drop

  // Draw the template (cover-fit) and, for a tie, four synthesised flags. Returns {medal: [x0,y0,x1,y1]} cloth rects in canvas px.
  // opts.eraseCloth: paint the cloth areas white (the animated renderer draws its own cloth on top).
  function drawBase(ctx, tpl, tie, opts = {}) {
    const W = 1920, H = 1080, a = tpl.width / tpl.height, ca = W / H;
    let sx = 0, sy = 0, sw = tpl.width, sh = tpl.height;
    if (a > ca) { sw = tpl.height * ca; sx = (tpl.width - sw) / 2; } else { sh = tpl.width / ca; sy = (tpl.height - sh) / 2; }
    ctx.drawImage(tpl, sx, sy, sw, sh, 0, 0, W, H);
    if (LOGO.complete && LOGO.naturalWidth) {
      const [lx0, ly0, lx1, ly1] = LOGO_BOX.map(v => v * K);
      ctx.fillStyle = '#fff'; ctx.fillRect(lx0 - 4, ly0 - 4, lx1 - lx0 + 8, ly1 - ly0 + 8);
      drawContained(ctx, LOGO, lx0, ly0, lx1, ly1, 0);
    }
    const rects = {};
    if (!tie) {
      for (const m in FLAG3) rects[m] = FLAG3[m].map(v => v * K);
    } else {
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 885 * K, 400 * K); ctx.fillRect(885 * K, 140 * K, 30 * K, 260 * K);
      for (const [m, x, w, drop] of TIE_SLOTS) {
        const sc = w / SPRITE.w;
        ctx.drawImage(tpl, SPRITE.x, SPRITE.y, SPRITE.w, SPRITE.strings, x * K, 0, w * K, (drop + SPRITE.strings * sc) * K);
        ctx.drawImage(tpl, SPRITE.x, SPRITE.y, SPRITE.w, SPRITE.h, x * K, drop * K, w * K, SPRITE.h * sc * K);
        const [cx0, cy0, cx1, cy1] = SPRITE.cloth;
        rects[m] = [x + cx0 * sc, drop + cy0 * sc, x + cx1 * sc, drop + cy1 * sc].map(v => v * K);
      }
    }
    if (opts.eraseCloth) {
      ctx.fillStyle = '#fff';
      for (const m in rects) { const [x0, y0, x1, y1] = rects[m]; ctx.fillRect(x0 - 6, y0 + 6, x1 - x0 + 12, y1 - y0 + 30); }
    }
    return rects;
  }

  function drawContained(ctx, img, x0, y0, x1, y1, inset) {
    const w = (x1 - x0) * (1 - 2 * inset), h = (y1 - y0) * (1 - 2 * inset);
    const s = Math.min(w / img.width, h / img.height), dw = img.width * s, dh = img.height * s;
    ctx.drawImage(img, (x0 + x1) / 2 - dw / 2, (y0 + y1) / 2 - dh / 2, dw, dh);
  }

  // Offscreen canvas of one cloth (template shading + logo), exactly the rect size plus a margin so the wave has room.
  function makeCloth(tpl, tie, rect, logo) {
    const [x0, y0, x1, y1] = rect, w = x1 - x0, h = y1 - y0;
    const c = document.createElement('canvas'); c.width = w + 12; c.height = h + 30;
    const ctx = c.getContext('2d');
    ctx.translate(-(x0 - 6), -(y0 - 6));
    drawBase(ctx, tpl, tie);                       // cheap: we only keep the cloth area
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (logo) drawContained(ctx, logo, 6, 6, w + 6, h + 6, 0.12);
    return c;
  }

  // Hanging-banner flutter: rows pinned at the rod, sway grows toward the free bottom edge.
  function drawWaving(ctx, cloth, rect, t, phase) {
    const [x0, y0] = rect, H = cloth.height, step = 3;
    for (let y = 0; y < H; y += step) {
      const p = y / H;
      // ponytail: amplitude/speed tuned by eye for "just a feel"; raise the 4 / 1.5 for a windier flag
      const dx = (4 * Math.sin(y / 48 - t * 1.6 + phase) + 1.5 * Math.sin(y / 14 + t * 2.2 + phase)) * p * p;
      const dy = 1 * Math.sin(y / 36 - t * 1.4 + phase) * p;
      ctx.drawImage(cloth, 0, y, cloth.width, step + 1, x0 - 6 + dx, y0 - 6 + y + dy, cloth.width, step + 1); // +1 overlap hides seams
    }
  }

  // Sport pictogram + name, lower-left (over the faint decorative arcs).
  function drawSport(ctx, img, name) {
    if (img) drawContained(ctx, img, 50 * K, 410 * K, 190 * K, 500 * K, 0);
    if (name) {
      ctx.save(); ctx.fillStyle = '#001f5b'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.font = 'bold ' + 17 * K + 'px Oswald, "Segoe UI", Arial, sans-serif';
      ctx.fillText(name.toUpperCase(), 120 * K, 506 * K); ctx.restore();
    }
  }

  window.Medal = { drawBase, drawContained, makeCloth, drawWaving, drawSport, logo: LOGO };
})();
