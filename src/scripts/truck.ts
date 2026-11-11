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
const DRIVE_AT = 7000; // ms into the clip where he pulls away
const DRIVE_MS = 2000; // how long the drive across takes

export function rollOut({ sound = true, reduced = false } = {}) {
  if (document.querySelector(".convoy")) return;
  const el = document.createElement("div");
  el.className = "convoy" + (reduced ? " parked" : "");
  el.innerHTML = `<div class="bubble">autobots, roll out!</div>${SPRITE}`;
  const driveMs = sound ? DRIVE_MS : 4600;
  el.style.setProperty("--drive-dur", `${driveMs}ms`);
  document.body.appendChild(el);

  let gone = false;
  const done = () => { if (!gone) { gone = true; el.remove(); } };
  const drive = (after: number) => setTimeout(() => {
    if (reduced) return setTimeout(done, 600);
    el.classList.add("go");
    el.addEventListener("animationend", (e) => { if (e.animationName === "convoy") done(); });
  }, after);
  setTimeout(done, Math.max(CLIP_MS, DRIVE_AT + DRIVE_MS) + 3000); // safety net

  if (!sound) return drive(1400);
  const clip = new Audio(CLIP);
  clip.volume = 0.8;
  // time the pull-away from when audio actually starts, not when we asked
  clip.addEventListener("playing", () => drive(DRIVE_AT), { once: true });
  clip.play().catch(() => { horn(); setTimeout(() => say("Autobots, roll out!"), 700); drive(2400); });
}
