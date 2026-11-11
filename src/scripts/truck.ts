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

const CLIP = "/media/roll-out.mp3"; // recorded by vic10us
const CLIP_MS = 8400;

export function rollOut({ sound = true, reduced = false } = {}) {
  if (document.querySelector(".convoy")) return;
  const el = document.createElement("div");
  el.className = "convoy" + (reduced ? " parked" : "");
  el.innerHTML = `<div class="bubble">autobots, roll out!</div>${SPRITE}`;
  // drive for as long as the clip plays
  const ms = sound ? CLIP_MS : 5200;
  el.style.setProperty("--convoy-dur", `${ms}ms`);
  document.body.appendChild(el);
  if (sound) {
    const clip = new Audio(CLIP);
    clip.volume = 0.8;
    clip.play().catch(() => { horn(); setTimeout(() => say("Autobots, roll out!"), 700); });
  }
  setTimeout(() => el.remove(), reduced ? Math.max(2600, sound ? CLIP_MS : 0) : ms);
}
