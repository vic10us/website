// Shell output per language. Commands, file names and easter-egg triggers stay
// English everywhere (it's a shell); only what the shell says back is translated.
import type { L, Locale } from "./index";

type S = {
  eggs: Record<string, string>;
  achievement: (label: string, n: number, total: number) => string;
  hello: string;
  wake: [string, string, string];
  banner: string;
  rabbit: string;
  plan: string;
  rockyTranslation: string;
  found: (n: number, total: number) => string;
  doomSlot: (gate: number) => string;
  energon: string;
  help: (sections: string) => string;
  whoami: [string, string, string];
  noFile: (f: string) => string;
  hangar: string;
  alreadyHere: string;
  unknownSection: (list: string) => string;
  opening: (p: string) => string;
  openWhich: string;
  sudo: [string, string, string];
  rmCareful: string;
  deleting: string;
  humorIs: (h: number) => string;
  humorSet: (h: number) => string;
  humorHigh: (h: number) => string;
  stay: string;
  xyzzy: string;
  iddqd: string;
  idkfaLocked: (keys: number, gate: number) => string;
  idkfaKeyboard: string;
  idkfaOk: string;
  credits: string;
  whisperOn: string;
  whisperOff: string;
  turbo: string;
  transforming: string;
  happy: string;
  notFound: (c: string) => [string, string, string];
  konami: string;
  langUsage: (list: string) => string;
  langSwitch: (name: string) => string;
  doomBar: string;
  doomQuit: string;
  /** localized section names → section ids, for cd/goto */
  aliases: Record<string, string>;
};

const en: S = {
  eggs: {
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
    doom: "full arsenal unlocked",
  },
  achievement: (l, n, t) => `★ achievement: ${l} (${n}/${t})`,
  hello: "looking under the hood? the backtick key opens a door.\npsst… adventurers know the magic word.",
  wake: ["wake up…", "the lab has you…", "follow the white rabbit."],
  banner: "vic10us-os 4.2.0 (tty1)\nlast login: from somewhere on the internet\ntype 'help' to get started.",
  rabbit: "follow me.",
  plan: "1. build things\n2. help others build things\n3. learn to speak Eridian\n4. pay attention to the cursor\n5. print another filament holder",
  rockyTranslation: "[translation]\n  ♪♫♪  amaze amaze amaze\n  ♫♪♫  fist my bump\n(he says you should try them.)",
  found: (n, t) => `found ${n} of ${t}`,
  doomSlot: (g) => `??? (requires ${g} keycards)`,
  energon: "cube integrity: 100%\nautobots would be proud.",
  help: (s) =>
    "available commands:\n" +
    "  whoami            who runs this place\n" +
    "  ls [-a] [dir]     list things\n" +
    "  cat <file>        read a file\n" +
    "  cd <dir>          go somewhere\n" +
    `  goto <section>    ${s}\n` +
    "  lang <en|fr|es>   switch language\n" +
    "  clear | exit\n" +
    "\n(there's also `history`, if you're the nosy type.)",
  whoami: ["engineer · streamer · diy-er", "engineer · streamer · diy-er · professional button-presser", "a carbon-based unit with too many side projects"],
  noFile: (f) => `cat: ${f}: no such file`,
  hangar: "ACCESS DENIED.\nclearance: Archangel only.",
  alreadyHere: "you are already where you need to be.",
  unknownSection: (l) => `goto: unknown section. try: ${l}`,
  opening: (p) => `opening ${p}…`,
  openWhich: "open: which project? try `ls ~/projects`",
  sudo: ["permission denied.", "nice try.", "nice try. this incident will be reported."],
  rmCareful: "rm: careful with that.",
  deleting: "deleting / …",
  humorIs: (h) => `humor setting: ${h}%`,
  humorSet: (h) => `humor set to ${h}%.`,
  humorHigh: (h) => `humor set to ${h}%. self-destruct in T-minus 10… 9… kidding.`,
  stay: "message received. staying put.",
  xyzzy: "Nothing happens.",
  iddqd: "degreelessness mode on.\n(you were already invincible here.)",
  idkfaLocked: (k, g) => `idkfa: missing keycards. ${k}/${g} collected.\nfind more secrets and try again.`,
  idkfaKeyboard: "idkfa: this one needs a keyboard.",
  idkfaOk: "very happy ammo added.",
  credits: "optimus sprite ........ poneley.com (with permission)\ndoom ................... id Software shareware · chocolate-doom / cloudflare doom-wasm (GPL-2.0)\neverything else ........ vic10us",
  whisperOn: "whisper mode: engaged.",
  whisperOff: "whisper mode: off.",
  turbo: "TURBO BOOST.",
  transforming: "transforming…",
  happy: "♪ ♫ ♪  (happy)",
  notFound: (c) => [`${c}: command not found`, `${c}: command not found. try 'help'.`, `${c}? never heard of it. and I've heard of everything.`],
  konami: "+30 lives. you'll need them.",
  langUsage: (l) => `usage: lang <${l}>`,
  langSwitch: (n) => `switching to ${n}…`,
  doomBar: "idkfa · wasd move · space fire · e use · esc menu",
  doomQuit: "✕ quit to shell",
  aliases: {},
};

