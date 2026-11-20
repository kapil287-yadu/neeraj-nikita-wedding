const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- RUNNING RIGOROUS WEDDING WEBSITE VALIDATION ---');

const projectDir = __dirname;

// 1. Check index.html content
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

// Verify strictly 3 phone numbers
const expectedNumbers = ['+91 9694786363', '+91 8824446601', '+91 7597117853'];
expectedNumbers.forEach(num => {
  if (!html.includes(num)) {
    throw new Error(`Missing expected phone number: ${num}`);
  }
});

// Check if any old contact cards or fake numbers exist
const oldItems = ['Send Your Blessings', 'Groom\'s Family', 'Bride\'s Family', 'Event Coordinator & RSVP', 'Engagement Gallery'];
oldItems.forEach(item => {
  if (html.includes(item)) {
    throw new Error(`Forbidden old element found: "${item}"`);
  }
});

// Check developer card & footer credit
if (!html.includes('Kapil Yaduvanshi')) {
  throw new Error('Missing Kapil Yaduvanshi name');
}
if (!html.includes('yaduvanshikapil287@gmail.com')) {
  throw new Error('Missing developer email');
}
if (!html.includes('Crafted with ❤️ by Kapil Yaduvanshi')) {
  throw new Error('Missing exact footer credit');
}

// Check social share tags
if (!html.includes('images/og-share.jpg') && !html.includes('images/og-share.svg')) {
  throw new Error('Missing og-share tag');
}

// Check Lightbox elements
if (!html.includes('gallery-lightbox') || !html.includes('openLightbox')) {
  throw new Error('Missing Lightbox integration in gallery');
}

// Check JS script
const js = fs.readFileSync(path.join(projectDir, 'script.js'), 'utf8');
if (!js.includes('openLightbox') || !js.includes('closeLightbox')) {
  throw new Error('Missing lightbox methods in script.js');
}
if (js.includes('handleWishSubmit') || js.includes('wishes-list')) {
  throw new Error('Unwanted wishes script remaining in script.js');
}

// Check CSS
const css = fs.readFileSync(path.join(projectDir, 'style.css'), 'utf8');
if (!css.includes('.contact-numbers-row') || !css.includes('.developer-profile-card') || !css.includes('.lightbox-overlay')) {
  throw new Error('Missing CSS rules for updated sections');
}
if (css.includes('.wish-form-box')) {
  throw new Error('Unwanted wishes form CSS found in style.css');
}

console.log('✓ All file and code integrity checks passed successfully!');

// Test HTTP server
http.get('http://127.0.0.1:3000', (res) => {
  console.log(`✓ HTTP Server test: Status ${res.statusCode}`);
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200 && (body.includes('NIRAJ &amp; NIKITA') || body.includes('NIRAJ & NIKITA'))) {
      console.log('✓ Server returned 200 OK with correct live webpage content.');
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
