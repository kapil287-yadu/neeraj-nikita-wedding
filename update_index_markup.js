const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const indexPath = path.join(projectDir, 'index.html');

console.log('--- UPDATING INDEX.HTML STRUCTURE ---');

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Remove previously inlined styles and scripts so we work on the clean markup template
html = html.replace(/<style id="royal-wedding-styles">[\s\S]*?<\/style>/, '<link rel="stylesheet" href="style.css">');
html = html.replace(/<script id="royal-wedding-script">[\s\S]*?<\/script>/, '<script src="script.js"></script>');
html = html.replace(/<link rel="stylesheet" href="\/style\.css">\s*/g, '');
html = html.replace(/<script src="\/script\.js"><\/script>\s*/g, '');

// 2. Upgrade the Welcome Gateway with Particles & Open Invitation CTA
const welcomeOldRegex = /<div id="welcome-gateway" class="welcome-overlay">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const welcomeNew = `<div id="welcome-gateway" class="welcome-overlay">
    <!-- Floating Golden Particles Container -->
    <div id="welcome-particles-wrap" class="welcome-particles-wrap"></div>

    <div class="welcome-card-wrapper">
      <div class="welcome-card">
        
        <!-- Sacred Ganesha Emblem with Divine Radiance -->
        <div class="welcome-ganesh-icon">
          <svg viewBox="0 0 100 100" width="65" height="65" class="gold-ganesh-svg" aria-label="Lord Ganesha">
            <defs>
              <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFF5D6"/>
                <stop offset="50%" stop-color="#C6A15B"/>
                <stop offset="100%" stop-color="#8E6A28"/>
              </linearGradient>
            </defs>
            <path d="M40,24 Q50,12 60,24 L56,33 L44,33 Z" fill="url(#goldShine)"/>
            <circle cx="50" cy="18" r="2.5" fill="#FFF"/>
            <path d="M44,33 Q30,33 26,45 Q32,54 42,48" fill="none" stroke="url(#goldShine)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M56,33 Q70,33 74,45 Q68,54 58,48" fill="none" stroke="url(#goldShine)" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M48,38 Q52,55 46,67 Q40,75 48,79 Q55,81 53,73" fill="none" stroke="url(#goldShine)" stroke-width="3" stroke-linecap="round"/>
            <circle cx="50" cy="35" r="1.5" fill="#C00"/>
            <circle cx="37" cy="59" r="2.5" fill="url(#goldShine)"/>
            <circle cx="50" cy="49" r="42" fill="none" stroke="url(#goldShine)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
          </svg>
        </div>

        <div class="bilingual-line center-line">
          <span class="en-shloka">Vakratunda Mahakaya • वक्रतुण्ड महाकाय</span>
          <span class="hi-shloka">॥ श्री गणेशाय नमः ॥</span>
        </div>
        
        <div class="vakratunda-shloka-banner text-center">
          <p class="hi-mantra-verse">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।</p>
          <p class="hi-mantra-verse">निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥</p>
        </div>
        
        <h1 class="welcome-couple-title">
          <span>NEERAJ</span>
          <span class="heart-symbol">&amp;</span>
          <span>NIKITA</span>
        </h1>
        
        <div class="welcome-invite-note">
          <p class="en-text">Wedding Invitation</p>
          <p class="hi-text">मांगलिक विवाह निमंत्रण</p>
        </div>

        <div class="welcome-date-badge">
          <span class="en-date">Saturday, 12 December 2026</span>
          <span class="hi-date">शनिवार, 12 दिसंबर 2026</span>
          <span class="venue-hint">Tulsi Marriage Garden, Jaipur</span>
        </div>

        <!-- Open Wedding Invitation Button -->
        <button id="btn-enter-invitation" class="btn-enter-invitation" aria-label="Open Wedding Invitation">
          <span class="btn-en">Open Wedding Invitation</span>
          <span class="btn-sep">|</span>
          <span class="btn-hi">निमंत्रण देखें</span>
          <span class="btn-arrow">⟶</span>
        </button>

        <p class="welcome-audio-tip">Tap to enter &amp; experience devotional music (Vakratunda Mahakaya)</p>

      </div>
    </div>
  </div>`;
html = html.replace(welcomeOldRegex, welcomeNew);

// 2. Update Audio Element with the user's authentic 5.6MB recording
const audioOldRegex = /<audio id="wedding-audio"[\s\S]*?<\/audio>/;
const audioNew = `<audio id="wedding-audio" loop preload="auto">
    <source src="assets/audio/vakratund-mahakay.mp3" type="audio/mpeg">
    <source src="assets/audio/vakratund-mahakay.m4a" type="audio/mp4">
    <source src="assets/audio/vakratunda-mahakaya.mp3" type="audio/mpeg">
    <source src="images/vakratund-mahakay.mp3" type="audio/mpeg">
    <source src="images/ganesh-mantra.mp3" type="audio/mpeg">
  </audio>`;
html = html.replace(audioOldRegex, audioNew);

// 3. Add "Wedding Film" to navigation
if (!html.includes('href="#wedding-film"')) {
  const coupleNavItem = `<a href="#couple" class="nav-item">
          <span class="en-nav">The Couple</span>
          <span class="hi-nav">वर-वधू</span>
        </a>`;
  const coupleWithFilm = `${coupleNavItem}
        <a href="#wedding-film" class="nav-item">
          <span class="en-nav">Wedding Film</span>
          <span class="hi-nav">वीडियो</span>
        </a>`;
  html = html.replace(coupleNavItem, coupleWithFilm);
}