const fr: S = {
  eggs: {
    "white-rabbit": "a suivi le lapin blanc",
    "wake-up": "s'est fait réveiller",
    stay: "a décodé le curseur",
    "turbo-boost": "a enclenché le turbo boost",
    whisper: "a activé le mode murmure",
    hangar: "a trouvé le hangar",
    "roll-out": "s'est mis en route",
    tars: "a réglé TARS",
    "fist-my-bump": "fist my bump",
    amaze: "amaze amaze amaze",
    sudo: "a essayé sudo",
    "rm-rf": "a tout effacé (en quelque sorte)",
    konami: "+30 vies",
    energon: "a lu le code source",
    xyzzy: "a dit le mot magique",
    doom: "arsenal complet débloqué",
  },
  achievement: (l, n, t) => `★ succès : ${l} (${n}/${t})`,
  hello: "tu regardes sous le capot? la touche ` ouvre une porte.\npsst… les aventuriers connaissent le mot magique.",
  wake: ["réveille-toi…", "le labo te tient…", "suis le lapin blanc."],
  banner: "vic10us-os 4.2.0 (tty1)\ndernière connexion : quelque part sur internet\ntape 'help' pour commencer.",
  rabbit: "suis-moi.",
  plan: "1. construire des trucs\n2. aider les autres à construire des trucs\n3. apprendre à parler éridien\n4. surveiller le curseur\n5. imprimer un autre support à filament",
  rockyTranslation: "[traduction]\n  ♪♫♪  amaze amaze amaze\n  ♫♪♫  fist my bump\n(il dit que tu devrais les essayer.)",
  found: (n, t) => `${n} sur ${t} trouvés`,
  doomSlot: (g) => `??? (exige ${g} cartes d'accès)`,
  energon: "intégrité du cube : 100 %\nles autobots seraient fiers.",
  help: (s) =>
    "commandes disponibles :\n" +
    "  whoami            qui mène la barque ici\n" +
    "  ls [-a] [dir]     lister des trucs\n" +
    "  cat <fichier>     lire un fichier\n" +
    "  cd <dir>          aller quelque part\n" +
    `  goto <section>    ${s}\n` +
    "  lang <en|fr|es>   changer de langue\n" +
    "  clear | exit\n" +
    "\n(il y a aussi `history`, si tu es du genre curieux.)",
  whoami: ["ingénieur · streameur · patenteux", "ingénieur · streameur · patenteux · peseux de pitons professionnel", "une unité à base de carbone avec trop de projets parallèles"],
  noFile: (f) => `cat: ${f}: aucun fichier de ce nom`,
  hangar: "ACCÈS REFUSÉ.\nautorisation : Archangel seulement.",
  alreadyHere: "tu es déjà là où tu dois être.",
  unknownSection: (l) => `goto: section inconnue. essaie : ${l}`,
  opening: (p) => `ouverture de ${p}…`,
  openWhich: "open: quel projet? essaie `ls ~/projects`",
  sudo: ["permission refusée.", "bien essayé.", "bien essayé. cet incident sera signalé."],
  rmCareful: "rm: fais attention avec ça.",
  deleting: "suppression de / …",
  humorIs: (h) => `réglage d'humour : ${h} %`,
  humorSet: (h) => `humour réglé à ${h} %.`,
  humorHigh: (h) => `humour réglé à ${h} %. autodestruction dans 10… 9… je niaise.`,
  stay: "message reçu. je ne bouge pas.",
  xyzzy: "Il ne se passe rien.",
  iddqd: "mode invincible activé.\n(tu étais déjà invincible ici.)",
  idkfaLocked: (k, g) => `idkfa: cartes d'accès manquantes. ${k}/${g} récupérées.\ntrouve d'autres secrets et réessaie.`,
  idkfaKeyboard: "idkfa: celui-là a besoin d'un clavier.",
  idkfaOk: "munitions très heureuses ajoutées.",
  credits: "sprite d'optimus ...... poneley.com (avec permission)\ndoom ................... shareware d'id Software · chocolate-doom / cloudflare doom-wasm (GPL-2.0)\ntout le reste .......... vic10us",
  whisperOn: "mode murmure : activé.",
  whisperOff: "mode murmure : désactivé.",
  turbo: "TURBO BOOST.",
  transforming: "transformation…",
  happy: "♪ ♫ ♪  (content)",
  notFound: (c) => [`${c}: commande introuvable`, `${c}: commande introuvable. essaie 'help'.`, `${c}? jamais entendu parler. et j'ai entendu parler de tout.`],
  konami: "+30 vies. tu vas en avoir besoin.",
  langUsage: (l) => `utilisation : lang <${l}>`,
  langSwitch: (n) => `passage en ${n}…`,
  doomBar: "idkfa · wasd bouger · espace tirer · e utiliser · échap menu",
  doomQuit: "✕ retour au terminal",
  aliases: { projets: "work", composants: "components", impressions: "prints", labo: "lab", obsolete: "deprecated", "obsolète": "deprecated", reseaux: "socials", "réseaux": "socials" },
};

