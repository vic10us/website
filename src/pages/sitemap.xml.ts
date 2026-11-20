import type { APIRoute } from "astro";
import { locales, defaultLocale, htmlLang, home } from "../i18n";

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const alts = [
    ...locales.map((l) => `<xhtml:link rel="alternate" hreflang="${htmlLang[l]}" href="${abs(home(l))}"/>`),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(home(defaultLocale))}"/>`,
  ].join("");
  const urls = locales.map((l) => `<url><loc>${abs(home(l))}</loc>${alts}</url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
