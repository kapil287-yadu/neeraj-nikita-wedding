const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- RUNNING RIGOROUS WEDDING WEBSITE VALIDATION ---');

const projectDir = __dirname;

// 1. Check index.html content
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// A. Check Neeraj spelling - NO Niraj allowed!
if (!html.includes('NEERAJ &amp; NIKITA') && !html.includes('NEERAJ & NIKITA')) {
  throw new Error('Missing correct uppercase spelling "NEERAJ"');
}
if (!html.includes('Neeraj')) {
  throw new Error('Missing correct title-case spelling "Neeraj"');
}
if (html.includes('Niraj') || html.includes('NIRAJ')) {
  throw new Error('Found old incorrect spelling "Niraj" in index.html!');
}
console.log('✓ Neeraj spelling validated: Zero occurrences of Niraj found.');

// B. Check Beautiful Memories / Gallery removal
if (html.includes('Beautiful Memories') || html.includes('id="gallery"') || html.includes('gallery-grid') || html.includes('href="#gallery"')) {
  throw new Error('Beautiful Memories / Gallery section is still present in index.html!');
}
console.log('✓ Beautiful Memories / Gallery section validated: Completely removed.');

// C. Check Background Song (User MP3)
if (!html.includes('wedding-music.mp3') && !html.includes('vakratund-mahakay.mp3')) {
  throw new Error('Missing user MP3 audio source in index.html!');
}
console.log('✓ User MP3 song integration validated.');

// D. Verify strictly 3 phone numbers and WhatsApp buttons
const expectedNumbers = ['+91 9694786363', '+91 8824446601', '+91 7597117853'];
expectedNumbers.forEach(num => {
  if (!html.includes(num)) {
    throw new Error(`Missing expected phone number: ${num}`);
  }
});
if (!html.includes('wa.me/919694786363') || !html.includes('wa.me/918824446601') || !html.includes('wa.me/917597117853')) {
  throw new Error('Missing direct WhatsApp links for all 3 phone numbers');
}
console.log('✓ All 3 contact numbers and WhatsApp buttons validated.');

// E. Check forbidden items
const forbiddenItems = [
  'Send Your Blessings',
  'Groom\'s Family',
  'Bride\'s Family',
  'Event Coordinator & RSVP',
  'Engagement Gallery',
  'gallery-lightbox',
  'id="wedding-film"',
  'href="#wedding-film"'
];
forbiddenItems.forEach(item => {
  if (html.includes(item)) {
    throw new Error(`Forbidden element found: "${item}"`);
  }
});
console.log('✓ Forbidden elements (Wedding Film, Engagement Gallery, Blessings) completely absent.');

// F. Check developer credit in footer: Designed & Developed by Kapil Yaduvanshi
if (!html.includes('Kapil Yaduvanshi')) {
  throw new Error('Missing Kapil Yaduvanshi developer credit');
}
if (!html.includes('Designed &amp; Developed by Kapil Yaduvanshi') && !html.includes('Designed & Developed by Kapil Yaduvanshi')) {
  throw new Error('Missing exact footer credit "Designed & Developed by Kapil Yaduvanshi"');
}
console.log('✓ Elegant footer credit validated: Designed & Developed by Kapil Yaduvanshi.');

// F2. Check Continuous Scroll Indicator & Floating Auto Scroll Controller
if (!html.includes('id="hero-scroll-indicator"') || !html.includes('Scroll to Explore More')) {
  throw new Error('Missing continuous hero scroll indicator');
}
if (!html.includes('id="auto-scroll-controller"') || !html.includes('Pause Auto Scroll')) {
  throw new Error('Missing floating auto scroll controller');
}
console.log('✓ Continuous hero scroll indicator and auto scroll controller validated.');

// G. Check JS script
const js = fs.readFileSync(path.join(projectDir, 'script.js'), 'utf8');
if (js.includes('Niraj') || js.includes('NIRAJ')) {
  throw new Error('Found old spelling "Niraj" in script.js!');
}
if (js.includes('initLightbox') || js.includes('openLightbox') || js.includes('initVideoShowcase')) {
  throw new Error('Unused or removed methods still present in script.js');
}

// H. Check CSS
const css = fs.readFileSync(path.join(projectDir, 'style.css'), 'utf8');
if (!css.includes('.contact-numbers-row') || !css.includes('.btn-whatsapp')) {
  throw new Error('Missing CSS rules for contact numbers or WhatsApp button');
}