const es: S = {
  eggs: {
    "white-rabbit": "siguió al conejo blanco",
    "wake-up": "recibió una llamada de atención",
    stay: "descifró el cursor",
    "turbo-boost": "activó el turbo boost",
    whisper: "activó el modo susurro",
    hangar: "encontró el hangar",
    "roll-out": "se puso en marcha",
    tars: "ajustó a TARS",
    "fist-my-bump": "fist my bump",
    amaze: "amaze amaze amaze",
    sudo: "intentó sudo",
    "rm-rf": "lo borró todo (más o menos)",
    konami: "+30 vidas",
    energon: "leyó el código fuente",
    xyzzy: "dijo la palabra mágica",
    doom: "arsenal completo desbloqueado",
  },
  achievement: (l, n, t) => `★ logro: ${l} (${n}/${t})`,
  hello: "¿mirando bajo el capó? la tecla ` abre una puerta.\npsst… los aventureros conocen la palabra mágica.",
  wake: ["despierta…", "el laboratorio te tiene…", "sigue al conejo blanco."],
  banner: "vic10us-os 4.2.0 (tty1)\núltimo acceso: desde algún lugar de internet\nescribe 'help' para empezar.",
  rabbit: "sígueme.",
  plan: "1. construir cosas\n2. ayudar a otros a construir cosas\n3. aprender a hablar eridiano\n4. prestar atención al cursor\n5. imprimir otro soporte de filamento",
  rockyTranslation: "[traducción]\n  ♪♫♪  amaze amaze amaze\n  ♫♪♫  fist my bump\n(dice que deberías probarlos.)",
  found: (n, t) => `encontrados ${n} de ${t}`,
  doomSlot: (g) => `??? (requiere ${g} tarjetas de acceso)`,
  energon: "integridad del cubo: 100%\nlos autobots estarían orgullosos.",
  help: (s) =>
    "comandos disponibles:\n" +
    "  whoami            quién manda aquí\n" +
    "  ls [-a] [dir]     listar cosas\n" +
    "  cat <archivo>     leer un archivo\n" +
    "  cd <dir>          ir a algún sitio\n" +
    `  goto <sección>    ${s}\n` +
    "  lang <en|fr|es>   cambiar de idioma\n" +
    "  clear | exit\n" +
    "\n(también existe `history`, si eres de los curiosos.)",
  whoami: ["ingeniero · streamer · inventor", "ingeniero · streamer · inventor · pulsador de botones profesional", "una unidad basada en carbono con demasiados proyectos paralelos"],
  noFile: (f) => `cat: ${f}: no existe el archivo`,
  hangar: "ACCESO DENEGADO.\nautorización: solo Archangel.",
  alreadyHere: "ya estás donde tienes que estar.",
  unknownSection: (l) => `goto: sección desconocida. prueba: ${l}`,
  opening: (p) => `abriendo ${p}…`,
  openWhich: "open: ¿qué proyecto? prueba `ls ~/projects`",
  sudo: ["permiso denegado.", "buen intento.", "buen intento. este incidente será reportado."],
  rmCareful: "rm: cuidado con eso.",
  deleting: "borrando / …",
  humorIs: (h) => `nivel de humor: ${h}%`,
  humorSet: (h) => `humor ajustado al ${h}%.`,
  humorHigh: (h) => `humor ajustado al ${h}%. autodestrucción en 10… 9… es broma.`,
  stay: "mensaje recibido. me quedo aquí.",
  xyzzy: "No pasa nada.",
  iddqd: "modo invencible activado.\n(aquí ya eras invencible.)",
  idkfaLocked: (k, g) => `idkfa: faltan tarjetas de acceso. ${k}/${g} conseguidas.\nencuentra más secretos y vuelve a intentarlo.`,
  idkfaKeyboard: "idkfa: esto necesita un teclado.",
  idkfaOk: "munición muy feliz añadida.",
  credits: "sprite de optimus ..... poneley.com (con permiso)\ndoom ................... shareware de id Software · chocolate-doom / cloudflare doom-wasm (GPL-2.0)\ntodo lo demás .......... vic10us",
  whisperOn: "modo susurro: activado.",
  whisperOff: "modo susurro: desactivado.",
  turbo: "TURBO BOOST.",
  transforming: "transformando…",
  happy: "♪ ♫ ♪  (contento)",
  notFound: (c) => [`${c}: comando no encontrado`, `${c}: comando no encontrado. prueba 'help'.`, `¿${c}? nunca lo oí. y he oído de todo.`],
  konami: "+30 vidas. las vas a necesitar.",
  langUsage: (l) => `uso: lang <${l}>`,
  langSwitch: (n) => `cambiando a ${n}…`,
  doomBar: "idkfa · wasd moverse · espacio disparar · e usar · esc menú",
  doomQuit: "✕ volver a la terminal",
  aliases: { proyectos: "work", componentes: "components", impresiones: "prints", obsoleto: "deprecated", redes: "socials" },
};

export const shellText: L<S> = { en, fr, es };

/** the page's locale, from <html lang> */
export const pageLocale = (): Locale => {
  const l = document.documentElement.lang.slice(0, 2);
  return l === "fr" || l === "es" ? l : "en";
};
