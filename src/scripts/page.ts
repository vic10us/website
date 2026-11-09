import { host, user } from "../data/site";

const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector<T>(s)!;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const PS = `${user}@${host}:~$`;

/* ---------- storage (best effort) ---------- */
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

/* ---------- easter egg registry ---------- */
const EGGS: Record<string, string> = {
  "white-rabbit": "followed the white rabbit",
  "wake-up": "got a wake-up call",
  stay: "decoded the cursor",
  "turbo-boost": "hit turbo boost",
  whisper: "engaged whisper mode",
  hangar: "found the hangar",
  "roll-out": "rolled out",
  tars: "tuned TARS",
  "fist-my-bump": "fist my bump",
  amaze: "amaze amaze amaze",
  sudo: "tried sudo",
  "rm-rf": "deleted everything (sort of)",
  konami: "+30 lives",
  energon: "read the source",
  xyzzy: "said the magic word",
};
const found = new Set<string>(JSON.parse(store.get("vic10us.eggs") || "[]"));
function award(id: string) {
  if (!(id in EGGS) || found.has(id)) return;
  found.add(id);
  store.set("vic10us.eggs", JSON.stringify([...found]));
  toast(`★ achievement: ${EGGS[id]} (${found.size}/${Object.keys(EGGS).length})`);
}
function toast(msg: string) {
  const t = document.createElement("div");
  t.textContent = msg;
  Object.assign(t.style, {
    position: "fixed", left: "50%", top: "64px", transform: "translateX(-50%)", zIndex: "60",
    background: "var(--panel)", border: "1px solid var(--fg)", color: "var(--hi)", padding: "6px 14px",
    font: "13px var(--mono)", boxShadow: "0 0 20px #2bff6a44", transition: "opacity .5s",
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; setTimeout(() => t.remove(), 600); }, 2600);
}

/* ---------- console hello for the curious ---------- */
console.log(
  "%cvic10us%c\nlooking under the hood? the backtick key opens a door.\npsst… adventurers know the magic word.",
  "color:#7dffa1;font:bold 20px monospace;text-shadow:0 0 6px #2bff6a",
  "color:#4a8a5d;font:12px monospace",
);

/* ---------- boot + typewriter ---------- */
const bootEl = $("#boot");
const bootLines: string[] = JSON.parse(bootEl.dataset.lines || "[]");
function boot() {
  bootEl.textContent = "";
  bootLines.forEach((l, i) => setTimeout(() => { bootEl.textContent += l + "\n"; }, reduced ? 0 : 260 * (i + 1)));
}
boot();

const typed = $("#typed");
const words: string[] = JSON.parse(typed.dataset.words || "[]");
let paused = false;
if (!reduced) {
  let wi = 0, ci = 0, del = false;
  const tick = () => {
    if (!paused) {
      const w = words[wi];
      typed.textContent = "> " + w.slice(0, ci);
      if (!del && ci < w.length) { ci++; return setTimeout(tick, 90); }
      if (!del) { del = true; return setTimeout(tick, 1500); }
      if (ci > 0) { ci--; return setTimeout(tick, 40); }
      del = false; wi = (wi + 1) % words.length;
    }
    setTimeout(tick, 300);
  };
  tick();
}

const t0 = Date.now();
const up = $("#up");
setInterval(() => {
  const s = Math.floor((Date.now() - t0) / 1000);
  up.textContent = s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}, 1000);

/* ---------- Interstellar: cursor blinks morse ---------- */
const MORSE: Record<string, string> = { S: "...", T: "-", A: ".-", Y: "-.--" };
function morse(word: string) {
  const c = $("#cursor");
  c.classList.remove("blink");
  const seq: [boolean, number][] = [];
  for (const ch of word) {
    for (const s of MORSE[ch]) { seq.push([true, s === "." ? 180 : 540]); seq.push([false, 180]); }
    seq.push([false, 540]);
  }
  let i = 0;
  const step = () => {
    if (i >= seq.length) { c.classList.remove("off"); c.classList.add("blink"); return; }
    const [on, ms] = seq[i++];
    c.classList.toggle("off", !on);
    setTimeout(step, ms);
  };
  step();
}
if (!reduced) { setTimeout(() => morse("STAY"), 15000); setInterval(() => morse("STAY"), 60000); }

