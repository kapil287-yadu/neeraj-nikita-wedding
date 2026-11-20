const fs = require('fs');
const path = require('path');

const projectDir = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\niraj-nikita-wedding';
const imgDir = path.join(projectDir, 'images');

if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

function getSvg(title, subtitle, iconType) {
  let iconSvg = '';
  if (iconType === 'groom') {
    iconSvg = `
      <!-- Royal Safa & Turban -->
      <path d="M220,100 C190,100 160,115 160,140 C160,165 190,170 220,170 C250,170 280,165 280,140 C280,115 250,100 220,100 Z" fill="#800020" stroke="#D4AF37" stroke-width="3"/>
      <path d="M175,130 Q220,110 265,130" stroke="#F3E5AB" stroke-width="2.5" fill="none"/>
      <path d="M170,145 Q220,125 270,145" stroke="#F3E5AB" stroke-width="2.5" fill="none"/>
      <!-- Royal Kalgi Feather -->
      <path d="M220,105 Q225,65 235,50 Q240,75 228,105 Z" fill="#D4AF37"/>
      <circle cx="223" cy="100" r="7" fill="#E5C158" stroke="#800020" stroke-width="2"/>
      <circle cx="223" cy="100" r="3" fill="#800020"/>
      <!-- Royal Silhouette -->
      <path d="M190,175 Q220,205 250,175 Q260,215 240,245 Q220,255 200,245 Q180,215 190,175 Z" fill="#5A0A16" stroke="#D4AF37" stroke-width="2"/>
      <!-- Royal Sherwani & Brocade Collar -->
      <path d="M150,255 Q220,230 290,255 L305,325 L135,325 Z" fill="#38040C" stroke="#D4AF37" stroke-width="2.5"/>
      <path d="M220,245 L220,325" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="220" cy="265" r="4" fill="#D4AF37"/>
      <circle cx="220" cy="285" r="4" fill="#D4AF37"/>
      <circle cx="220" cy="305" r="4" fill="#D4AF37"/>
      <!-- Royal Pearl Mala -->
      <path d="M185,255 Q220,300 255,255" fill="none" stroke="#FFFDD0" stroke-width="3" stroke-dasharray="2,5"/>
    `;
  } else if (iconType === 'bride') {
    iconSvg = `
      <!-- Royal Bridal Chunari / Veil -->
      <path d="M150,145 Q220,95 290,145 Q310,210 290,270 Q220,280 150,270 Q130,210 150,145 Z" fill="#800020" stroke="#D4AF37" stroke-width="3"/>
      <!-- Royal Maang Tikka -->
      <line x1="220" y1="110" x2="220" y2="150" stroke="#D4AF37" stroke-width="2.5"/>
      <circle cx="220" cy="155" r="9" fill="#E5C158" stroke="#800020" stroke-width="2"/>
      <circle cx="220" cy="155" r="4" fill="#800020"/>
      <!-- Bridal Nath (Nose Ring) -->
      <circle cx="205" cy="205" r="10" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <path d="M205,200 Q235,195 255,220" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="3,3"/>
      <!-- Royal Bridal Silhouette & Lehenga -->
      <path d="M185,170 Q220,195 255,170 Q265,210 245,240 Q220,250 195,240 Q175,210 185,170 Z" fill="#5A0A16" stroke="#D4AF37" stroke-width="2"/>
      <path d="M140,260 Q220,230 300,260 L315,325 L125,325 Z" fill="#420610" stroke="#D4AF37" stroke-width="2.5"/>
      <!-- Heavy Gold Kundan Necklace -->
      <path d="M175,255 Q220,295 265,255" fill="none" stroke="#D4AF37" stroke-width="4"/>
      <path d="M185,265 Q220,305 255,265" fill="none" stroke="#F3E5AB" stroke-width="3"/>
    `;
  } else {
    iconSvg = `
      <!-- Intertwined Varmala Garland & Golden Monogram -->
      <circle cx="220" cy="180" r="65" fill="#4A0A16" stroke="#D4AF37" stroke-width="3"/>
      <circle cx="220" cy="180" r="58" fill="none" stroke="#F3E5AB" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="220" y="190" font-family="'Cinzel', Georgia, serif" font-size="30" font-weight="bold" fill="#F3E5AB" text-anchor="middle" letter-spacing="3">N &amp; N</text>
      <text x="220" y="210" font-family="'Yatra One', Georgia, serif" font-size="14" fill="#D4AF37" text-anchor="middle">शुभ परिणय</text>
      <!-- Auspicious Kalash with Swastik -->
      <path d="M195,260 L245,260 L240,295 L200,295 Z" fill="#800020" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="220" cy="250" r="14" fill="#D4AF37"/>
      <!-- Coconut & Mango leaves -->
      <path d="M220,236 Q210,220 220,210 Q230,220 220,236 Z" fill="#AA771C"/>
      <path d="M205,250 Q190,235 200,225" stroke="#2E7D32" stroke-width="2.5" fill="none"/>
      <path d="M235,250 Q250,235 240,225" stroke="#2E7D32" stroke-width="2.5" fill="none"/>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 440" width="440" height="440">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#4A0E17"/>
      <stop offset="65%" stop-color="#26040A"/>
      <stop offset="100%" stop-color="#140205"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5C0"/>
      <stop offset="30%" stop-color="#D4AF37"/>
      <stop offset="70%" stop-color="#996515"/>
      <stop offset="100%" stop-color="#F3E5AB"/>
    </linearGradient>
    <pattern id="gridPat" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1.5" fill="#D4AF37" opacity="0.18"/>
    </pattern>
  </defs>

  <rect width="440" height="440" fill="url(#bgGrad)"/>
  <rect width="440" height="440" fill="url(#gridPat)"/>

  <!-- Ornate Royal Gold Outer Frame -->
  <rect x="18" y="18" width="404" height="404" rx="18" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
  <rect x="25" y="25" width="390" height="390" rx="12" fill="none" stroke="#D4AF37" stroke-width="1.2" stroke-dasharray="5,4" opacity="0.75"/>

  <!-- Ornate Floral Corners -->
  <g fill="url(#goldGrad)">
    <path d="M22,22 L50,22 Q32,32 22,50 Z"/>
    <path d="M418,22 L390,22 Q408,32 418,50 Z"/>
    <path d="M22,418 L50,418 Q32,408 22,390 Z"/>
    <path d="M418,418 L390,418 Q408,408 418,390 Z"/>
  </g>

  <!-- Centered Icon Illustration -->
  <g>
    ${iconSvg}
  </g>

  <!-- Royal Labels -->
  <text x="220" y="358" font-family="'Cinzel', 'Playfair Display', Georgia, serif" font-size="24" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="2">${title}</text>
  <text x="220" y="384" font-family="'Yatra One', 'Noto Serif Devanagari', Georgia, serif" font-size="16" fill="#F3E5AB" text-anchor="middle" opacity="0.95" letter-spacing="1">${subtitle}</text>
  <text x="220" y="405" font-family="sans-serif" font-size="10" fill="#D4AF37" text-anchor="middle" opacity="0.7" letter-spacing="3">NEERAJ &amp; NIKITA • 12 DEC 2026</text>
</svg>`;
}

// Generate SVG files
fs.writeFileSync(path.join(imgDir, 'groom.svg'), getSvg('NEERAJ', 'वर (दूल्हा)', 'groom'));
fs.writeFileSync(path.join(imgDir, 'bride.svg'), getSvg('NIKITA', 'वधू (दुल्हन)', 'bride'));
fs.writeFileSync(path.join(imgDir, 'couple.svg'), getSvg('NEERAJ & NIKITA', 'शुभ परिणय', 'couple'));

// Also generate minimal valid JPEG files for groom.jpg, bride.jpg, couple.jpg
// A standard 1x1 or minimal JFIF/JPEG image buffer so <img> tags don't fail HTTP network requests
// and can render cleanly, while also having SVG fallback
function createMinimalJpeg() {
  // Minimal valid 1x1 JPEG bytes
  return Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
    0x00, 0x48, 0x00, 0x00, 0xff, 0xdb, 0x00, 0x43, 0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08,
    0x07, 0x07, 0x07, 0x09, 0x09, 0x08, 0x0a, 0x0c, 0x14, 0x0d, 0x0c, 0x0b, 0x0b, 0x0c, 0x19, 0x12,
    0x13, 0x0f, 0x14, 0x1d, 0x1a, 0x1f, 0x1e, 0x1d, 0x1a, 0x1c, 0x1c, 0x20, 0x24, 0x2e, 0x27, 0x20,
    0x22, 0x2c, 0x23, 0x1c, 0x1c, 0x28, 0x37, 0x29, 0x2c, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1f, 0x27,
    0x39, 0x3d, 0x38, 0x32, 0x3c, 0x2e, 0x33, 0x34, 0x32, 0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01,
    0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xff, 0xc4, 0x00, 0x1f, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01,
    0x01, 0x01, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04,
    0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0xff, 0xda, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3f,
    0x00, 0xbf, 0x80, 0xff, 0xd9
  ]);
}

const minJpg = createMinimalJpeg();
fs.writeFileSync(path.join(imgDir, 'groom.jpg'), minJpg);
fs.writeFileSync(path.join(imgDir, 'bride.jpg'), minJpg);
fs.writeFileSync(path.join(imgDir, 'couple.jpg'), minJpg);

console.log('Image placeholders and JPEGs generated successfully.');
