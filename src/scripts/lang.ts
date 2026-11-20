// Suggest (never force) the visitor's language when this page is in another one.
import { locales, home, ui, type Locale } from "../i18n";
import { pageLocale } from "../i18n/shell";

const KEY = "vic10us.lang-hint";
const current = pageLocale();
let dismissed = false;
try { dismissed = localStorage.getItem(KEY) === "1"; } catch { /* storage blocked */ }

const wanted = (navigator.languages || [navigator.language])
  .map((l) => l.slice(0, 2).toLowerCase())
  .find((l): l is Locale => (locales as readonly string[]).includes(l));

if (!dismissed && wanted && wanted !== current) {
  const t = ui[wanted].suggest;
  const bar = document.createElement("div");
  bar.className = "lang-hint";
  bar.lang = wanted;
  bar.innerHTML = `<span></span> <a></a> <button type="button">×</button>`;
  bar.querySelector("span")!.textContent = t.text;
  const a = bar.querySelector("a")!;
  a.href = home(wanted);
  a.hreflang = wanted;
  a.textContent = `${t.go} →`;
  const close = bar.querySelector("button")!;
  close.setAttribute("aria-label", t.dismiss);
  close.addEventListener("click", () => {
    try { localStorage.setItem(KEY, "1"); } catch { /* fine */ }
    bar.remove();
  });
  document.querySelector("nav.top")?.after(bar);
}
