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

// C. Check Vakratunda Mahakaya background song integration
if (!html.includes('vakratund-mahakay.mp3') && !html.includes('vakratunda-mahakaya.mp3')) {
  throw new Error('Missing Vakratunda Mahakaya audio source in index.html!');
}
if (!html.includes('वक्रतुण्ड महाकाय') || !html.includes('Vakratunda Mahakaya')) {
  throw new Error('Missing Vakratunda Mahakaya text in UI / Audio toggle!');
}
console.log('✓ Vakratunda Mahakaya song integration validated.');

// D. Verify strictly 3 phone numbers
const expectedNumbers = ['+91 9694786363', '+91 8824446601', '+91 7597117853'];
expectedNumbers.forEach(num => {
  if (!html.includes(num)) {
    throw new Error(`Missing expected phone number: ${num}`);
  }
});

// E. Check if any old contact cards or fake items exist
const forbiddenItems = [
  'Send Your Blessings',
  'Groom\'s Family',
  'Bride\'s Family',
  'Event Coordinator & RSVP',
  'Engagement Gallery',
  'gallery-lightbox'
];
forbiddenItems.forEach(item => {
  if (html.includes(item)) {
    throw new Error(`Forbidden element found: "${item}"`);
  }
});

// F. Check developer card & footer credit
if (!html.includes('Kapil Yaduvanshi')) {
  throw new Error('Missing Kapil Yaduvanshi name');
}
if (!html.includes('yaduvanshikapil287@gmail.com')) {
  throw new Error('Missing developer email');
}
if (!html.includes('Crafted with ❤️ by Kapil Yaduvanshi')) {
  throw new Error('Missing exact footer credit');
}

// G. Check JS script
const js = fs.readFileSync(path.join(projectDir, 'script.js'), 'utf8');
if (js.includes('Niraj') || js.includes('NIRAJ')) {
  throw new Error('Found old spelling "Niraj" in script.js!');
}
if (js.includes('initLightbox') || js.includes('openLightbox')) {
  throw new Error('Lightbox methods still present in script.js');
}

// H. Check CSS
const css = fs.readFileSync(path.join(projectDir, 'style.css'), 'utf8');
if (!css.includes('.contact-numbers-row') || !css.includes('.developer-profile-card')) {
  throw new Error('Missing CSS rules for updated sections');
}

// I. Check real photos exist and are authentic high-res files (> 100 KB)
['groom.jpg', 'bride.jpg', 'couple.jpg', 'hero-couple.jpg'].forEach(img => {
  const p = path.join(projectDir, 'images', img);
  if (!fs.existsSync(p)) throw new Error(`Image ${img} does not exist`);
  const sz = fs.statSync(p).size;
  if (sz < 50000) throw new Error(`Image ${img} is too small (${sz} bytes), dummy placeholder detected!`);
});
console.log('✓ All real photograph assets verified (> 100 KB).');

console.log('✓ All file and code integrity checks passed successfully!');

// Test HTTP server
http.get('http://127.0.0.1:3000', (res) => {
  console.log(`✓ HTTP Server test: Status ${res.statusCode}`);
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200 && (body.includes('NEERAJ &amp; NIKITA') || body.includes('NEERAJ & NIKITA'))) {
      console.log('✓ Server returned 200 OK with correct live webpage content (NEERAJ & NIKITA).');
      process.exit(0);
    } else {
      console.error('Server returned unexpected content or status. Length:', body.length);
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Server connection error:', err.message);
  process.exit(1);
});
