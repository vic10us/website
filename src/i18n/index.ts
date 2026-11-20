export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export type L<T = string> = Record<Locale, T>;

export const defaultLocale: Locale = "en";

/** value for <html lang> and hreflang */
export const htmlLang: L = { en: "en", fr: "fr-CA", es: "es" };
export const ogLocale: L = { en: "en_CA", fr: "fr_CA", es: "es_ES" };
export const langName: L = { en: "English", fr: "Français", es: "Español" };

/** site-relative home path for a locale */
export const home = (l: Locale) => (l === defaultLocale ? "/" : `/${l}/`);

export const isLocale = (s: string | undefined): s is Locale => !!s && (locales as readonly string[]).includes(s);

/** project tags that are words rather than tech names */
const tagMap: Record<string, L> = {
  "data pipeline": { en: "data pipeline", fr: "pipeline de données", es: "pipeline de datos" },
  security: { en: "security", fr: "sécurité", es: "seguridad" },
  embedded: { en: "embedded", fr: "embarqué", es: "embebido" },
  "3D printing": { en: "3D printing", fr: "impression 3D", es: "impresión 3D" },
};
export const tag = (t: string, l: Locale) => tagMap[t]?.[l] ?? t;

const en = {
    title: "vic10us · engineer, maker & tinkerer: projects, demos, 3D prints",
    description: "Engineer, streamer, DIY-er. Projects, demos, 3D prints and the occasional rabbit hole.",
    ogAlt: "vic10us: a retro green terminal",
    nav: { work: "projects", components: "components", prints: "prints", streaming: "streaming", lab: "lab", deprecated: "deprecated", socials: "socials" },
    sections: { work: "Projects", components: "Components", prints: "3D prints", streaming: "Streaming", lab: "Old components", deprecated: "Deprecated demos", socials: "Contact" },
    langLabel: "language",
    taglines: ["engineer", "streamer", "diy-er", "maker"],
    boot: ["[ OK ] mounted /dev/curiosity", "[ OK ] started coffee.service", "[ OK ] reached target garage.target"],
    intro: "Quasi-polyglot, jack of all trades. Builds things with tech, but mostly tries to help others build their own.",
    printsNote: "Models I've designed and published. Things that hold things, fix things, or make printers better.",
    browseModels: "→ browse models",
    labNote: "Older experiments. Mostly unmaintained, still fun to poke at.",
    footer: "vic10us · built in a garage, probably",
    uptime: "uptime",
    site: "site", source: "source", closed: "closed source", demo: "demo", playground: "full playground",
    copy: "copy", copied: "copied ✓", copyLabel: "copy",
    presses: ["Press me", "again", "harder", "ok, that's enough"],
    options: "options",
    shellHint: ["press", "for a shell"],
    shellLabel: "terminal", shellClose: "close terminal",
    status: {
      label: "legacy demos status: failed, bitrot",
      desc: "Component Playground (2022–2024)",
      abandoned: "abandoned",
      failed: "failed (Result: bitrot)",
      since: "since forever",
      process: "still twitching. poke them anyway.",
    },
    randomize: "randomize",
    suggest: { text: "This site is also in English.", go: "switch", dismiss: "dismiss" },
};
export type UI = typeof en;

