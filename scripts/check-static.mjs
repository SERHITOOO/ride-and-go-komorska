import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "assets/css/styles.css",
  "assets/js/main.js",
  "assets/brand/ridego-logo.svg",
  "assets/brand/ridego-mark.svg",
  "assets/brand/favicon.svg",
  "assets/marketing/ulotka-a5.svg",
  "assets/marketing/poster-a3.svg",
  "assets/marketing/social-banner.svg",
  "docs/brand-i-marketing.md",
  "docs/pilot-30-dni.md"
];

const requiredHtmlSnippets = [
  "Ride&Go",
  "Rower elektryczny na zmianę",
  "Komorska",
  "Glovo",
  "Uber Eats",
  "lead-form",
  "choice-field",
  "od 199 zł / tydz.",
  "od 749 zł",
  "mailto:",
  "WhatsApp"
];

const missingFiles = requiredFiles.filter((file) => !existsSync(file));
if (missingFiles.length) {
  throw new Error(`Missing files: ${missingFiles.join(", ")}`);
}

const html = await readFile("index.html", "utf8");
const missingSnippets = requiredHtmlSnippets.filter((snippet) => !html.includes(snippet));
if (missingSnippets.length) {
  throw new Error(`Missing HTML snippets: ${missingSnippets.join(", ")}`);
}

if (html.includes("<select")) {
  throw new Error("Native select controls found in HTML; the form should use custom choice controls.");
}

if (html.includes("od 179 zł") || html.includes("od 649 zł")) {
  throw new Error("Old pilot prices found in HTML.");
}

const css = await readFile("assets/css/styles.css", "utf8");
if (!css.includes("@media") || !css.includes(":focus-visible")) {
  throw new Error("CSS is missing responsive or focus-visible rules.");
}

console.log("Static QA OK: files, key content, responsive CSS and focus styles are present.");
