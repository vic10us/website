// idkfa: Doom in an isolated iframe so the engine, its globals and key capture
// all disappear when it closes. Assets live in /doom and load only on demand.
export function launch() {
  if (document.querySelector(".doom")) return;
  const ov = document.createElement("div");
  ov.className = "doom";
  ov.setAttribute("role", "dialog");
  ov.setAttribute("aria-label", "Doom");
  ov.innerHTML = `
    <div class="doom-bar"><span>idkfa · wasd move · space fire · e use · esc menu</span><button type="button">✕ quit to shell</button></div>
    <iframe src="/doom/index.html" title="Doom (shareware)" allow="fullscreen; autoplay"></iframe>`;
  document.body.appendChild(ov);
  document.documentElement.style.overflow = "hidden";
  const frame = ov.querySelector("iframe")!;
  frame.addEventListener("load", () => frame.focus());
  ov.querySelector("button")!.addEventListener("click", () => {
    ov.remove(); // drops the iframe, which stops the engine
    document.documentElement.style.overflow = "";
  });
}
