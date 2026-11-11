// "roll out": an original red-and-blue cab-over semi drives across the screen,
// honks, and announces itself. Built on demand, removed when it's gone.

const TRUCK_SVG = `
<svg viewBox="0 0 220 130" width="220" height="130" aria-hidden="true">
  <g class="body">
    <!-- exhaust stacks -->
    <rect x="104" y="4" width="6" height="56" rx="2" fill="#cfd6dc"/>
    <rect x="113" y="0" width="6" height="60" rx="2" fill="#e8edf1"/>
    <!-- frame -->
    <rect x="6" y="86" width="190" height="12" rx="2" fill="#1e3a8a"/>
    <rect x="10" y="80" width="40" height="8" rx="2" fill="#475569"/>
    <!-- sleeper -->
    <path d="M58 40 h48 v50 h-48 z" fill="#2457d6"/>
    <rect x="62" y="48" width="38" height="5" fill="#1e3a8a"/>
    <rect x="62" y="58" width="38" height="5" fill="#1e3a8a"/>
    <!-- fuel tank -->
    <rect x="64" y="84" width="40" height="14" rx="7" fill="#d4dbe1"/>
    <rect x="64" y="89" width="40" height="2" fill="#9aa5ae"/>
    <!-- cab -->
    <path d="M104 16 h76 q8 0 8 8 v70 h-84 z" fill="#d61f26"/>
    <rect x="104" y="62" width="84" height="6" fill="#a3161b"/>
    <!-- windows -->
    <path d="M144 24 h36 q4 0 4 4 v26 h-40 z" fill="#8fd3ff"/>
    <path d="M150 28 l12 0 l-14 22 l-4 0 z" fill="#ffffff" opacity=".55"/>
    <rect x="112" y="26" width="26" height="22" rx="2" fill="#8fd3ff"/>
    <!-- grille + bumper -->
    <rect x="186" y="58" width="10" height="34" rx="2" fill="#c7d0d8"/>
    <rect x="188" y="61" width="6" height="2" fill="#7b8790"/>
    <rect x="188" y="66" width="6" height="2" fill="#7b8790"/>
    <rect x="188" y="71" width="6" height="2" fill="#7b8790"/>
    <rect x="188" y="76" width="6" height="2" fill="#7b8790"/>
    <rect x="188" y="81" width="6" height="2" fill="#7b8790"/>
    <rect x="180" y="92" width="22" height="8" rx="2" fill="#dfe5ea"/>
    <!-- lights -->
    <rect x="190" y="50" width="8" height="6" rx="1" fill="#fff6b0"/>
    <rect x="128" y="12" width="6" height="4" rx="1" fill="#ffb347"/>
    <rect x="150" y="12" width="6" height="4" rx="1" fill="#ffb347"/>
    <rect x="172" y="12" width="6" height="4" rx="1" fill="#ffb347"/>
  </g>
  <!-- wheels -->
  <g class="wheel" style="transform-origin:34px 104px"><circle cx="34" cy="104" r="17" fill="#111"/><circle cx="34" cy="104" r="8" fill="#b8c2ca"/><rect x="32" y="90" width="4" height="28" fill="#111" opacity=".6"/></g>
  <g class="wheel" style="transform-origin:72px 104px"><circle cx="72" cy="104" r="17" fill="#111"/><circle cx="72" cy="104" r="8" fill="#b8c2ca"/><rect x="70" y="90" width="4" height="28" fill="#111" opacity=".6"/></g>
  <g class="wheel" style="transform-origin:160px 104px"><circle cx="160" cy="104" r="17" fill="#111"/><circle cx="160" cy="104" r="8" fill="#b8c2ca"/><rect x="158" y="90" width="4" height="28" fill="#111" opacity=".6"/></g>
</svg>`;

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
  el.innerHTML = `<div class="bubble">autobots, roll out!</div>${TRUCK_SVG}`;
  document.body.appendChild(el);
  if (sound) {
    horn();
    setTimeout(() => say("Autobots, roll out!"), 700);
  }
  const ms = reduced ? 2600 : 5200;
  setTimeout(() => el.remove(), ms);
}