export const ui: L<UI> = {
  en,
  fr: {
    title: "vic10us · ingénieur, maker et patenteux : projets, démos, impressions 3D",
    description: "Ingénieur, streameur, patenteux. Projets, démos, impressions 3D et le terrier de lapin occasionnel.",
    ogAlt: "vic10us : un terminal vert rétro",
    nav: { work: "projets", components: "composants", prints: "impressions", streaming: "streaming", lab: "labo", deprecated: "obsolète", socials: "réseaux" },
    sections: { work: "Projets", components: "Composants", prints: "Impressions 3D", streaming: "Streaming", lab: "Anciens composants", deprecated: "Démos obsolètes", socials: "Contact" },
    langLabel: "langue",
    taglines: ["ingénieur", "streameur", "patenteux", "créateur"],
    boot: ["[ OK ] /dev/curiosité monté", "[ OK ] café.service démarré", "[ OK ] cible garage.target atteinte"],
    intro: "Quasi-polyglotte, touche-à-tout. Construit des choses avec la techno, mais surtout, aide les autres à construire les leurs.",
    printsNote: "Des modèles que j'ai conçus et publiés. Des trucs qui tiennent des trucs, qui réparent des trucs, ou qui améliorent les imprimantes.",
    browseModels: "→ voir les modèles",
    labNote: "De vieilles expériences. Plus vraiment maintenues, mais encore amusantes à tripoter.",
    footer: "vic10us · bâti dans un garage, probablement",
    uptime: "en ligne depuis",
    site: "site", source: "source", closed: "code fermé", demo: "démo", playground: "bac à sable complet",
    copy: "copier", copied: "copié ✓", copyLabel: "copier",
    presses: ["Appuie", "encore", "plus fort", "ok, ça suffit"],
    options: "options",
    shellHint: ["appuie sur", "pour un terminal"],
    shellLabel: "terminal", shellClose: "fermer le terminal",
    status: {
      label: "état des vieilles démos : en échec, pourriture logicielle",
      desc: "Terrain de jeu de composants (2022–2024)",
      abandoned: "abandonné",
      failed: "failed (Result: bitrot)",
      since: "depuis toujours",
      process: "ça bouge encore. tripote-les quand même.",
    },
    randomize: "au hasard",
    suggest: { text: "Ce site existe aussi en français.", go: "y aller", dismiss: "fermer" },
  },
  es: {
    title: "vic10us · ingeniero, maker e inventor: proyectos, demos, impresiones 3D",
    description: "Ingeniero, streamer, inventor. Proyectos, demos, impresiones 3D y alguna que otra madriguera de conejo.",
    ogAlt: "vic10us: una terminal verde retro",
    nav: { work: "proyectos", components: "componentes", prints: "impresiones", streaming: "streaming", lab: "lab", deprecated: "obsoleto", socials: "redes" },
    sections: { work: "Proyectos", components: "Componentes", prints: "Impresiones 3D", streaming: "Streaming", lab: "Componentes antiguos", deprecated: "Demos obsoletas", socials: "Contacto" },
    langLabel: "idioma",
    taglines: ["ingeniero", "streamer", "inventor", "creador"],
    boot: ["[ OK ] montado /dev/curiosidad", "[ OK ] iniciado café.service", "[ OK ] alcanzado garage.target"],
    intro: "Casi políglota, todoterreno. Construye cosas con tecnología, pero sobre todo intenta ayudar a otros a construir las suyas.",
    printsNote: "Modelos que he diseñado y publicado. Cosas que sostienen cosas, arreglan cosas o mejoran las impresoras.",
    browseModels: "→ ver modelos",
    labNote: "Experimentos antiguos. Casi sin mantenimiento, pero todavía divertidos de toquetear.",
    footer: "vic10us · hecho en un garaje, probablemente",
    uptime: "en línea desde hace",
    site: "sitio", source: "código", closed: "código cerrado", demo: "demo", playground: "playground completo",
    copy: "copiar", copied: "copiado ✓", copyLabel: "copiar",
    presses: ["Púlsame", "otra vez", "más fuerte", "vale, ya basta"],
    options: "opciones",
    shellHint: ["pulsa", "para una terminal"],
    shellLabel: "terminal", shellClose: "cerrar la terminal",
    status: {
      label: "estado de las demos antiguas: fallidas, podredumbre de bits",
      desc: "Patio de juegos de componentes (2022–2024)",
      abandoned: "abandonado",
      failed: "failed (Result: bitrot)",
      since: "desde siempre",
      process: "todavía se mueven. tócalas igual.",
    },
    randomize: "aleatorio",
    suggest: { text: "Este sitio también está en español.", go: "cambiar", dismiss: "cerrar" },
  },
};
