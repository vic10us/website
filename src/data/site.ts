import type { L } from "../i18n";

export const host = "lab-eridani";
export const user = "vic10us";
export const prompt = `${user}@${host}:~$`;

export type Project = {
  slug: string;
  name: string;
  blurb: L;
  tags: string[];
  url: string;
  /** live site, shown as a "site" link */
  site?: string;
  /** source isn't public: hide the "source" link */
  closed?: boolean;
  demo?: string;
  image?: string;
  stars?: number;
};

export const products: Project[] = [
  {
    slug: "parley",
    name: "Parley",
    blurb: {
      en: "Open-source Discord alternative with no paywall: servers, channels, DMs, voice, video, stages and a recording studio. Every feature free, on runparley.com or your own server.",
      fr: "Alternative libre à Discord, sans mur payant : serveurs, salons, messages privés, voix, vidéo, scènes et studio d'enregistrement. Toutes les fonctionnalités gratuites, sur runparley.com ou sur ton propre serveur.",
      es: "Alternativa de código abierto a Discord sin muro de pago: servidores, canales, mensajes directos, voz, video, escenarios y un estudio de grabación. Todo gratis, en runparley.com o en tu propio servidor.",
    },
    tags: ["Rust", "React", "WebRTC", "Apache-2.0"],
    url: "https://github.com/ParleyDev/parley",
    site: "https://runparley.com",
  },
  {
    slug: "rock-atlas",
    name: "Rock Atlas",
    blurb: {
      en: "An open, data-driven encyclopedia of recorded rock: 1,000 ranked entries across eras, subgenres and countries, built from Wikipedia, Wikidata, MusicBrainz and Last.fm.",
      fr: "Une encyclopédie ouverte du rock enregistré, fondée sur les données : 1 000 entrées classées par époque, sous-genre et pays, construite à partir de Wikipédia, Wikidata, MusicBrainz et Last.fm.",
      es: "Una enciclopedia abierta del rock grabado, basada en datos: 1.000 entradas clasificadas por épocas, subgéneros y países, construida a partir de Wikipedia, Wikidata, MusicBrainz y Last.fm.",
    },
    tags: ["Astro", "data pipeline", "Wikidata"],
    url: "https://rock-atlas.com",
    site: "https://rock-atlas.com",
    closed: true,
  },
  {
    slug: "amass-conductor",
    name: "amass-conductor",
    blurb: {
      en: "Kubernetes-native control panel for coordinating distributed Amass enumeration engines. Launch, monitor and manage recon jobs at scale.",
      fr: "Panneau de contrôle natif Kubernetes pour coordonner des moteurs d'énumération Amass distribués. Lancement, suivi et gestion de tâches de reconnaissance à grande échelle.",
      es: "Panel de control nativo de Kubernetes para coordinar motores de enumeración Amass distribuidos. Lanza, supervisa y gestiona trabajos de reconocimiento a escala.",
    },
    tags: ["Kubernetes", ".NET", "security"],
    url: "https://github.com/vic10us/amass-conductor",
  },
  {
    slug: "qidiboxrfid",
    name: "QiDiBoxRFID",
    blurb: {
      en: "Open-source NFC tag manager for the QidiBox filament system, combining embedded firmware with a small web app.",
      fr: "Gestionnaire libre d'étiquettes NFC pour le système de filament QidiBox, qui combine un micrologiciel embarqué et une petite application web.",
      es: "Gestor de etiquetas NFC de código abierto para el sistema de filamento QidiBox, que combina firmware embebido con una pequeña aplicación web.",
    },
    tags: ["C", "embedded", "NFC"],
    url: "https://github.com/vic10us/QiDiBoxRFID",
  },
  {
    slug: "stealthburner-cr10",
    name: "stealthburner-cr10",
    blurb: {
      en: "Voron Stealthburner toolhead assembly adapted for stock CR-10 and Ender 3 printers.",
      fr: "Assemblage de tête d'impression Voron Stealthburner adapté aux imprimantes CR-10 et Ender 3 d'origine.",
      es: "Ensamblaje del cabezal Voron Stealthburner adaptado a impresoras CR-10 y Ender 3 de serie.",
    },
    tags: ["CAD", "3D printing"],
    url: "https://github.com/vic10us/Stealthburner_CR10_Assembly",
    stars: 15,
  },
];

