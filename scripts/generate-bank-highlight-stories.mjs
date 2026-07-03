#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BANKS_DIR = path.join(ROOT, 'public', 'banks');
const OUTPUT_DIR = path.join(ROOT, 'marketing', 'instagram', 'highlights', 'bancos-billeteras');

const WIDTH = 1080;
const HEIGHT = 1920;
const TILE_SIZE = 560;
const LOGO_SIZE = 410;
const TILE_X = (WIDTH - TILE_SIZE) / 2;
const TILE_Y = 560;
const NAME_Y = 1270;

const DISPLAY_NAMES = {
  bancor: 'Bancor',
  bbva: 'BBVA',
  bica: 'Banco Bica',
  bpn: 'BPN',
  brubank: 'Brubank',
  bse: 'Banco Santiago',
  buepp: 'Buepp',
  ciudad: 'Ciudad',
  columbia: 'Banco Columbia',
  comafi: 'Comafi',
  corrientes: 'Banco Corrientes',
  credicoop: 'Credicoop',
  delsol: 'Banco del Sol',
  entrerios: 'Banco Entre R\u00edos',
  galicia: 'Galicia',
  hipotecario: 'Hipotecario',
  icbc: 'ICBC',
  lagaceta: 'Club La Gaceta',
  macro: 'Macro',
  mercadopago: 'Mercado Pago',
  modo: 'MODO',
  municipal: 'Banco Municipal',
  nacion: 'Banco Naci\u00f3n',
  naranjax: 'NaranjaX',
  patagonia: 'Patagonia',
  personalpay: 'Personal Pay',
  piano: 'Banco Piano',
  sanjuan: 'Banco San Juan',
  santacruz: 'Banco Santa Cruz',
  santafe: 'Banco Santa Fe',
  santander: 'Santander',
  supervielle: 'Supervielle',
  yoy: 'YOY',
};

const BRAND_THEMES = {
  bancor: { bg: '#EEF4FF', accent: '#2457A7' },
  bbva: { bg: '#EAF2FF', accent: '#004481' },
  bica: { bg: '#ECFDF5', accent: '#047857' },
  bpn: { bg: '#EAF7FF', accent: '#0369A1' },
  brubank: { bg: '#F0EEFF', accent: '#4F46E5' },
  bse: { bg: '#EEF2FF', accent: '#4338CA' },
  buepp: { bg: '#F2EFFF', accent: '#6D28D9' },
  ciudad: { bg: '#E8F6FF', accent: '#0284C7' },
  columbia: { bg: '#F1F5F9', accent: '#334155' },
  comafi: { bg: '#EEF2FF', accent: '#4338CA' },
  corrientes: { bg: '#ECFDF3', accent: '#059669' },
  credicoop: { bg: '#F6F9E8', accent: '#84A71E' },
  delsol: { bg: '#FFF7D6', accent: '#D97706' },
  entrerios: { bg: '#ECFDF5', accent: '#047857' },
  galicia: { bg: '#FFF1E6', accent: '#EA580C' },
  hipotecario: { bg: '#FFF3E8', accent: '#C2410C' },
  icbc: { bg: '#FEECEC', accent: '#B91C1C' },
  lagaceta: { bg: '#FFF7E6', accent: '#D97706' },
  macro: { bg: '#EAF2FF', accent: '#1D4ED8' },
  mercadopago: { bg: '#E5F5FF', accent: '#0284C7' },
  modo: { bg: '#F2EFFF', accent: '#7C3AED' },
  municipal: { bg: '#F0F9FF', accent: '#0369A1' },
  nacion: { bg: '#EAF2FF', accent: '#2563EB' },
  naranjax: { bg: '#FFF0E5', accent: '#EA580C' },
  patagonia: { bg: '#F0FDF4', accent: '#15803D' },
  personalpay: { bg: '#EAF6FF', accent: '#0284C7' },
  piano: { bg: '#F5F7FA', accent: '#475569' },
  sanjuan: { bg: '#EFFFF7', accent: '#059669' },
  santacruz: { bg: '#EAF7FF', accent: '#0284C7' },
  santafe: { bg: '#F0FDF4', accent: '#16A34A' },
  santander: { bg: '#FFECEC', accent: '#DC2626' },
  supervielle: { bg: '#FFF1F2', accent: '#E11D48' },
  yoy: { bg: '#F2F5FF', accent: '#4338CA' },
};

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getFontSize(name) {
  if (name.length > 18) return 58;
  if (name.length > 14) return 64;
  if (name.length > 10) return 72;
  return 84;
}

function storySvg({ name, bg, accent }) {
  const fontSize = getFontSize(name);
  return Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="tileShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="24" flood-color="#1C1C1E" flood-opacity="0.10"/>
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#1C1C1E" flood-opacity="0.06"/>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${bg}"/>
  <rect x="${TILE_X}" y="${TILE_Y}" width="${TILE_SIZE}" height="${TILE_SIZE}" rx="140" fill="#FFFFFF" filter="url(#tileShadow)"/>
  <rect x="${TILE_X - 18}" y="${TILE_Y - 18}" width="${TILE_SIZE + 36}" height="${TILE_SIZE + 36}" rx="158" fill="none" stroke="${accent}" stroke-width="3" opacity="0.16"/>
  <text x="${WIDTH / 2}" y="${NAME_Y}" text-anchor="middle" font-family="Space Grotesk, Inter, Arial, sans-serif" font-size="${fontSize}" font-weight="800" fill="#1C1C1E">${escapeXml(name)}</text>
  <text x="${WIDTH / 2}" y="${NAME_Y + 76}" text-anchor="middle" font-family="Space Grotesk, Inter, Arial, sans-serif" font-size="30" font-weight="700" fill="${accent}">Ya est\u00e1 en Blink</text>
</svg>
`);
}

async function buildLogoBuffer(inputPath) {
  return sharp(inputPath)
    .trim({ threshold: 8 })
    .resize(LOGO_SIZE, LOGO_SIZE, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();
}

async function buildStory(fileName) {
  const slug = path.basename(fileName, '.png');
  const inputPath = path.join(BANKS_DIR, fileName);
  const name = DISPLAY_NAMES[slug] || slug;
  const theme = BRAND_THEMES[slug] || { bg: '#EEF2FF', accent: '#4338CA' };
  const logo = await buildLogoBuffer(inputPath);
  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);

  await sharp(storySvg({ name, ...theme }))
    .composite([
      {
        input: logo,
        left: Math.round((WIDTH - LOGO_SIZE) / 2),
        top: Math.round(TILE_Y + (TILE_SIZE - LOGO_SIZE) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  return outputPath;
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
const bankFiles = (await fs.readdir(BANKS_DIR))
  .filter((fileName) => fileName.endsWith('.png'))
  .sort((a, b) => a.localeCompare(b));

const outputPaths = [];
for (const fileName of bankFiles) {
  outputPaths.push(await buildStory(fileName));
}

console.log(`Generated ${outputPaths.length} bank highlight stories:`);
for (const outputPath of outputPaths) {
  console.log(path.relative(ROOT, outputPath));
}