/* ---------- Matrix: idle wake-up ---------- */
let idleT: number | undefined;
const resetIdle = () => { clearTimeout(idleT); idleT = window.setTimeout(wake, 45000); };
["mousemove", "keydown", "scroll", "touchstart"].forEach((ev) => addEventListener(ev, resetIdle, { passive: true }));
resetIdle();
function wake() {
  if (shell.classList.contains("open")) return;
  paused = true;
  const msg = "> wake up…";
  let i = 0;
  const s = () => {
    typed.textContent = msg.slice(0, i++);
    if (i <= msg.length) setTimeout(s, 150);
    else setTimeout(() => { paused = false; }, 2500);
  };
  s();
  award("wake-up");
}

/* ---------- glass-button opens its demo ---------- */
document.getElementById("gb")?.addEventListener("click", () => {
  window.open("https://vic10us.github.io/glass-button/", "_blank", "noopener");
});

/* ---------- shell ---------- */
const shell = $("#shell");
const out = $("#out");
const inp = $<HTMLInputElement>("#in");
const scan = $("#scan");
let humor = Number(store.get("vic10us.humor") || 60);
let whisper = false;
const hist: string[] = [];
let hi = -1;

function print(t: string, cls?: string) {
  const d = document.createElement("div");
  if (cls) d.className = cls;
  d.textContent = t;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}
function openShell() {
  shell.classList.add("open");
  shell.setAttribute("aria-hidden", "false");
  setTimeout(() => inp.focus(), 60);
  if (!out.childElementCount) {
    print("vic10us-os 4.2.0 (tty1)\nlast login: from somewhere on the internet\ntype 'help' to get started.", "dim");
  }
}
function closeShell() {
  shell.classList.remove("open");
  shell.setAttribute("aria-hidden", "true");
  inp.blur();
}
const think = (ms: number) => new Promise<void>((r) => { scan.classList.add("on"); setTimeout(() => { scan.classList.remove("on"); r(); }, ms); });
const snark = (plain: string, mid: string, high: string) => (humor < 35 ? plain : humor < 80 ? mid : high);
const goTo = (id: string) => { closeShell(); document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); };

const ghostHistory = ["ls -a ~/lab", "cat ~/lab/.white-rabbit", "whisper mode", "tars --humor 75", "roll out", "turbo boost", "cat .achievements"];
const SECTIONS = ["work", "prints", "streaming", "lab", "deprecated", "socials"];
const FILES: Record<string, () => void> = {
  ".white-rabbit": () => { print("follow me."); award("white-rabbit"); setTimeout(() => rain(), 700); },
  ".plan": () => print("1. build things\n2. help others build things\n3. ???\n4. print another filament holder"),
  ".achievements": () => {
    const all = Object.entries(EGGS);
    print(`found ${found.size} of ${all.length}\n` + all.map(([id, label]) => (found.has(id) ? `  [x] ${label}` : "  [ ] ???")).join("\n"));
  },
  ".energon": () => { print("cube integrity: 100%\nautobots would be proud.", "ok"); award("energon"); },
  ".contact": () => goTo("socials"),
  "prints.log": () => goTo("prints"),
};

