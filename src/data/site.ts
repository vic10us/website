export const host = "lab-eridani";
export const user = "vic10us";
export const prompt = `${user}@${host}:~$`;

export const taglines = ["engineer", "streamer", "diy-er", "maker"];

export const bootLines = [
  "[ OK ] mounted /dev/curiosity",
  "[ OK ] started coffee.service",
  "[ OK ] reached target garage.target",
];

export type Project = {
  slug: string;
  name: string;
  blurb: string;
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
    blurb:
      "Open-source Discord alternative with no paywall: servers, channels, DMs, voice, video, stages and a recording studio. Every feature free, on runparley.com or your own server.",
    tags: ["Rust", "React", "WebRTC", "Apache-2.0"],
    url: "https://github.com/ParleyDev/parley",
    site: "https://runparley.com",
  },
  {
    slug: "rock-atlas",
    name: "Rock Atlas",
    blurb:
      "An open, data-driven encyclopedia of recorded rock: 1,000 ranked entries across eras, subgenres and countries, built from Wikipedia, Wikidata, MusicBrainz and Last.fm.",
    tags: ["Astro", "data pipeline", "Wikidata"],
    url: "https://rock-atlas.com",
    site: "https://rock-atlas.com",
    closed: true,
  },
  {
    slug: "amass-conductor",
    name: "amass-conductor",
    blurb:
      "Kubernetes-native control panel for coordinating distributed Amass enumeration engines. Launch, monitor and manage recon jobs at scale.",
    tags: ["Kubernetes", ".NET", "security"],
    url: "https://github.com/vic10us/amass-conductor",
  },
  {
    slug: "qidiboxrfid",
    name: "QiDiBoxRFID",
    blurb:
      "Open-source NFC tag manager for the QidiBox filament system, combining embedded firmware with a small web app.",
    tags: ["C", "embedded", "NFC"],
    url: "https://github.com/vic10us/QiDiBoxRFID",
  },
  {
    slug: "stealthburner-cr10",
    name: "stealthburner-cr10",
    blurb:
      "Voron Stealthburner toolhead assembly adapted for stock CR-10 and Ender 3 printers.",
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
    blurb:
      "Framework-agnostic web component: a thick, dark glass pill with real-time WebGL2 fire or water living inside it. Zero dependencies.",
    tags: ["TypeScript", "WebGL2", "npm"],
    url: "https://github.com/vic10us/glass-button",
    demo: "https://vic10us.github.io/glass-button/",
  },
];

export const streaming: Project[] = [
  {
    slug: "streamerbot",
    name: "StreamerBotCodeExamples",
    blurb: "Code examples for Streamer.bot actions and automations.",
    tags: ["C#"],
    url: "https://github.com/vic10us/StreamerBotCodeExamples",
  },
  {
    slug: "obs-websockets",
    name: "OBS.WebSockets.Core",
    blurb: ".NET Standard library for talking to OBS over WebSockets.",
    tags: ["C#", ".NET"],
    url: "https://github.com/vic10us/OBS.WebSockets.Core",
  },
  {
    slug: "streamdeck-voicemeeter",
    name: "streamdeck-voicemeeter",
    blurb: "VoiceMeeter control from an Elgato Stream Deck (fork).",
    tags: ["C#"],
    url: "https://github.com/vic10us/streamdeck-voicemeeter",
  },
];

export const printProfiles = [
  { name: "Printables", url: "https://www.printables.com/@vic10us_3685972" },
  { name: "Cults3D", url: "https://cults3d.com/en/users/vic10usx/3d-models" },
];

// Legacy components: older, mostly unmaintained. Kept deep in ~/lab on purpose.
export const oldComponents = [
  { name: "terminal-text", url: "https://github.com/vic10us/terminal-text", note: "70s/80s terminal text element" },
  { name: "paper-search-input", url: "https://vic10us.github.io/paper-search-input/components/paper-search-input/", note: "paper-style search input" },
  { name: "cc-form", url: "https://vic10us.github.io/cc-form/components/cc-form/", note: "credit card form with pizzazz" },
  { name: "stripe-form", url: "https://github.com/vic10us/stripe-form", note: "Polymer Stripe form" },
  { name: "progress-check-mark", url: "https://vic10us.github.io/progress-check-mark/", note: "progress ring → check mark" },
  { name: "profile-card", url: "https://github.com/vic10us/profile-card", note: "Google-like profile card" },
];

export const socials = [
  { name: "github", url: "https://github.com/vic10us" },
  { name: "twitch", url: "https://www.twitch.tv/vic10usx" },
  { name: "youtube", url: "https://www.youtube.com/vic10us" },
  { name: "instructables", url: "https://www.instructables.com/member/vic10us/" },
];