// 4. Update Couple Photos with direct high-resolution paths and graceful fallbacks
const groomImgOld = /<img\s+src="images\/(?:groom|groom-portrait)\.jpg(?:\?v=[^"]*)?"[\s\S]*?class="portrait-img"[\s\S]*?>/;
const groomImgNew = `<img 
                src="images/groom-portrait.jpg?v=20261121" 
                alt="Neeraj - The Groom" 
                class="portrait-img" 
                loading="eager"
                onerror="this.onerror=null; this.src='images/groom.jpg?v=20261121';"
              >`;
html = html.replace(groomImgOld, groomImgNew);

const brideImgOld = /<img\s+src="images\/(?:bride|bride-seated)\.jpg(?:\?v=[^"]*)?"[\s\S]*?class="portrait-img"[\s\S]*?>/;
const brideImgNew = `<img 
                src="images/bride-seated.jpg?v=20261121" 
                alt="Nikita - The Bride" 
                class="portrait-img" 
                loading="eager"
                onerror="this.onerror=null; this.src='images/bride.jpg?v=20261121';"
              >`;
html = html.replace(brideImgOld, brideImgNew);

const coupleImgOld = /<img\s+src="images\/(?:couple|couple-rings)\.jpg(?:\?v=[^"]*)?"[\s\S]*?class="together-img"[\s\S]*?>/;
const coupleImgNew = `<img 
            src="images/couple-rings.jpg?v=20261121" 
            alt="Neeraj and Nikita" 
            class="together-img" 
            loading="eager"
            onerror="this.onerror=null; this.src='images/couple.jpg?v=20261121';"
          >`;
html = html.replace(coupleImgOld, coupleImgNew);

// Also cache bust hero couple background
html = html.replace(/images\/hero-couple\.jpg(?:\?v=[^"')]+)?/g, 'images/hero-couple.jpg?v=20261121');

// 5. Insert Wedding Video Section right after #couple section and before #events
const videoSectionMarkup = `
    <!-- ==============================================
         5. OUR WEDDING FILM (CINEMATIC VIDEO SHOWCASE)
         ============================================== -->
    <section id="wedding-film" class="section-container video-showcase-section reveal-on-scroll">
      <div class="section-title-wrap text-center">
        <div class="royal-flourish">❦ ✦ ❦</div>
        <h2 class="section-main-heading">
          <span class="en-heading">Our Wedding Film</span>
          <span class="hi-heading">पावन प्रेम स्मृति</span>
        </h2>
        <div class="gold-ornament-line">
          <span></span><i>🎬</i><span></span>
        </div>
        <div class="video-lead-note-bilingual">
          <p class="en-lead">A glimpse into our celebration of love and eternal togetherness</p>
          <p class="hi-lead">दो दिलों के पावन मिलन एवं खुशियों के कुछ ख़ास पल</p>
        </div>
      </div>

      <div class="video-wrapper-outer">
        <div class="video-cinematic-frame">
          <!-- Video Element with Poster -->
          <video 
            id="wedding-video-player" 
            class="wedding-video-element" 
            playsinline 
            controls 
            preload="metadata"
            poster="images/hero-couple.jpg"
          >
            <source src="assets/video/wedding-film.mp4" type="video/mp4">
            <source src="assets/video/wedding-highlights.mp4" type="video/mp4">
            <p>Your browser does not support HTML5 video playback.</p>
          </video>

          <!-- Custom Play Button Overlay -->
          <div id="video-custom-overlay" class="video-custom-overlay" title="Play Video • वीडियो देखें">
            <div id="btn-play-video" class="video-play-disc" role="button" aria-label="Play Wedding Film">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <div class="video-overlay-title-bilingual">
              <span class="en-vtitle">Play Wedding Film</span>
              <span class="hi-vtitle">पावन विवाह झलकियां देखें</span>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

if (!html.includes('id="wedding-film"')) {
  // Insert before events section
  html = html.replace(
    /<!-- =+[\r\n\s]+5\. WEDDING EVENTS/,
    `${videoSectionMarkup}\n\n    <!-- ==============================================\n         6. WEDDING EVENTS`
  );
  html = html.replace(/6\. VENUE & DIRECTIONS SECTION/g, '7. VENUE & DIRECTIONS SECTION');
  html = html.replace(/7\. CONTACT INFORMATION SECTION/g, '8. CONTACT INFORMATION SECTION');
  html = html.replace(/8\. ABOUT THE DEVELOPER SECTION/g, '9. ABOUT THE DEVELOPER SECTION');
  html = html.replace(/9\. ROYAL FOOTER/g, '10. ROYAL FOOTER');
}

// 6. Add reveal-on-scroll classes to key cards for smooth viewport animations
html = html.replace(/class="portrait-card groom-portrait"/, 'class="portrait-card groom-portrait reveal-on-scroll"');
html = html.replace(/class="portrait-card bride-portrait"/, 'class="portrait-card bride-portrait reveal-on-scroll"');
html = html.replace(/class="couple-together-card"/, 'class="couple-together-card reveal-on-scroll"');
html = html.replace(/class="events-section"/, 'class="events-section reveal-on-scroll"');
html = html.replace(/class="venue-info-box"/, 'class="venue-info-box reveal-on-scroll"');
html = html.replace(/class="venue-map-box"/, 'class="venue-map-box reveal-on-scroll"');
html = html.replace(/class="phone-contact-card"/g, 'class="phone-contact-card reveal-on-scroll"');
html = html.replace(/class="developer-profile-card"/, 'class="developer-profile-card reveal-on-scroll"');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('✓ index.html successfully updated with video showcase, high-res photos, particles, and scroll reveals.');
