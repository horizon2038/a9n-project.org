import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const outputRoot = path.resolve("out");
const origin = "https://a9n-project.org";

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
}

function checkPage(file, locale, webPath, alternate) {
  const html = fs.readFileSync(file, "utf8");
  assert.equal(attribute(html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang"), locale, file);
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonical = links.find((link) => attribute(link, "rel") === "canonical");
  assert.equal(attribute(canonical ?? "", "href"), `${origin}${webPath}`, `${file}: canonical`);

  for (const [language, expected] of Object.entries(alternate)) {
    const link = links.find((link) => attribute(link, "hreflang") === language);
    assert.equal(attribute(link ?? "", "href"), `${origin}${expected}`, `${file}: ${language}`);
  }

  const languageLink = (html.match(/<a\b[^>]*>/gi) ?? [])
    .find((tag) => attribute(tag, "class")?.split(/\s+/).includes("language-link"));
  assert.equal(attribute(languageLink ?? "", "href"), alternate[locale === "en" ? "ja-JP" : "en-US"], `${file}: language switch`);

  for (const [, id] of html.matchAll(/href="#(ref-\d+)"/g)) {
    assert.ok(html.includes(`id="${id}"`), `${file}: unresolved citation ${id}`);
  }
  assert.ok(!html.includes(`${origin}/en/`), `${file}: obsolete locale URL`);
}

assert.ok(fs.existsSync(outputRoot), "Run npm run build first.");
assert.ok(!fs.existsSync(path.join(outputRoot, "en")), "Obsolete /en output remains.");

const englishPages = walk(outputRoot).filter((file) => {
  const relative = path.relative(outputRoot, file);
  return relative.endsWith("index.html")
    && !relative.startsWith(`ja${path.sep}`)
    && !relative.startsWith(`404${path.sep}`)
    && !relative.startsWith("_not-found");
});
assert.ok(englishPages.length > 0);

for (const englishFile of englishPages) {
  const relative = path.relative(outputRoot, englishFile);
  const englishPath = `/${relative.split(path.sep).join("/").replace(/index\.html$/, "")}`;
  const japanesePath = `/ja${englishPath}`;
  const japaneseFile = path.join(outputRoot, "ja", relative);
  const alternates = { "en-US": englishPath, "ja-JP": japanesePath, "x-default": englishPath };
  assert.ok(fs.existsSync(japaneseFile), `Missing Japanese page: ${japanesePath}`);
  checkPage(englishFile, "en", englishPath, alternates);
  checkPage(japaneseFile, "ja", japanesePath, alternates);
}

for (const [file, language, newsPath] of [
  ["feed.xml", "en", "/news/"],
  ["ja/feed.xml", "ja", "/ja/news/"],
]) {
  const rss = fs.readFileSync(path.join(outputRoot, file), "utf8");
  assert.ok(rss.includes(`<language>${language}</language>`), `${file}: language`);
  assert.ok(rss.includes(`<link>${origin}${newsPath}</link>`), `${file}: channel`);
  assert.ok(rss.includes(`href="${origin}/${file}"`), `${file}: self link`);
  assert.ok(!rss.includes(`${origin}/en/`), `${file}: obsolete locale URL`);
}

const sitemap = fs.readFileSync(path.join(outputRoot, "sitemap.xml"), "utf8");
assert.ok(!sitemap.includes(`${origin}/en/`), "Sitemap contains obsolete locale URLs.");
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  assert.ok(fs.existsSync(path.join(outputRoot, pathname, "index.html")), `Sitemap target missing: ${url}`);
}

console.log(`Localized pages checked: ${englishPages.length * 2}`);
console.log("Languages, canonical URLs, hreflang, language switches, citations, RSS, and sitemap: OK");
