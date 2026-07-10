import { mkdir, readFile, writeFile } from "node:fs/promises";

const config = JSON.parse(await readFile("data/ridego-config.json", "utf8"));

const c = {
  black: "#050607",
  ink: "#111315",
  coal: "#181B1D",
  lime: "#D9FF00",
  lime2: "#A6D900",
  paper: "#F4F1E7",
  white: "#FFFFFF",
  gray: "#A7AEA8",
  line: "#303538",
  orange: "#FF5C1A",
  blue: "#2E68FF"
};

const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const phone = esc(config.phone);
const email = esc(config.email);
const website = esc(config.website);
const location = esc(config.location);
const price = esc(config.offer.headlinePrice);
const monthly = esc(config.offer.monthlyPrice);

function defs() {
  return `
  <defs>
    <pattern id="scan" width="18" height="18" patternUnits="userSpaceOnUse">
      <path d="M0 17.5h18" stroke="#1A1D1F" stroke-width="1"/>
    </pattern>
    <filter id="hardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="10" dy="10" stdDeviation="0" flood-color="${c.lime}" flood-opacity="1"/>
    </filter>
  </defs>`;
}

function style() {
  return `
  <style>
    .sans { font-family: Inter, Arial, Helvetica, sans-serif; }
    .black { font-family: Inter, Arial, Helvetica, sans-serif; font-weight: 950; letter-spacing: -0.01em; }
    .tight { font-family: Inter, Arial, Helvetica, sans-serif; font-weight: 980; letter-spacing: -0.03em; }
    .mono { font-family: "SFMono-Regular", Consolas, Menlo, monospace; font-weight: 800; letter-spacing: .03em; }
  </style>`;
}

function wordmark(x = 0, y = 0, scale = 1, mode = "dark") {
  const fg = mode === "dark" ? c.white : c.black;
  const sub = mode === "dark" ? c.gray : "#58615B";
  return `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <text x="0" y="105" class="tight" font-size="132" fill="${fg}">Ride</text>
      <rect x="312" y="10" width="112" height="112" rx="18" fill="${c.lime}"/>
      <text x="368" y="103" text-anchor="middle" class="tight" font-size="116" fill="${c.black}">&amp;</text>
      <text x="444" y="105" class="tight" font-size="132" fill="${fg}">Go</text>
      <text x="4" y="162" class="mono" font-size="26" fill="${sub}">E-BIKE SHIFT RENTAL / KOMORSKA</text>
    </g>`;
}

function logoSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="300" viewBox="0 0 1100 300" role="img" aria-label="Ride&amp;Go logo">
${defs()}
${style()}
  <rect width="1100" height="300" fill="${c.black}"/>
  <rect width="1100" height="300" fill="url(#scan)" opacity=".58"/>
  ${wordmark(54, 52, 1, "dark")}
  <rect x="828" y="78" width="202" height="72" rx="10" fill="${c.lime}"/>
  <text x="929" y="124" text-anchor="middle" class="black" font-size="30" fill="${c.black}">KOMORSKA</text>
</svg>`;
}

function markSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="Ride&amp;Go znak">
${style()}
  <rect width="512" height="512" rx="84" fill="${c.lime}"/>
  <text x="256" y="355" text-anchor="middle" class="tight" font-size="340" fill="${c.black}">&amp;</text>
</svg>`;
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="13" fill="${c.lime}"/>
  <text x="32" y="47" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="43" font-weight="900" fill="${c.black}">&amp;</text>
</svg>`;
}

function terminalRow(y, left, right, accent = c.lime) {
  return `
    <g transform="translate(96 ${y})">
      <rect width="1160" height="86" fill="${c.black}" stroke="${c.line}" stroke-width="2"/>
      <rect width="12" height="86" fill="${accent}"/>
      <text x="40" y="54" class="mono" font-size="27" fill="${c.gray}">${esc(left)}</text>
      <text x="1118" y="54" text-anchor="end" class="black" font-size="36" fill="${c.white}">${esc(right)}</text>
    </g>`;
}

function socialBannerSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1640" height="924" viewBox="0 0 1640 924" role="img" aria-label="Ride&amp;Go social banner">
${defs()}
${style()}
  <rect width="1640" height="924" fill="${c.black}"/>
  <rect width="1640" height="924" fill="url(#scan)" opacity=".72"/>
  <path d="M0 0h1640v118H0Z" fill="${c.lime}"/>
  <text x="92" y="78" class="mono" font-size="34" fill="${c.black}">KOMORSKA / E-BIKE DLA KURIERA / WYNAJEM</text>
  ${wordmark(92, 182, 1.08, "dark")}
  <text x="92" y="504" class="tight" font-size="105" fill="${c.white}">Nie kupuj roweru.</text>
  <text x="92" y="612" class="tight" font-size="105" fill="${c.lime}">Weź go na zmianę.</text>
  ${terminalRow(704, "TYDZIEŃ", price, c.lime)}
  ${terminalRow(804, "TELEFON / WHATSAPP", phone, c.orange)}
  <g transform="translate(1272 216)" filter="url(#hardShadow)">
    <rect width="260" height="260" rx="28" fill="${c.paper}"/>
    <text x="130" y="190" text-anchor="middle" class="tight" font-size="192" fill="${c.black}">&amp;</text>
  </g>
</svg>`;
}