const cmds: Record<string, (a: string[]) => void> = {
  help: () => print(
    "available commands:\n" +
    "  whoami            who runs this place\n" +
    "  ls [-a] [dir]     list things\n" +
    "  cat <file>        read a file\n" +
    "  cd <dir>          go somewhere\n" +
    "  goto <section>    " + SECTIONS.join(" | ") + "\n" +
    "  clear | exit\n" +
    "\n(there's also `history`, if you're the nosy type.)",
  ),
  whoami: () => print(snark("engineer · streamer · diy-er", "engineer · streamer · diy-er · professional button-presser", "a carbon-based unit with too many side projects")),
  history: () => {
    const rows = [...ghostHistory, ...hist].map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`);
    print(rows.join("\n"));
  },
  clear: () => { out.innerHTML = ""; },
  exit: () => closeShell(),
  pwd: () => print(`/home/${user}`),
  ls: (a) => {
    const all = a.some((x) => x.startsWith("-") && x.includes("a"));
    const dir = a.find((x) => !x.startsWith("-")) || "~";
    if (/lab\/?$/.test(dir)) print("deprecated/  old-components/" + (all ? "  .white-rabbit  .hangar/" : ""));
    else if (/hangar/.test(dir)) cmds.cd(["hangar"]);
    else if (/projects/.test(dir)) print("glass-button/  amass-conductor/  QiDiBoxRFID/  stealthburner-cr10/");
    else print("projects/  prints.log  streaming/  lab/" + (all ? "  .plan  .contact  .achievements" : ""));
  },
  cat: (a) => {
    const f = (a[0] || "").replace(/^(~\/)?(lab\/)?/, "");
    if (FILES[f]) FILES[f]();
    else print(`cat: ${a[0] || "?"}: no such file`, "err");
  },
  cd: (a) => {
    const d = (a[0] || "").replace(/^(~\/)?(lab\/)?\.?/, "").replace(/\/$/, "");
    if (d === "hangar") { print("ACCESS DENIED.\nclearance: Archangel only.", "err"); award("hangar"); }
    else if (SECTIONS.includes(d) || d === "projects") goTo(d === "projects" ? "work" : d);
    else print("you are already where you need to be.", "dim");
  },
  goto: (a) => (SECTIONS.includes(a[0]) ? goTo(a[0]) : print("goto: unknown section. try: " + SECTIONS.join(", "), "err")),
  open: (a) => {
    const el = a[0] && document.querySelector(`[data-slug="${a[0].toLowerCase()}"] a`) as HTMLAnchorElement | null;
    if (el) { print(`opening ${a[0]}…`); window.open(el.href, "_blank", "noopener"); }
    else print("open: which project? try `ls ~/projects`", "err");
  },
  sudo: () => { print(snark("permission denied.", "nice try.", "nice try. this incident will be reported."), "err"); award("sudo"); },
  rm: (a) => {
    if (!a.join(" ").includes("-rf")) return print("rm: careful with that.", "dim");
    print("deleting / …", "err");
    award("rm-rf");
    setTimeout(() => {
      closeShell();
      const p = $("#page");
      p.animate(
        [{ filter: "none", transform: "none", opacity: 1 }, { filter: "hue-rotate(90deg) blur(1px)", transform: "skewX(4deg)", offset: 0.3 }, { filter: "blur(6px) brightness(.1)", transform: "translateY(60vh) skewX(-8deg)", opacity: 0 }],
        { duration: reduced ? 1 : 1600, easing: "ease-in" },
      ).onfinish = () => { scrollTo(0, 0); boot(); };
    }, 700);
  },
  amaze: () => { print("amaze amaze amaze"); chord([523, 659, 784]); award("amaze"); },
  tars: (a) => {
    const i = a.indexOf("--humor");
    const v = parseInt(a[i + 1]);
    if (i < 0 || isNaN(v)) return print(`humor setting: ${humor}%`);
    humor = Math.max(0, Math.min(100, v));
    store.set("vic10us.humor", String(humor));
    print(humor >= 90 ? `humor set to ${humor}%. self-destruct in T-minus 10… 9… kidding.` : `humor set to ${humor}%.`);
    award("tars");
  },
  stay: () => { print("message received. staying put.", "ok"); award("stay"); },
  xyzzy: () => { print("Nothing happens.", "dim"); award("xyzzy"); },
  echo: (a) => print(a.join(" ")),
  date: () => print(new Date().toString()),
  uname: () => print("vic10us-os 4.2.0 lab-eridani x86_64 GNU/Garage"),
};
const phrases: Record<string, () => void> = {
  "whisper mode": () => {
    whisper = !whisper;
    document.body.classList.toggle("whisper", whisper);
    print(whisper ? "whisper mode: engaged." : "whisper mode: off.");
    award("whisper");
  },
  "turbo boost": () => {
    print("TURBO BOOST.");
    award("turbo-boost");
    setTimeout(() => {
      closeShell();
      $("#page").animate(
        [{ transform: "none" }, { transform: "translateY(-40vh) rotate(-1deg)", offset: 0.45 }, { transform: "none" }],
        { duration: reduced ? 1 : 1100, easing: "cubic-bezier(.5,-0.4,.3,1.4)" },
      );
    }, 300);
  },
  "roll out": () => {
    print("transforming…");
    award("roll-out");
    setTimeout(() => {
      closeShell();
      const g = $("#cards");
      const cs = [...g.children] as HTMLElement[];
      cs.forEach((c, i) => { c.style.transform = `rotateY(90deg) translateY(${i % 2 ? 30 : -30}px)`; c.style.opacity = "0.2"; });
      setTimeout(() => { cs.reverse().forEach((c) => g.appendChild(c)); cs.forEach((c) => { c.style.transform = ""; c.style.opacity = ""; }); }, 700);
    }, 300);
  },
  "fist my bump": () => { print("♪ ♫ ♪  (happy)"); chord([392, 494, 587]); setTimeout(() => chord([440, 554, 659]), 260); award("fist-my-bump"); },
};

let ac: AudioContext | undefined;
function chord(fs: number[]) {
  if (whisper) return;
  try {
    ac ??= new AudioContext();
    const now = ac.currentTime;
    fs.forEach((f) => {
      const o = ac!.createOscillator(), g = ac!.createGain();
      o.type = "triangle"; o.frequency.value = f;
      g.gain.setValueAtTime(0.07, now); g.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      o.connect(g).connect(ac!.destination); o.start(now); o.stop(now + 0.6);
    });
  } catch { /* no audio, no problem */ }
}

async function run(line: string) {
  const raw = line.trim();
  if (!raw) return;
  hist.push(raw);
  print(`${PS} ${raw}`, "dim");
  await think(reduced ? 0 : 220 + Math.random() * 380);
  const low = raw.toLowerCase().replace(/\s+/g, " ");
  if (phrases[low]) return phrases[low]();
  const [c, ...a] = raw.split(/\s+/);
  const fn = cmds[c.toLowerCase()];
  if (fn) fn(a);
  else print(snark(`${c}: command not found`, `${c}: command not found. try 'help'.`, `${c}? never heard of it. and I've heard of everything.`), "err");
}

$("#inrow").addEventListener("submit", (e) => { e.preventDefault(); run(inp.value); inp.value = ""; hi = -1; });
inp.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && hist.length) { hi = hi < 0 ? hist.length - 1 : Math.max(0, hi - 1); inp.value = hist[hi]; e.preventDefault(); }
  else if (e.key === "ArrowDown" && hi >= 0) { hi = Math.min(hist.length, hi + 1); inp.value = hist[hi] ?? ""; e.preventDefault(); }
  else if (e.key === "Escape") closeShell();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "`" && document.activeElement !== inp) { e.preventDefault(); shell.classList.contains("open") ? closeShell() : openShell(); }
});
$("#shell-hint").addEventListener("click", openShell);
$("#shell-close").addEventListener("click", closeShell);

