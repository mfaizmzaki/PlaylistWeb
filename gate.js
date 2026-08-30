// Access PIN for the hosted site. Not real security (a static host has no server-side auth) — keeps casual visitors out.
// To change the PIN: run  printf 'NEWPIN' | shasum -a 256   and paste the hash below.
(async () => {
  const HASH = '7edaa5322d9f2394436def1237951390be7ffb43ff636a1beaa430193cfc3e5a', KEY = 'sukipt.gate';
  if (localStorage.getItem(KEY) === HASH) return;
  document.documentElement.style.visibility = 'hidden';
  for (;;) {
    const pin = prompt('SUKIPT 2026 · Masukkan PIN akses / Enter access PIN');
    if (pin === null) { document.body.innerHTML = ''; return; }
    const h = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pin.trim())))].map(b => b.toString(16).padStart(2, '0')).join('');
    if (h === HASH) { localStorage.setItem(KEY, HASH); document.documentElement.style.visibility = ''; return; }
  }
})();
