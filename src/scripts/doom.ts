// idkfa: Doom in an isolated iframe so the engine, its globals and key capture
// all disappear when it closes. Assets live in /doom and load only on demand.
export function launch(t = { bar: "idkfa · wasd move · space fire · e use · esc menu", quit: "✕ quit to shell" }) {
  if (document.querySelector(".doom")) return;
  const ov = document.createElement("div");
  ov.className = "doom";
  ov.setAttribute("role", "dialog");
  ov.setAttribute("aria-label", "Doom");
  ov.innerHTML = `
    <div class="doom-bar"><span></span><button type="button"></button></div>
    <iframe src="/doom/index.html" title="Doom (shareware)" allow="fullscreen; autoplay"></iframe>`;
  ov.querySelector(".doom-bar span")!.textContent = t.bar;
  ov.querySelector(".doom-bar button")!.textContent = t.quit;
  document.body.appendChild(ov);
  document.documentElement.style.overflow = "hidden";
  const frame = ov.querySelector("iframe")!;
  frame.addEventListener("load", () => frame.focus());
  ov.querySelector("button")!.addEventListener("click", () => {
    ov.remove(); // drops the iframe, which stops the engine
    document.documentElement.style.overflow = "";
  });
}
