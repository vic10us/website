import { host, user } from "../data/site";
import { shellText, pageLocale } from "../i18n/shell";
import { locales, home, langName, isLocale } from "../i18n";

const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector<T>(s)!;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const PS = `${user}@${host}:~$`;
const LOC = pageLocale();
const T = shellText[LOC];

/* ---------- storage (best effort) ---------- */
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

/* ---------- easter egg registry ---------- */
const EGGS: Record<string, string> = T.eggs;
const DOOM_GATE = 10;
const found = new Set<string>(JSON.parse(store.get("vic10us.eggs") || "[]"));
function award(id: string) {
  if (!(id in EGGS) || found.has(id)) return;
  found.add(id);
  store.set("vic10us.eggs", JSON.stringify([...found]));
  toast(T.achievement(EGGS[id], found.size, Object.keys(EGGS).length));
}
function toast(msg: string) {
  const t = document.createElement("div");
  t.textContent = msg;
  Object.assign(t.style, {
    position: "fixed", left: "50%", top: "64px", transform: "translateX(-50%)", zIndex: "80",
    background: "var(--panel)", border: "1px solid var(--fg)", color: "var(--hi)", padding: "6px 14px",
    font: "13px var(--mono)", boxShadow: "0 0 20px #2bff6a44", transition: "opacity .5s",
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; setTimeout(() => t.remove(), 600); }, 2600);
}

