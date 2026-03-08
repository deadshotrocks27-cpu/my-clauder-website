/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
if (cursor && cursorRing) {
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });
}

/* ── MODAL FUNCTIONS ── */
function openModal(id) {
  var modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  var modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

/* ── VENDOR INQUIRY ── */
function openInquiry(vendorName) {
  var el = document.getElementById('inquiryVendorName');
  if (el) el.textContent = 'Get in touch with ' + vendorName;
  openModal('inquiryModal');
}

function submitInquiry() {
  var name = document.getElementById('iq-name').value.trim();
  var phone = document.getElementById('iq-phone').value.trim();
  var msg = document.getElementById('iq-msg').value.trim();
  if (!name || !phone || !msg) {
    alert('Please fill in all required fields.');
    return;
  }
  document.getElementById('iq-success').style.display = 'block';
  document.getElementById('iq-name').parentElement.querySelectorAll('.modal-label, .modal-input, .modal-submit').forEach(function(el) {
    el.style.display = 'none';
  });
  setTimeout(function() { closeModal('inquiryModal'); resetInquiry(); }, 3000);
}

function resetInquiry() {
  document.getElementById('iq-name').value = '';
  document.getElementById('iq-phone').value = '';
  document.getElementById('iq-date').value = '';
  document.getElementById('iq-msg').value = '';
  document.getElementById('iq-success').style.display = 'none';
  var modal = document.getElementById('inquiryModal');
  modal.querySelectorAll('.modal-label, .modal-input, .modal-submit').forEach(function(el) {
    el.style.display = '';
  });
}

/* ── QUOTE MODAL ── */
function toggleOpt(el) {
  el.classList.toggle('selected');
}

function selectGuest(el) {
  el.parentElement.querySelectorAll('.q-opt').forEach(function(o) { o.classList.remove('selected'); });
  el.classList.add('selected');
}

function selectBudget(el) {
  el.parentElement.querySelectorAll('.q-opt').forEach(function(o) { o.classList.remove('selected'); });
  el.classList.add('selected');
}

function quoteNext(step) {
  for (var i = 1; i <= 3; i++) {
    var page = document.getElementById('q-page' + i);
    if (page) page.style.display = i === step ? 'block' : 'none';
  }
  for (var j = 1; j <= 3; j++) {
    var s = document.getElementById('qs' + j);
    if (s) {
      if (j <= step) s.classList.add('done');
      else s.classList.remove('done');
    }
  }
}

function submitQuote() {
  var name = document.getElementById('q-name').value.trim();
  var phone = document.getElementById('q-phone').value.trim();
  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }
  document.getElementById('q-success').style.display = 'block';
  document.getElementById('q-page3').style.display = 'none';
  document.querySelector('#quoteModal .quote-steps').style.display = 'none';
  document.querySelector('#quoteModal .modal-sub').style.display = 'none';
  setTimeout(function() { closeModal('quoteModal'); resetQuote(); }, 4000);
}

function resetQuote() {
  document.getElementById('q-success').style.display = 'none';
  var steps = document.querySelector('#quoteModal .quote-steps');
  var sub = document.querySelector('#quoteModal .modal-sub');
  if (steps) steps.style.display = '';
  if (sub) sub.style.display = '';
  document.getElementById('q-page1').style.display = 'block';
  document.getElementById('q-page2').style.display = 'none';
  document.getElementById('q-page3').style.display = 'none';
  document.querySelectorAll('#quoteModal .q-opt').forEach(function(o) { o.classList.remove('selected'); });
  document.getElementById('q-name').value = '';
  document.getElementById('q-phone').value = '';
  document.getElementById('q-email').value = '';
  document.getElementById('q-date').value = '';
  var qs1 = document.getElementById('qs1');
  var qs2 = document.getElementById('qs2');
  var qs3 = document.getElementById('qs3');
  if (qs1) qs1.classList.add('done');
  if (qs2) qs2.classList.remove('done');
  if (qs3) qs3.classList.remove('done');
}

/* ── CITY FILTER ── */
function filterCity(city, btn) {
  document.querySelectorAll('.city-tab').forEach(function(t) { t.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.vendor-card').forEach(function(card) {
    if (city === 'all' || card.getAttribute('data-city') === city) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/* ── STAR RATING ── */
var selectedRating = 0;
document.querySelectorAll('.star-btn').forEach(function(star) {
  star.addEventListener('click', function() {
    selectedRating = parseInt(this.getAttribute('data-val'));
    document.querySelectorAll('.star-btn').forEach(function(s, i) {
      s.textContent = i < selectedRating ? '\u2605' : '\u2606';
      if (i < selectedRating) s.classList.add('active');
      else s.classList.remove('active');
    });
  });
});

/* ── FEEDBACK SUBMIT ── */
var fbSubmit = document.getElementById('fbSubmit');
if (fbSubmit) {
  fbSubmit.addEventListener('click', function() {
    var name = document.getElementById('fbName').value.trim();
    var msg = document.getElementById('fbMsg').value.trim();
    if (!name || !msg || selectedRating === 0) {
      alert('Please fill in your name, rating, and feedback.');
      return;
    }
    document.getElementById('fbSuccess').style.display = 'block';
    fbSubmit.style.display = 'none';
    document.querySelectorAll('.fb-row').forEach(function(r) { r.style.display = 'none'; });
    setTimeout(function() {
      document.getElementById('fbSuccess').style.display = 'none';
      fbSubmit.style.display = '';
      document.querySelectorAll('.fb-row').forEach(function(r) { r.style.display = ''; });
      document.getElementById('fbName').value = '';
      document.getElementById('fbCity').value = '';
      document.getElementById('fbMsg').value = '';
      selectedRating = 0;
      document.querySelectorAll('.star-btn').forEach(function(s) {
        s.textContent = '\u2606';
        s.classList.remove('active');
      });
    }, 3000);
  });
}

/* ── LEAD EMAIL CAPTURE ── */
var leadBtn = document.getElementById('leadBtn');
if (leadBtn) {
  leadBtn.addEventListener('click', function() {
    var email = document.getElementById('leadEmail').value.trim();
    if (!email || email.indexOf('@') === -1) {
      alert('Please enter a valid email address.');
      return;
    }
    document.getElementById('leadFormWrap').style.display = 'none';
    document.getElementById('leadSuccess').style.display = 'block';
    setTimeout(function() {
      document.getElementById('leadFormWrap').style.display = '';
      document.getElementById('leadSuccess').style.display = 'none';
      document.getElementById('leadEmail').value = '';
    }, 4000);
  });
}

/* ── REVEAL ON SCROLL ── */
var revealElements = document.querySelectorAll('.reveal');
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(function(el) {
  revealObserver.observe(el);
});

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
