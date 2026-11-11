// "roll out": Optimus (alt mode) drives across the screen, honks, and
// announces himself. Built on demand, removed when it's gone.

// Sprite by poneley.com, used with the artist's permission.
const SPRITE = `<img class="sprite" src="/media/optimus-alt.gif" alt="" width="260" height="153" decoding="async">
<a class="credit" href="https://poneley.com/" rel="noopener">sprite: poneley.com</a>`;

function horn() {
  try {
    const ac = new AudioContext();
    const now = ac.currentTime;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.06, now + 0.04);
    g.gain.setValueAtTime(0.06, now + 0.55);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
    g.connect(ac.destination);
    [233, 311].forEach((f) => {
      const o = ac.createOscillator();
      o.type = "sawtooth"; o.frequency.value = f;
      o.connect(g); o.start(now); o.stop(now + 0.8);
    });
    setTimeout(() => ac.close(), 1200);
  } catch { /* no audio */ }
}

function say(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.pitch = 0.4; u.rate = 0.85;
    const deep = speechSynthesis.getVoices().find((v) => /en/i.test(v.lang) && /male|david|daniel|fred|alex/i.test(v.name));
    if (deep) u.voice = deep;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch { /* no speech */ }
}

export function rollOut({ sound = true, reduced = false } = {}) {
  if (document.querySelector(".convoy")) return;
  const el = document.createElement("div");
  el.className = "convoy" + (reduced ? " parked" : "");
  el.innerHTML = `<div class="bubble">autobots, roll out!</div>${SPRITE}`;
  document.body.appendChild(el);
  if (sound) {
    horn();
    setTimeout(() => say("Autobots, roll out!"), 700);
  }
  const ms = reduced ? 2600 : 5200;
  setTimeout(() => el.remove(), ms);
}