/* ---------- console hello for the curious ---------- */
console.log(
  "%cvic10us%c\n" + T.hello,
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
let signalling = false; // morse in progress: hold the typewriter
if (!reduced) {
  let wi = 0, ci = 0, del = false;
  const tick = () => {
    if (signalling) return setTimeout(tick, 300);
    const w = words[wi];
    typed.textContent = "> " + w.slice(0, ci);
    if (!del && ci < w.length) { ci++; return setTimeout(tick, 90); }
    if (!del) { del = true; return setTimeout(tick, 1500); }
    if (ci > 0) { ci--; return setTimeout(tick, 40); }
    del = false; wi = (wi + 1) % words.length;
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
const cursor = $("#cursor");
function morse(word: string) {
  if (signalling) return;
  signalling = true;
  cursor.classList.remove("blink");
  cursor.classList.add("morse");
  // the tagline spells out each symbol as the cursor blinks it
  typed.textContent = "> ";
  typed.classList.add("morse-text");
  const U = 300; // one morse unit
  const seq: [string, number][] = [["", 3 * U]];
  for (const ch of word) {
    for (const s of MORSE[ch]) { seq.push([s, s === "." ? U : 3 * U]); seq.push(["", U]); }
    seq.push([" ", 2 * U]);
  }
  let i = 0;
  const step = () => {
    if (i >= seq.length) {
      cursor.classList.remove("off", "morse");
      cursor.classList.add("blink");
      // let it linger before the typewriter takes the line back
      setTimeout(() => { typed.classList.remove("morse-text"); signalling = false; }, 2500);
      return;
    }
    const [sym, ms] = seq[i++];
    const on = sym === "." || sym === "-";
    cursor.classList.toggle("off", !on);
    if (sym) typed.textContent += sym === " " ? "  " : sym;
    setTimeout(step, ms);
  };
  step();
}
if (reduced) {
  cursor.title = word2morse("STAY");
} else {
  // only signal while someone can actually see the cursor
  let inView = false, last = 0;
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(cursor);
  const t0m = Date.now();
  setInterval(() => {
    const now = Date.now();
    if (!inView || document.hidden || now - t0m < 10000 || now - last < 45000) return;
    last = now;
    morse("STAY");
  }, 1000);
}
function word2morse(w: string) { return [...w].map((c) => MORSE[c]).join(" "); }

/* ---------- Matrix: idle wake-up ---------- */
let idleT: number | undefined;
let waking = false;
const resetIdle = () => { clearTimeout(idleT); idleT = window.setTimeout(wake, 45000); };
["mousemove", "keydown", "scroll", "touchstart"].forEach((ev) => addEventListener(ev, resetIdle, { passive: true }));
// a hidden tab doesn't count: wait until they're looking again
document.addEventListener("visibilitychange", () => { if (!document.hidden) resetIdle(); });
resetIdle();
function wake() {
  if (waking || document.hidden || shell.classList.contains("open")) return;
  waking = true;
  const lines = T.wake;
  const ov = document.createElement("div");
  ov.className = "wake";
  ov.setAttribute("role", "status");
  const pre = document.createElement("pre");
  ov.appendChild(pre);
  document.body.appendChild(ov);
  let li = 0, ci = 0, done = false;
  const type = () => {
    if (done || li >= lines.length) return;
    if (ci <= lines[li].length) {
      pre.textContent = lines.slice(0, li).join("\n") + (li ? "\n" : "") + lines[li].slice(0, ci++);
      setTimeout(type, reduced ? 0 : 110);
    } else { li++; ci = 0; setTimeout(type, reduced ? 0 : 1400); }
  };
  type();
  award("wake-up");
  // stays until they come back; ignore the jitter of the very next instant
  const dismiss = () => {
    done = true;
    ["mousemove", "keydown", "pointerdown", "touchstart", "scroll"].forEach((ev) => removeEventListener(ev, dismiss));
    ov.classList.add("out");
    setTimeout(() => { ov.remove(); waking = false; }, reduced ? 0 : 500);
  };
  setTimeout(() => ["mousemove", "keydown", "pointerdown", "touchstart", "scroll"].forEach((ev) => addEventListener(ev, dismiss, { passive: true })), 600);
}

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
    print(T.banner, "dim");
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
const SECTIONS = ["work", "components", "prints", "streaming", "lab", "deprecated", "socials"];
const FILES: Record<string, () => void> = {
  ".white-rabbit": () => { print(T.rabbit); award("white-rabbit"); setTimeout(() => rain(), 700); },
  ".plan": () => print(T.plan),
  ".rocky": () => { print("♪ ♫ ♪ ♫ ♪"); chord([523, 659, 784]); setTimeout(() => print(T.rockyTranslation, "dim"), 700); },
  ".achievements": () => {
    const all = Object.entries(EGGS);
    print(T.found(found.size, all.length) + "\n" + all.map(([id, label]) => (found.has(id) ? `  [x] ${label}` : id === "doom" ? `  [ ] ${T.doomSlot(DOOM_GATE)}` : "  [ ] ???")).join("\n"));
  },
  ".energon": () => { print(T.energon, "ok"); award("energon"); },
  ".contact": () => goTo("socials"),
  "prints.log": () => goTo("prints"),
};

const cmds: Record<string, (a: string[]) => void> = {
  help: () => print(T.help([...document.querySelectorAll("nav.top > a")].map((a) => a.textContent).join(" | "))),
  whoami: () => print(snark(...T.whoami)),
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
    else if (/projects/.test(dir)) print("parley/  rock-atlas/  amass-conductor/  QiDiBoxRFID/  stealthburner-cr10/");
    else if (/^(~\/)?components\/?$/.test(dir)) print("glass-button/");
    else if (/old-components/.test(dir)) print("terminal-text  paper-search-input  cc-form  stripe-form  progress-check-mark  profile-card");
    else print("projects/  components/  prints.log  streaming/  lab/" + (all ? "  .plan  .rocky  .contact  .achievements" : ""));
  },
  cat: (a) => {
    const f = (a[0] || "").replace(/^(~\/)?(lab\/)?/, "");
    if (FILES[f]) FILES[f]();
    else print(T.noFile(a[0] || "?"), "err");
  },
  cd: (a) => {
    const raw = (a[0] || "").replace(/^(~\/)?(lab\/)?\.?/, "").replace(/\/$/, "");
    const d = T.aliases[raw.toLowerCase()] ?? raw;
    if (d === "hangar") { print(T.hangar, "err"); award("hangar"); }
    else if (SECTIONS.includes(d) || d === "projects") goTo(d === "projects" ? "work" : d);
    else print(T.alreadyHere, "dim");
  },
  goto: (a) => {
    const id = T.aliases[(a[0] || "").toLowerCase()] ?? a[0];
    SECTIONS.includes(id) ? goTo(id) : print(T.unknownSection([...document.querySelectorAll("nav.top > a")].map((a) => a.textContent).join(", ")), "err");
  },
  open: (a) => {
    const el = a[0] && document.querySelector(`[data-slug="${a[0].toLowerCase()}"] a`) as HTMLAnchorElement | null;
    if (el) { print(T.opening(a[0])); window.open(el.href, "_blank", "noopener"); }
    else print(T.openWhich, "err");
  },
  sudo: () => { print(snark(...T.sudo), "err"); award("sudo"); },
  rm: (a) => {
    if (!a.join(" ").includes("-rf")) return print(T.rmCareful, "dim");
    print(T.deleting, "err");
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
    if (i < 0 || isNaN(v)) return print(T.humorIs(humor));
    humor = Math.max(0, Math.min(100, v));
    store.set("vic10us.humor", String(humor));
    print(humor >= 90 ? T.humorHigh(humor) : T.humorSet(humor));
    award("tars");
  },
  stay: () => { print(T.stay, "ok"); award("stay"); },
  xyzzy: () => { print(T.xyzzy, "dim"); award("xyzzy"); },
  iddqd: () => print(T.iddqd, "dim"),
  idkfa: () => {
    const keys = [...found].filter((id) => id !== "doom").length;
    if (keys < DOOM_GATE) return print(T.idkfaLocked(keys, DOOM_GATE), "err");
    if (matchMedia("(pointer: coarse)").matches && !matchMedia("(any-pointer: fine)").matches) return print(T.idkfaKeyboard, "err");
    print(T.idkfaOk, "ok");
    award("doom");
    setTimeout(() => { closeShell(); import("./doom").then((m) => m.launch({ bar: T.doomBar, quit: T.doomQuit })); }, 600);
  },
  credits: () => print(T.credits, "dim"),
  lang: (a) => {
    const l = (a[0] || "").toLowerCase();
    if (!isLocale(l)) return print(T.langUsage(locales.join("|")), "err");
    if (l === LOC) return print(T.alreadyHere, "dim");
    print(T.langSwitch(langName[l]), "ok");
    setTimeout(() => { location.href = home(l); }, 500);
  },
  echo: (a) => print(a.join(" ")),
  date: () => print(new Date().toString()),
  uname: () => print("vic10us-os 4.2.0 lab-eridani x86_64 GNU/Garage"),
};
const phrases: Record<string, () => void> = {
  "whisper mode": () => {
    whisper = !whisper;
    document.body.classList.toggle("whisper", whisper);
    print(whisper ? T.whisperOn : T.whisperOff);
    award("whisper");
  },
  "turbo boost": () => {
    print(T.turbo);
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
    print(T.transforming);
    award("roll-out");
    setTimeout(() => {
      closeShell();
      import("./truck").then((m) => m.rollOut({ sound: !whisper, reduced }));
    }, 300);
  },
  "autobots roll out": () => phrases["roll out"](),
  "autobots, roll out": () => phrases["roll out"](),
  "autobots, roll out!": () => phrases["roll out"](),
  "fist my bump": () => { print(T.happy); chord([392, 494, 587]); setTimeout(() => chord([440, 554, 659]), 260); award("fist-my-bump"); },
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
  else print(snark(...T.notFound(c)), "err");
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
  if (kp === K.length) { kp = 0; openShell(); print(T.konami, "ok"); award("konami"); }
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
