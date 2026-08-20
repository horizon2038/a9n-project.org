import fs from "node:fs";
import path from "node:path";

const outputRoot = path.resolve("out");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function isFile(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

function localTarget(sourceFile, reference) {
  const withoutFragment = reference.split("#", 1)[0];
  const withoutQuery = withoutFragment.split("?", 1)[0];
  let decoded;

  try {
    decoded = decodeURIComponent(withoutQuery);
  } catch {
    decoded = withoutQuery;
  }

  return decoded.startsWith("/")
    ? path.join(outputRoot, decoded.slice(1))
    : path.resolve(path.dirname(sourceFile), decoded);
}

function shouldCheck(reference) {
  return reference
    && !reference.startsWith("#")
    && !reference.startsWith("//")
    && !/^(?:data|https?|mailto|javascript):/.test(reference);
}

if (!fs.existsSync(outputRoot)) {
  throw new Error("Static output is missing. Run npm run build first.");
}

const files = walk(outputRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const references = [];

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");

  for (const match of source.matchAll(/(?:href|poster|src)="([^"]+)"/g)) {
    references.push({ file, reference: match[1] });
  }

  for (const match of source.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(",")) {
      references.push({ file, reference: candidate.trim().split(/\s+/, 1)[0] });
    }
  }
}

for (const file of files.filter((candidate) => candidate.endsWith(".css"))) {
  const source = fs.readFileSync(file, "utf8");

  for (const match of source.matchAll(/url\(([^)]+)\)/g)) {
    references.push({
      file,
      reference: match[1].trim().replace(/^["']|["']$/g, ""),
    });
  }
}

const missing = references.flatMap(({ file, reference }) => {
  if (!shouldCheck(reference)) return [];

  const target = localTarget(file, reference);
  const candidates = [target, `${target}.html`, path.join(target, "index.html")];
  return candidates.some(isFile)
    ? []
    : [`${path.relative(outputRoot, file)} -> ${reference}`];
});

console.log(`HTML files: ${htmlFiles.length}`);
console.log(`Local references checked: ${references.length}`);

if (missing.length > 0) {
  console.error(`Missing references: ${missing.length}`);
  console.error(missing.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Missing references: 0");
}