/* ---------- Konami ---------- */
const K = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let kp = 0;
document.addEventListener("keydown", (e) => {
  kp = e.key === K[kp] ? kp + 1 : e.key === K[0] ? 1 : 0;
  if (kp === K.length) { kp = 0; openShell(); print("+30 lives. you'll need them.", "ok"); award("konami"); }
});

/* ---------- Matrix rain ---------- */
let rafId = 0;
function rain() {
  if (reduced) return;
  const cv = $<HTMLCanvasElement>("#rain");
  const ctx = cv.getContext("2d")!;
  closeShell();
  cv.width = innerWidth; cv.height = innerHeight;
  cv.classList.add("on");
  const fs = 16, cols = Math.floor(cv.width / fs);
  const y = Array.from({ length: cols }, () => Math.random() * -50);
  const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789VIC10US";
  let on = true;
  const f = () => {
    ctx.fillStyle = "rgba(0,0,0,.08)"; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#3dff7a"; ctx.font = fs + "px monospace";
    y.forEach((v, i) => {
      ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, v * fs);
      y[i] = v * fs > cv.height && Math.random() > 0.975 ? 0 : v + 1;
    });
    if (on) rafId = requestAnimationFrame(f);
  };
  cancelAnimationFrame(rafId);
  f();
  setTimeout(() => { cv.classList.remove("on"); setTimeout(() => { on = false; ctx.clearRect(0, 0, cv.width, cv.height); }, 800); }, 7000);
}
