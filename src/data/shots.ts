import type { ImageMetadata } from "astro";
import qidi from "../assets/shots/qidiboxrfid.png";
import conductor from "../assets/shots/amass-conductor.png";

export const shots: Record<string, { src: ImageMetadata; alt: string }> = {
  "amass-conductor": { src: conductor, alt: "Amass Conductor: the New Enumeration dialog with scope, options, wordlist and datasource tabs" },
  qidiboxrfid: { src: qidi, alt: "QiDiBox Tag Tool web app: material and color pickers with a payload preview" },
};