function flyerA5Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="148mm" height="210mm" viewBox="0 0 1480 2100" role="img" aria-label="Ride&amp;Go ulotka A5">
${defs()}
${style()}
  <rect width="1480" height="2100" fill="${c.black}"/>
  <rect width="1480" height="2100" fill="url(#scan)" opacity=".8"/>
  <rect x="0" y="0" width="1480" height="210" fill="${c.lime}"/>
  <text x="96" y="136" class="mono" font-size="46" fill="${c.black}">RIDE&amp;GO / KOMORSKA</text>
  ${wordmark(96, 310, 1, "dark")}
  <text x="96" y="760" class="tight" font-size="116" fill="${c.white}">E-bike</text>
  <text x="96" y="890" class="tight" font-size="116" fill="${c.white}">na zmianę</text>
  <text x="96" y="1020" class="tight" font-size="116" fill="${c.lime}">kurierską.</text>
  ${terminalRow(1170, "TYDZIEŃ", price, c.lime)}
  ${terminalRow(1282, "MIESIĄC", monthly, c.blue)}
  ${terminalRow(1394, "ODBIÓR", "KOMORSKA 55", c.orange)}
  <text x="96" y="1648" class="black" font-size="48" fill="${c.white}">Glovo / Uber Eats / Wolt / Bolt Food</text>
  <text x="96" y="1738" class="sans" font-size="38" fill="${c.gray}">Rower, ładowarka, zapięcie i przegląd startowy.</text>
  <rect x="96" y="1850" width="1288" height="122" rx="8" fill="${c.lime}"/>
  <text x="740" y="1928" text-anchor="middle" class="black" font-size="54" fill="${c.black}">${phone}</text>
  <text x="96" y="2048" class="sans" font-size="28" fill="${c.gray}">Finalna kaucja, regulamin i modele Jobobike do potwierdzenia przed drukiem.</text>
</svg>`;
}

function posterA3Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="297mm" height="420mm" viewBox="0 0 2970 4200" role="img" aria-label="Ride&amp;Go poster A3">
${defs()}
${style()}
  <rect width="2970" height="4200" fill="${c.black}"/>
  <rect width="2970" height="4200" fill="url(#scan)" opacity=".76"/>
  <rect x="0" y="0" width="2970" height="420" fill="${c.lime}"/>
  <text x="190" y="262" class="mono" font-size="90" fill="${c.black}">RIDE&amp;GO / KOMORSKA / WYNAJEM</text>
  ${wordmark(190, 620, 1.9, "dark")}
  <text x="190" y="1650" class="tight" font-size="250" fill="${c.white}">E-bike dla</text>
  <text x="190" y="1930" class="tight" font-size="250" fill="${c.white}">kuriera.</text>
  <text x="190" y="2210" class="tight" font-size="250" fill="${c.lime}">Bez zakupu.</text>
  ${terminalRow(2640, "TYDZIEŃ", price, c.lime)}
  ${terminalRow(2800, "MIESIĄC", monthly, c.blue)}
  ${terminalRow(2960, "ODBIÓR", location, c.orange)}
  <rect x="190" y="3380" width="1720" height="210" rx="10" fill="${c.lime}"/>
  <text x="1050" y="3514" text-anchor="middle" class="black" font-size="94" fill="${c.black}">${phone}</text>
  <text x="2070" y="3514" class="black" font-size="94" fill="${c.white}">${website}</text>
  <text x="190" y="3860" class="sans" font-size="58" fill="${c.gray}">Glovo / Uber Eats / Wolt / Bolt Food. Warunki najmu przed odbiorem.</text>
</svg>`;
}

function businessCardSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="180mm" height="55mm" viewBox="0 0 1800 550" role="img" aria-label="Ride&amp;Go wizytówka">
${defs()}
${style()}
  <rect width="1800" height="550" fill="${c.black}"/>
  <rect width="1800" height="550" fill="url(#scan)" opacity=".7"/>
  <rect x="0" y="0" width="330" height="550" fill="${c.lime}"/>
  <text x="165" y="370" text-anchor="middle" class="tight" font-size="300" fill="${c.black}">&amp;</text>
  ${wordmark(430, 86, .72, "dark")}
  <text x="430" y="354" class="mono" font-size="30" fill="${c.gray}">TEL / WHATSAPP</text>
  <text x="430" y="420" class="black" font-size="52" fill="${c.white}">${phone}</text>
  <text x="1100" y="354" class="mono" font-size="30" fill="${c.gray}">MAIL / WWW</text>
  <text x="1100" y="420" class="black" font-size="42" fill="${c.white}">${email}</text>
  <text x="1100" y="482" class="black" font-size="42" fill="${c.lime}">${website}</text>
</svg>`;
}

await mkdir("assets/brand", { recursive: true });
await mkdir("assets/marketing", { recursive: true });

const files = {
  "assets/brand/ridego-logo.svg": logoSvg(),
  "assets/brand/ridego-mark.svg": markSvg(),
  "assets/brand/favicon.svg": faviconSvg(),
  "assets/marketing/social-banner.svg": socialBannerSvg(),
  "assets/marketing/ulotka-a5.svg": flyerA5Svg(),
  "assets/marketing/poster-a3.svg": posterA3Svg(),
  "assets/marketing/wizytowka.svg": businessCardSvg()
};

await Promise.all(Object.entries(files).map(([file, body]) => writeFile(file, `${body}\n`, "utf8")));

console.log(`Generated ${Object.keys(files).length} Ride&Go terminal assets.`);