// Maintained, published components. (Older ones live in oldComponents.)
export const components: Project[] = [
  {
    slug: "glass-button",
    name: "glass-button",
    blurb: {
      en: "Framework-agnostic web component: a thick, dark glass pill with real-time WebGL2 fire or water living inside it. Zero dependencies.",
      fr: "Composant web indépendant de tout framework : une épaisse pilule de verre sombre habitée par du feu ou de l'eau en WebGL2, en temps réel. Zéro dépendance.",
      es: "Componente web independiente del framework: una gruesa píldora de cristal oscuro con fuego o agua en WebGL2 en tiempo real dentro. Cero dependencias.",
    },
    tags: ["TypeScript", "WebGL2", "npm"],
    url: "https://github.com/vic10us/glass-button",
    demo: "https://vic10us.github.io/glass-button/",
  },
];

export const streaming: Project[] = [
  {
    slug: "streamerbot",
    name: "StreamerBotCodeExamples",
    blurb: {
      en: "Code examples for Streamer.bot actions and automations.",
      fr: "Exemples de code pour les actions et automatisations Streamer.bot.",
      es: "Ejemplos de código para acciones y automatizaciones de Streamer.bot.",
    },
    tags: ["C#"],
    url: "https://github.com/vic10us/StreamerBotCodeExamples",
  },
  {
    slug: "obs-websockets",
    name: "OBS.WebSockets.Core",
    blurb: {
      en: ".NET Standard library for talking to OBS over WebSockets.",
      fr: "Bibliothèque .NET Standard pour piloter OBS par WebSockets.",
      es: "Biblioteca .NET Standard para comunicarse con OBS por WebSockets.",
    },
    tags: ["C#", ".NET"],
    url: "https://github.com/vic10us/OBS.WebSockets.Core",
  },
  {
    slug: "streamdeck-voicemeeter",
    name: "streamdeck-voicemeeter",
    blurb: {
      en: "VoiceMeeter control from an Elgato Stream Deck (fork).",
      fr: "Contrôle de VoiceMeeter depuis un Elgato Stream Deck (fork).",
      es: "Control de VoiceMeeter desde un Elgato Stream Deck (fork).",
    },
    tags: ["C#"],
    url: "https://github.com/vic10us/streamdeck-voicemeeter",
  },
];

export const printProfiles = [
  { name: "Printables", url: "https://www.printables.com/@vic10us_3685972" },
  { name: "Cults3D", url: "https://cults3d.com/en/users/vic10usx/3d-models" },
];

// Legacy components: older, mostly unmaintained. Kept deep in ~/lab on purpose.
export const oldComponents: { name: string; url: string; note: L }[] = [
  { name: "terminal-text", url: "https://github.com/vic10us/terminal-text", note: { en: "70s/80s terminal text element", fr: "élément texte de terminal des années 70/80", es: "elemento de texto de terminal de los 70/80" } },
  { name: "paper-search-input", url: "https://vic10us.github.io/paper-search-input/components/paper-search-input/", note: { en: "paper-style search input", fr: "champ de recherche style papier", es: "campo de búsqueda estilo papel" } },
  { name: "cc-form", url: "https://vic10us.github.io/cc-form/components/cc-form/", note: { en: "credit card form with pizzazz", fr: "formulaire de carte de crédit avec du panache", es: "formulario de tarjeta de crédito con estilo" } },
  { name: "stripe-form", url: "https://github.com/vic10us/stripe-form", note: { en: "Polymer Stripe form", fr: "formulaire Stripe en Polymer", es: "formulario de Stripe en Polymer" } },
  { name: "progress-check-mark", url: "https://vic10us.github.io/progress-check-mark/", note: { en: "progress ring → check mark", fr: "anneau de progression → crochet", es: "anillo de progreso → marca de verificación" } },
  { name: "profile-card", url: "https://github.com/vic10us/profile-card", note: { en: "Google-like profile card", fr: "carte de profil façon Google", es: "tarjeta de perfil al estilo Google" } },
];

export const socials = [
  { name: "github", url: "https://github.com/vic10us" },
  { name: "twitch", url: "https://www.twitch.tv/vic10usx" },
  { name: "youtube", url: "https://www.youtube.com/vic10us" },
  { name: "instructables", url: "https://www.instructables.com/member/vic10us/" },
];

/** every public profile, for structured data */
export const sameAs = [...socials.map((s) => s.url), ...printProfiles.map((p) => p.url)];
