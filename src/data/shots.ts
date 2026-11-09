import type { ImageMetadata } from "astro";
import qidi from "../assets/shots/qidiboxrfid.png";
import conductor from "../assets/shots/amass-conductor.png";
import parley from "../assets/shots/parley.png";
import rockAtlas from "../assets/shots/rock-atlas.png";

export const shots: Record<string, { src: ImageMetadata; alt: string }> = {
  parley: { src: parley, alt: "Parley landing page: TALK IT OUT. ON YOUR SERVER." },
  "rock-atlas": { src: rockAtlas, alt: "Rock Atlas home page: an encyclopedia of recorded rock with 1,000 ranked entries" },
  "amass-conductor": { src: conductor, alt: "Amass Conductor: the New Enumeration dialog with scope, options, wordlist and datasource tabs" },
  qidiboxrfid: { src: qidi, alt: "QiDiBox Tag Tool web app: material and color pickers with a payload preview" },
};
