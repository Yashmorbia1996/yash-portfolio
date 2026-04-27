/**
 * U+2013 (en) → ASCII hyphen, U+2014 (em) → commas/ASCII where appropriate.
 * Run: node scripts/fix-dashes.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "src");
const exts = new Set([".mdx", ".astro", ".tsx", ".ts", ".css", ".md"]);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory() && name.name !== "node_modules") walk(p, out);
    else if (name.isFile() && exts.has(path.extname(p))) out.push(p);
  }
  return out;
}

function processText(t) {
  // 1) En dash (ranges, k-ε) → ASCII hyphen
  t = t.replaceAll("\u2013", "-");

  // 2) String literals that are only a placeholder em dash
  t = t.replaceAll(`"\u2014"`, `"-"`);
  t = t.replaceAll(`'\u2014'`, `'-'`);

  // 3) Spaced em: "word — word" → "word, word"
  t = t.replace(/ \u2014 /g, ", ");

  // 4) Tight em: word—word
  t = t.replace(/([\p{L}\p{N}%°])—([\p{L}])/gu, "$1, $2");

  // 5) Remaining em
  t = t.replaceAll("\u2014", ", ");
  // Clean accidental ", ," (from adjacent replacements)
  t = t.replace(/, ,/g, ",");
  t = t.replace(/,  +/g, ", ");
  return t;
}

const files = walk(root);
const rootMd = ["HANDOFF.md", "PASSOVER.md", "README.md", "CONTENT_GUIDE.md"]
  .map((name) => path.join(process.cwd(), name))
  .filter((p) => fs.existsSync(p));

let count = 0;
for (const f of [...files, ...rootMd]) {
  const before = fs.readFileSync(f, "utf8");
  const after = processText(before);
  if (after !== before) {
    fs.writeFileSync(f, after, "utf8");
    count += 1;
  }
}
console.log(`Updated ${count} file(s) (src/ + root docs).`);