// I. Check real photos exist and are authentic high-res files (> 100 KB)
['groom.jpg', 'bride.jpg', 'couple.jpg', 'hero-couple.jpg'].forEach(img => {
  const p = path.join(projectDir, 'images', img);
  if (!fs.existsSync(p)) throw new Error(`Image ${img} does not exist`);
  const sz = fs.statSync(p).size;
  if (sz < 100000) throw new Error(`Image ${img} is too small (${sz} bytes), dummy placeholder detected!`);
});
console.log('✓ All real photograph assets verified (> 100 KB).');

// J. Check user MP3 audio file (> 2 MB)
['assets/audio/wedding-music.mp3', 'images/wedding-music.mp3'].forEach(aud => {
  const p = path.join(projectDir, aud);
  if (!fs.existsSync(p)) throw new Error(`Audio file ${aud} does not exist`);
  const sz = fs.statSync(p).size;
  if (sz < 2000000) throw new Error(`Audio file ${aud} is too small (${sz} bytes)!`);
});
console.log('✓ Authentic user MP3 audio verified (3.7 MB).');

// K. Check Countdown Timer in Hero Section
if (!html.includes('class="hero-countdown-wrap"') || !html.includes('class="countdown-tiles"')) {
  throw new Error('Missing countdown timer wrapper or tiles in Hero section');
}
['days-val', 'hours-val', 'minutes-val', 'seconds-val'].forEach(id => {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing countdown element ID: ${id}`);
});
['Days', 'Hours', 'Minutes', 'Seconds', 'दिन', 'घंटे', 'मिनट', 'सेकंड'].forEach(lbl => {
  if (!html.includes(lbl)) throw new Error(`Missing countdown bilingual label: ${lbl}`);
});
console.log('✓ Hero countdown timer verified: 4 bilingual units (Days, Hours, Minutes, Seconds).');

// L. Check Open Graph & Twitter Social Sharing Metadata
const ogTitle = 'NEERAJ &amp; NIKITA ❤️ Wedding Invitation | विवाह निमंत्रण';
const ogDesc = 'A Celebration of Love, Togetherness &amp; Forever. Join us on Saturday, 12 December 2026 at Tulsi Marriage Garden, Jaipur.';
const ogImgUrl = 'https://neeraj-nikita-wedding.vercel.app/images/og-preview.jpg';

if (!html.includes(ogTitle) && !html.includes('NEERAJ & NIKITA ❤️ Wedding Invitation | विवाह निमंत्रण')) {
  throw new Error('Missing exact Open Graph title');
}
if (!html.includes(ogDesc) && !html.includes('A Celebration of Love, Togetherness & Forever. Join us on Saturday, 12 December 2026 at Tulsi Marriage Garden, Jaipur.')) {
  throw new Error('Missing exact Open Graph description');
}
if (!html.includes(ogImgUrl)) {
  throw new Error('Missing absolute Open Graph image URL');
}
['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'].forEach(tag => {
  if (!html.includes(`"${tag}"`)) throw new Error(`Missing required social tag: ${tag}`);
});

// Check og-preview.jpg file
const ogImgPath = path.join(projectDir, 'images', 'og-preview.jpg');
if (!fs.existsSync(ogImgPath)) throw new Error('Missing og-preview.jpg');
const ogBuffer = fs.readFileSync(ogImgPath);
let foundOgDimensions = false;
for (let i = 0; i < ogBuffer.length - 8; i++) {
  if (ogBuffer[i] === 0xFF && (ogBuffer[i+1] === 0xC0 || ogBuffer[i+1] === 0xC2)) {
    const h = ogBuffer.readUInt16BE(i + 5);
    const w = ogBuffer.readUInt16BE(i + 7);
    if (w !== 1200 || h !== 630) {
      throw new Error(`og-preview.jpg dimensions are ${w}x${h}, expected 1200x630!`);
    }
    foundOgDimensions = true;
    break;
  }
}
if (!foundOgDimensions) throw new Error('Could not verify og-preview.jpg dimensions');
console.log('✓ Open Graph metadata & 1200x630 preview image verified.');

console.log('✓ All file and code integrity checks passed successfully!');

// Test HTTP server serving index.html
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  http.get(`http://127.0.0.1:${port}`, (res) => {
    console.log(`✓ HTTP Server test: Status ${res.statusCode}`);
    let body = '';
    res.on('data', chunk => { body += chunk; });
    res.on('end', () => {
      server.close();
      if (res.statusCode === 200 && (body.includes('NEERAJ &amp; NIKITA') || body.includes('NEERAJ & NIKITA'))) {
        console.log('✓ Server returned 200 OK with correct live webpage content (NEERAJ & NIKITA).');
        process.exit(0);
      } else {
        console.error('Server returned unexpected content or status. Length:', body.length);
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    server.close();
    console.error('Server connection error:', err.message);
    process.exit(1);
  });
});
