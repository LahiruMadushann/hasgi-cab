// Post-build step: bakes the rendered page, SEO tags, robots.txt and sitemap.xml into dist/.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssr = path.join(root, "dist-ssr");

const { render, head, SITE } = await import(pathToFileURL(path.join(ssr, "entry-server.js")).href);

const file = path.join(dist, "index.html");
let html = await readFile(file, "utf8");

if (!html.includes("<!--seo-head-->") || !html.includes('<div id="root"></div>')) {
  throw new Error("prerender: placeholders missing from dist/index.html");
}
html = html
  .replace(/<title>[\s\S]*?<\/title>\s*/, "")
  .replace("<!--seo-head-->", head())
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
await writeFile(file, html);

const base = (SITE.url || "").replace(/\/$/, "");
const robots = ["User-agent: *", "Allow: /", ...(base ? [`Sitemap: ${base}/sitemap.xml`] : [])].join("\n") + "\n";
await writeFile(path.join(dist, "robots.txt"), robots);

if (base) {
  const today = new Date().toISOString().slice(0, 10);
  await writeFile(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>
`
  );
} else {
  console.warn(
    "\n⚠  SITE.url is empty in src/data/site.js — skipped canonical link, social image URL and sitemap.xml.\n" +
      "   Set it to your live domain and rebuild before deploying.\n"
  );
}

await rm(ssr, { recursive: true, force: true });
console.log("✓ prerendered dist/index.html" + (base ? " + sitemap.xml" : "") + " + robots.txt");
