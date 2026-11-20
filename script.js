/**
 * NIRAJ & NIKITA WEDDING - INTERACTIVE JAVASCRIPT
 * Bilingual Royal Experience • 10 - 12 December 2026 | Jaipur, Rajasthan
 * Developed by Kapil Yaduvanshi
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioExperience();
  initWelcomeGateway();
  initLiveCountdown();
  initScheduleFilters();
  initMobileNav();
  initLightbox();
});

/* ==========================================================================
   1. DEVOTIONAL AUDIO EXPERIENCE
   ========================================================================== */
let audioEl = null;
let isAudioMuted = false;
let audioContext = null;
let softGainNode = null;
let isAcousticPlaying = false;

function initAudioExperience() {
  audioEl = document.getElementById('wedding-audio');
  if (!audioEl) return;

  // Gentle low default volume (15%)
  audioEl.volume = 0.15;
  audioEl.loop = true;

  // Check saved session mute preference
  const savedMute = sessionStorage.getItem('wedding_music_muted');
  if (savedMute === 'true') {
    isAudioMuted = true;
    updateMusicUI(false);
  } else {
    isAudioMuted = false;
  }

  // Gracefully handle any loading errors
  audioEl.addEventListener('error', (e) => {
    console.info('Audio playback ready for acoustic fallback.', e);
  });

  const toggleBtn = document.getElementById('music-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleMusic);
  }
}

// Starts ONLY upon clicking "Enter Invitation"
function startDevotionalMusic() {
  if (!audioEl) return;

  if (isAudioMuted) {
    updateMusicUI(false);
    return;
  }

  const playPromise = audioEl.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      updateMusicUI(true);
    }).catch((err) => {
      console.log('Audio file playback prevented or missing, starting soft acoustic fallback:', err);
      startAcousticFallback();
      updateMusicUI(true);
    });
  }
}

function toggleMusic() {
  isAudioMuted = !isAudioMuted;
  sessionStorage.setItem('wedding_music_muted', isAudioMuted);

  if (isAudioMuted) {
    if (audioEl) audioEl.pause();
    stopAcousticFallback();
    updateMusicUI(false);
  } else {
    if (audioEl && audioEl.readyState >= 2) {
      audioEl.play().then(() => {
        updateMusicUI(true);
      }).catch(() => {
        startAcousticFallback();
        updateMusicUI(true);
      });
    } else {
      startAcousticFallback();
      updateMusicUI(true);
    }
  }
}

function updateMusicUI(isPlaying) {
  const toggleBtn = document.getElementById('music-toggle-btn');
  if (!toggleBtn) return;

  const enLabel = toggleBtn.querySelector('.music-en');
  const hiLabel = toggleBtn.querySelector('.music-hi');

  if (isPlaying && !isAudioMuted) {
    toggleBtn.classList.remove('muted');
    if (enLabel) enLabel.textContent = 'Music: ON';
    if (hiLabel) hiLabel.textContent = 'संगीत चालू';
  } else {
    toggleBtn.classList.add('muted');
    if (enLabel) enLabel.textContent = 'Music: OFF';
    if (hiLabel) hiLabel.textContent = 'संगीत बंद';
  }
}

/* Soft Devotional Acoustic Fallback (Harmonic Raga Bhupali) */
function startAcousticFallback() {
  if (isAcousticPlaying) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!audioContext) audioContext = new AudioCtx();

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    softGainNode = audioContext.createGain();
    softGainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
    softGainNode.connect(audioContext.destination);

    // Warm, peaceful harmonics
    const tones = [146.83, 220.00, 293.66, 369.99, 440.00];
    tones.forEach((freq, idx) => {
      const osc = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      noteGain.gain.setValueAtTime(0.18 / (idx + 1), audioContext.currentTime);
      osc.connect(noteGain);
      noteGain.connect(softGainNode);
      osc.start();
    });

    isAcousticPlaying = true;
  } catch (err) {
    console.log('Acoustic fallback inactive', err);
  }
}

function stopAcousticFallback() {
  if (!isAcousticPlaying || !softGainNode) return;
  try {
    softGainNode.gain.setValueAtTime(0, audioContext.currentTime);
    isAcousticPlaying = false;
  } catch (e) {}
}


/* ==========================================================================
   2. WELCOME MODAL / GATEWAY
   ========================================================================== */
function initWelcomeGateway() {
  const enterBtn = document.getElementById('btn-enter-invitation');
  const gateway = document.getElementById('welcome-gateway');
  const body = document.body;

  if (!enterBtn || !gateway) return;

  enterBtn.addEventListener('click', () => {
    startDevotionalMusic();
    gateway.classList.add('opened');
    body.classList.remove('welcome-locked');

    setTimeout(() => {
      gateway.style.display = 'none';
    }, 750);
  });
}


/* ==========================================================================
   3. LIVE COUNTDOWN TIMER TO 12 DECEMBER 2026
   ========================================================================== */
function initLiveCountdown() {
  // Saturday, 12 December 2026, 11:00 AM IST
  const weddingTime = new Date('2026-12-12T11:00:00+05:30').getTime();

  const daysEl = document.getElementById('days-val');
  const hoursEl = document.getElementById('hours-val');
  const minutesEl = document.getElementById('minutes-val');
  const secondsEl = document.getElementById('seconds-val');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const now = new Date().getTime();
    const diff = weddingTime - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  update();
  setInterval(update, 1000);
}


/* ==========================================================================
   4. WEDDING EVENTS (ALL VISIBLE BY DEFAULT)
   ========================================================================== */
function initScheduleFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const dayClusters = document.querySelectorAll('.day-cluster-group');

  if (!filterBtns.length || !dayClusters.length) return;

  // ALL clusters visible by default
  dayClusters.forEach((cluster) => {
    cluster.style.display = 'block';
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      dayClusters.forEach((cluster) => {
        if (filter === 'all') {
          cluster.style.display = 'block';
        } else {
          if (cluster.getAttribute('data-cluster') === filter) {
            cluster.style.display = 'block';
          } else {
            cluster.style.display = 'none';
          }
        }
      });
    });
  });
}


/* ==========================================================================
   5. ADD-TO-CALENDAR (GOOGLE CALENDAR & .ICS EXPORT)
   ========================================================================== */
window.addToCalendar = function(title, startISO, endISO, location, details) {
  const formatGCal = (isoStr) => {
    const d = new Date(isoStr);
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Niraj & Nikita Wedding: ' + title
  )}&dates=${formatGCal(startISO)}/${formatGCal(endISO)}&details=${encodeURIComponent(
    details
  )}&location=${encodeURIComponent(location)}`;

  window.open(gCalUrl, '_blank');
};

window.downloadAllEventsICS = function() {
  const events = [
    {
      title: "Tel Mandap Ceremony - Niraj & Nikita Wedding",
      desc: "Traditional Tel Mandap ceremony at Tulsi Marriage Garden, Jaipur",
      start: "20261210T100000",
      end: "20261210T120000"
    },
    {
      title: "Khanamati Magar / Khamani - Niraj & Nikita Wedding",
      desc: "Khanamati Magar ritual and celebratory dinner",
      start: "20261210T180000",
      end: "20261210T210000"
    },
    {
      title: "Haldi Ceremony - Niraj & Nikita Wedding",
      desc: "Turmeric blessings and celebratory rituals",
      start: "20261211T100000",
      end: "20261211T130000"
    },
    {
      title: "Chak Ceremony - Niraj & Nikita Wedding",
      desc: "Chak auspicious ritual",
      start: "20261211T140000",
      end: "20261211T150000"
    },
    {
      title: "Mahila Sangeet - Niraj & Nikita Wedding",
      desc: "Musical dance and celebratory evening",
      start: "20261211T150000",
      end: "20261211T190000"
    },
    {
      title: "Bhat Ceremony - Niraj & Nikita Wedding",
      desc: "Grand maternal family welcoming and traditional gifts ceremony",
      start: "20261211T210000",
      end: "20261211T233000"
    },
    {
      title: "Lagan-Tika - Niraj & Nikita Wedding",
      desc: "Formal auspicious tilak ceremony between families",
      start: "20261212T110000",
      end: "20261212T133000"
    },
    {
      title: "Preetibhoj / Wedding Feast - Niraj & Nikita Wedding",
      desc: "Royal wedding feast honoring all esteemed guests",
      start: "20261212T191500",
      end: "20261212T233000"
    },
    {
      title: "Baraat Prasthan - Niraj & Nikita Wedding",
      desc: "Grand wedding procession with royal music and fanfare",
      start: "20261212T200000",
      end: "20261212T223000"
    },
    {
      title: "Panigrahan Sanskar (Wedding Vows) - Niraj & Nikita",
      desc: "Sacred Saat Phere around holy Agni at auspicious Muhurat",
      start: "20261212T223000",
      end: "20261213T030000"
    }
  ];

  const venueLoc = "Tulsi Marriage Garden, Near Bhairo Circle, Pratap Nagar, Jaipur, Rajasthan, India";

  let icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Niraj Nikita Wedding//IN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n";

  events.forEach((ev, idx) => {
    icsContent += "BEGIN:VEVENT\r\n";
    icsContent += `UID:wedding-event-${idx + 1}-202612@nirajnikita.com\r\n`;
    icsContent += `DTSTAMP:20261120T120000Z\r\n`;
    icsContent += `DTSTART;TZID=Asia/Kolkata:${ev.start}\r\n`;
    icsContent += `DTEND;TZID=Asia/Kolkata:${ev.end}\r\n`;
    icsContent += `SUMMARY:${ev.title}\r\n`;
    icsContent += `DESCRIPTION:${ev.desc}\r\n`;
    icsContent += `LOCATION:${venueLoc}\r\n`;
    icsContent += `STATUS:CONFIRMED\r\n`;
    icsContent += "END:VEVENT\r\n";
  });

  icsContent += "END:VCALENDAR\r\n";

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Niraj_Nikita_Wedding_Schedule_2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


/* ==========================================================================
   6. VENUE ADDRESS COPY
   ========================================================================== */
window.copyVenueAddress = function() {
  const addressText = "Tulsi Marriage Garden, Near Bhairo Circle, Pratap Nagar, Jaipur, Rajasthan, India";
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(addressText).then(showToast);
  } else {
    const tempInput = document.createElement('textarea');
    tempInput.value = addressText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast();
  }

  function showToast() {
    const toast = document.getElementById('copy-toast');
    if (toast) {
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }
  }
};


/* ==========================================================================
   7. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const items = document.querySelectorAll('.nav-item');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  items.forEach((item) => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}


/* ==========================================================================
   8. LIGHTBOX MODAL FUNCTIONALITY
   ========================================================================== */
function initLightbox() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
    }
  });
}

window.openLightbox = function(src, caption) {
  const modal = document.getElementById('gallery-lightbox');
  const modalImg = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  if (!modal || !modalImg) return;

  modalImg.src = src;
  modalImg.alt = caption || 'Niraj & Nikita Wedding Memory';
  if (captionEl) {
    captionEl.textContent = caption || '';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function(e) {
  if (e && e.target && e.target.classList.contains('lightbox-active-img')) {
    return; // Don't close if clicking directly on image
  }
  const modal = document.getElementById('gallery-lightbox');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';
};
