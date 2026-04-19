// ═══════════════════════════════════════════════════════════════════════════
// MODULE: ui.js
// PURPOSE: UI rendering and DOM manipulation
// DEPENDENCIES: analytics.js, app.js (state vars, getLS, setLS, ALL_TOPICS)
// ═══════════════════════════════════════════════════════════════════════════

// ── CONFIRMATION MODAL ──────────────────────────────────────────────────
var pendingConfirmAction = null;

/**
 * Show confirmation modal
 * @param {*} action - Action to confirm
 * @param {string} message - Confirmation message
 */
function showConfirm(action, message) {
  pendingConfirmAction = action;
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmModal').classList.remove('off');
}

/**
 * Close confirmation modal
 */
function closeConfirm() {
  document.getElementById('confirmModal').classList.add('off');
  pendingConfirmAction = null;
}

/**
 * Handle confirmation modal overlay click
 * @param {Event} event - Click event
 */
function confirmOverlayClick(event) {
  if (event.target === document.getElementById('confirmModal')) closeConfirm();
}

/**
 * Confirm and execute pending action
 */
function confirmDelete() {
  if (typeof pendingConfirmAction === 'object' && pendingConfirmAction.action === 'clearTopic') {
    var topicId = pendingConfirmAction.topicId;
    var bms = getBookmarks();
    var count = 0;
    bms.forEach(function(key) {
      if (key.startsWith(topicId + ':')) {
        bms.delete(key);
        count++;
      }
    });
    saveBookmarks(bms);

    // Track clear topic button click
    trackEvent('clear_button_clicked', {
      'action': 'clear_topic',
      'topic_id': topicId,
      'bookmarks_cleared': count,
      'remaining_bookmarks': bms.size
    });

    updateBmBadge();
    renderBookmarks();
  } else if (pendingConfirmAction === 'clearAll') {
    var totalCount = getBookmarks().size;
    setLS('bookmarks', []);

    // Track clear all button click
    trackEvent('clear_button_clicked', {
      'action': 'clear_all',
      'bookmarks_cleared': totalCount,
      'remaining_bookmarks': 0
    });

    updateBmBadge();
    renderBookmarks();
  }
  closeConfirm();
}

/**
 * Show landing page
 */
function showLanding() {
  curSection = 'landing';
  curTopic = null;
  curFilter = 'all';
  document.getElementById('landingView').classList.remove('off');
  document.getElementById('homeView').classList.add('off');
  document.getElementById('topicView').classList.remove('on');
  document.getElementById('bookmarkView').classList.remove('on');
  document.getElementById('bookmarkView').classList.add('off');
  window.scrollTo(0, 0);
  history.pushState({ section: 'landing' }, '', location.pathname);
  renderLanding();
}

/**
 * Update section buttons (Frontend/Backend)
 */
function updateSectionButtons() {
  var frontendBtn = document.getElementById('frontendBtn');
  var backendBtn = document.getElementById('backendBtn');

  if (curSection === 'frontend') {
    if (frontendBtn) frontendBtn.classList.add('on');
    if (backendBtn) backendBtn.classList.remove('on');
  } else if (curSection === 'backend') {
    if (backendBtn) backendBtn.classList.add('on');
    if (frontendBtn) frontendBtn.classList.remove('on');
  }
}

/**
 * Render landing page
 */
function renderLanding() {
  var feTopics = ALL_TOPICS.filter(function(t) { return TOPIC_SECTIONS.frontend.includes(t.id); });
  var beTopics = ALL_TOPICS.filter(function(t) { return TOPIC_SECTIONS.backend.includes(t.id); });
  var feQ = feTopics.reduce(function(s, t) { return s + t.qs.length; }, 0);
  var beQ = beTopics.reduce(function(s, t) { return s + t.qs.length; }, 0);

  var landingCards = document.getElementById('landingCards');
  landingCards.innerHTML =
    '<div class="landing-cards-container">' +
      '<div class="lcard lcard-fe" onclick="showSection(\'frontend\')">' +
        '<div class="lcard-header">' +
          '<div class="lcard-icon">⚛️</div>' +
          '<div class="lcard-meta"><div class="lcard-title">Frontend</div><div class="lcard-topics">' + feTopics.length + ' topics</div></div>' +
          '<div class="lcard-qcount">' + feQ + '<span>Q&amp;As</span></div>' +
        '</div>' +
        '<p class="lcard-desc">Master modern web development — from JavaScript fundamentals and React patterns to full-stack Next.js architecture.</p>' +
        '<div class="lcard-topic-chips">' + feTopics.map(function(t) { return '<span class="ltchip" style="background:' + t.ib + ';color:' + t.ic + '">' + t.icon + ' ' + t.title + '</span>'; }).join('') + '</div>' +
        '<div class="lcard-difficulty"><span class="ldiff easy">● Easy</span><span class="ldiff med">● Medium</span><span class="ldiff hard">● Hard</span></div>' +
        '<div class="lcard-btn">Start Frontend <span>→</span></div>' +
      '</div>' +
      '<div class="lcard lcard-be" onclick="showSection(\'backend\')">' +
        '<div class="lcard-header">' +
          '<div class="lcard-icon">☕</div>' +
          '<div class="lcard-meta"><div class="lcard-title">Backend</div><div class="lcard-topics">' + beTopics.length + ' topics</div></div>' +
          '<div class="lcard-qcount">' + beQ + '<span>Q&amp;As</span></div>' +
        '</div>' +
        '<p class="lcard-desc">Go deep on Java, Spring Boot, microservices, cloud infrastructure, databases, and system design.</p>' +
        '<div class="lcard-topic-chips">' +
          beTopics.slice(0, 10).map(function(t) { return '<span class="ltchip" style="background:' + t.ib + ';color:' + t.ic + '">' + t.icon + ' ' + t.title + '</span>'; }).join('') +
          '<span class="ltchip ltchip-more">+' + (beTopics.length - 10) + ' more</span>' +
        '</div>' +
        '<div class="lcard-difficulty"><span class="ldiff easy">● Easy</span><span class="ldiff med">● Medium</span><span class="ldiff hard">● Hard</span></div>' +
        '<div class="lcard-btn">Start Backend <span>→</span></div>' +
      '</div>' +
    '</div>';
}

/**
 * Update the hero section text
 */
function updateHeroSection() {
  var config = SECTION_CONFIG[curSection];
  var homeView = document.getElementById('homeView');
  var hero = homeView.querySelector('.hero-chip');
  var heroH1 = homeView.querySelector('.hero-inner h1');
  var heroSub = homeView.querySelector('.hero-sub');

  if (hero) hero.textContent = config.chip;
  if (heroH1) heroH1.innerHTML = config.heading;
  if (heroSub) heroSub.textContent = config.subheading;
}

/**
 * Update filter buttons
 */
function updateFilterButtons() {
  var filterRow = document.getElementById('filterRow');
  if (!filterRow) return;

  var config = SECTION_CONFIG[curSection];
  var categories = config.categories;

  filterRow.innerHTML = Object.entries(categories).map(function(entry) {
    var key = entry[0], label = entry[1];
    return '<button class="fp ' + (curFilter === key ? 'on' : '') + '" onclick="setF(\'' + key + '\',this)">' + label + '</button>';
  }).join('');
}

/**
 * Update global stats
 */
function updateStats() {
  var total = ALL_TOPICS.reduce(function(s, t) { return s + t.qs.length; }, 0);
  var el = document.getElementById('totalQ');
  if (el) el.textContent = total + '+';
  var meta = document.getElementById('navMeta');
  if (meta) meta.textContent = total + '+ Q · ' + ALL_TOPICS.length + ' topics';
}

/**
 * Update section-specific stats
 */
function updateSectionStats() {
  var sectionTopics = [];
  if (curSection === 'frontend') {
    sectionTopics = ALL_TOPICS.filter(function(t) { return TOPIC_SECTIONS.frontend.includes(t.id); });
  } else if (curSection === 'backend') {
    sectionTopics = ALL_TOPICS.filter(function(t) { return TOPIC_SECTIONS.backend.includes(t.id); });
  }

  var totalQuestions = sectionTopics.reduce(function(s, t) { return s + t.qs.length; }, 0);
  var totalTopics = sectionTopics.length;

  var qEl = document.getElementById('totalQ');
  if (qEl) qEl.textContent = totalQuestions + '+';

  var statsbar = document.querySelector('.statsbar');
  if (statsbar) {
    var topicsEl = statsbar.querySelector('.sbi:nth-child(2) .sbn');
    if (topicsEl) topicsEl.textContent = totalTopics;
  }
}

/**
 * Render the main topics grid
 */
function renderGrid() {
  var q  = (document.getElementById('gSearch') ? document.getElementById('gSearch').value : '').trim().toLowerCase();
  var grid = document.getElementById('topicGrid');
  var lbl  = document.getElementById('gridLbl');
  if (!grid) return;

  updateHeroSection();
  updateFilterButtons();
  updateSectionStats();

  var topics = curSection === 'frontend'
    ? ALL_TOPICS.filter(function(t) { return TOPIC_SECTIONS.frontend.includes(t.id); })
    : ALL_TOPICS.filter(function(t) { return TOPIC_SECTIONS.backend.includes(t.id); });

  if (curFilter !== 'all') {
    if (curSection === 'frontend') {
      topics = topics.filter(function(t) { return t.id === curFilter; });
    } else {
      var categoryTopics = [];
      var cats = BACKEND_CATEGORIES[curFilter] || [];
      cats.forEach(function(grp) {
        topics.forEach(function(t) { if (t.id === grp) categoryTopics.push(t); });
      });
      topics = categoryTopics;
    }
  }

  if (q) {
    topics = topics.filter(function(t) {
      return t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.tags.some(function(tag) { return tag.toLowerCase().includes(q); }) ||
        t.qs.some(function(item) { return item.q.toLowerCase().includes(q); });
    });
  }

  lbl.textContent = (curFilter === 'all' ? 'All Topics' : capitalize(curFilter)) + ' — ' + topics.length;

  if (topics.length === 0) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="empty-icon">🔍</div><p>No topics match "<strong>' + q + '</strong>"</p></div>';
    return;
  }

  var bms = getBookmarks();
  grid.innerHTML = topics.map(function(t, i) {
    var qc = t.qs.length;
    var easy = t.qs.filter(function(q) { return q.d === 'easy'; }).length;
    var med  = t.qs.filter(function(q) { return q.d === 'medium'; }).length;
    var hard = t.qs.filter(function(q) { return q.d === 'hard'; }).length;
    // Count bookmarks for this topic
    var bmCount = 0;
    bms.forEach(function(key) { if (key.startsWith(t.id + ':')) bmCount++; });
    var bmBadgeHtml = bmCount > 0 ? '<span class="tc-bm-count">⭐ ' + bmCount + '</span>' : '';
    return '<div class="tc" onclick="showTopic(\'' + t.id + '\')" style="--tglow:' + t.tglow + ';animation-delay:' + (i * 0.03) + 's">' +
      '<div class="tc-top">' +
        '<div class="tc-icon" style="background:' + t.ib + ';color:' + t.ic + '">' + t.icon + '</div>' +
        '<span class="tc-badge">' + t.grp + '</span>' +
      '</div>' +
      '<div class="prog"><div class="progf" style="width:' + Math.min((qc/20)*100,100) + '%;background:' + t.bar + '"></div></div>' +
      '<div class="tc-title">' + t.title + '</div>' +
      '<div class="tc-desc">' + t.desc + '</div>' +
      '<div class="tc-tags">' + t.tags.slice(0,4).map(function(tag) { return '<span class="ttag">' + tag + '</span>'; }).join('') + '</div>' +
      '<div class="tc-foot">' +
        '<span class="tc-qc"><strong>' + qc + '</strong> questions &nbsp;·&nbsp;' +
          '<span style="color:#4ade80">' + easy + 'E</span>&nbsp;' +
          '<span style="color:#fb923c">' + med + 'M</span>&nbsp;' +
          '<span style="color:#f87171">' + hard + 'H</span>' +
          (bmBadgeHtml ? '&nbsp;·&nbsp;' + bmBadgeHtml : '') +
        '</span>' +
        '<div class="tc-arr">→</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

/**
 * Activate topic view
 */
function _activateTopic() {
  document.getElementById('homeView').classList.add('off');
  document.getElementById('topicView').classList.add('on');
  window.scrollTo(0, 0);
  renderTopic();
}

/**
 * Render topic detail page
 */
function renderTopic() {
  var t = curTopic;
  var qs = curDiff === 'all' ? t.qs : t.qs.filter(function(q) { return q.d === curDiff; });
  var easy = t.qs.filter(function(q) { return q.d === 'easy'; }).length;
  var med  = t.qs.filter(function(q) { return q.d === 'medium'; }).length;
  var hard = t.qs.filter(function(q) { return q.d === 'hard'; }).length;
  var bms = getBookmarks();

  document.getElementById('topicContent').innerHTML =
    '<div class="thdr">' +
      '<div class="thdr-icon" style="background:' + t.ib + ';color:' + t.ic + '">' + t.icon + '</div>' +
      '<div class="thdr-info">' +
        '<div class="thdr-title">' + t.title + '</div>' +
        '<div class="thdr-meta">' + t.desc + '</div>' +
        '<div class="thdr-stats">' +
          '<div class="ths"><span class="ths-n">' + t.qs.length + '</span><span class="ths-l">Total</span></div>' +
          '<div class="ths"><span class="ths-n" style="color:#4ade80">' + easy + '</span><span class="ths-l">Easy</span></div>' +
          '<div class="ths"><span class="ths-n" style="color:#fb923c">' + med + '</span><span class="ths-l">Medium</span></div>' +
          '<div class="ths"><span class="ths-n" style="color:#f87171">' + hard + '</span><span class="ths-l">Hard</span></div>' +
        '</div>' +
      '</div>' +
      '<button class="quiz-topic-btn" onclick="openQuizSetup(\'' + t.id + '\')">🎯 Start Quiz</button>' +
    '</div>' +

    '<div class="drow">' +
      '<button class="db ' + (curDiff==='all'?'on':'') + '" onclick="setDiff(\'all\')">All (' + t.qs.length + ')</button>' +
      '<button class="db easy ' + (curDiff==='easy'?'on':'') + '" onclick="setDiff(\'easy\')">Easy (' + easy + ')</button>' +
      '<button class="db medium ' + (curDiff==='medium'?'on':'') + '" onclick="setDiff(\'medium\')">Medium (' + med + ')</button>' +
      '<button class="db hard ' + (curDiff==='hard'?'on':'') + '" onclick="setDiff(\'hard\')">Hard (' + hard + ')</button>' +
    '</div>' +

    '<div class="qlist" id="qlist">' +
      (qs.length === 0
        ? '<div class="empty"><div class="empty-icon">📭</div><p>No questions for this filter.</p></div>'
        : qs.map(function(item, i) {
            var isBm = bms.has(t.id + ':' + i);
            return '<div class="qi" id="qi-' + i + '">' +
              '<div class="qq" onclick="toggleQ(' + i + ')">' +
                '<span class="qnum">' + String(i+1).padStart(2,'0') + '.</span>' +
                '<span class="qtext">' + item.q + '</span>' +
                '<div class="qright">' +
                  '<span class="dbadge ' + item.d + '">' + item.d.charAt(0).toUpperCase() + item.d.slice(1) + '</span>' +
                  '<button class="bm-btn ' + (isBm ? 'bm-active' : '') + '" data-key="' + t.id + ':' + i + '" onclick="toggleBookmark(\'' + t.id + '\',' + i + ',event)" title="' + (isBm ? 'Remove bookmark' : 'Bookmark this question') + '">⭐</button>' +
                  '<span class="qchev">▼</span>' +
                '</div>' +
              '</div>' +
              '<div class="qans"><div class="qans-in">' + item.a + '</div></div>' +
            '</div>';
          }).join('')
      ) +
    '</div>';
}

/**
 * Toggle question open/closed
 * @param {number} i - Question index
 */
function toggleQ(i) {
  var el = document.getElementById('qi-' + i);
  if (!el) return;
  el.classList.toggle('open');
}

/**
 * Set difficulty filter
 * @param {string} d - Difficulty level
 */
function setDiff(d) {
  curDiff = d;
  renderTopic();
}

/**
 * Go home
 */
function goHome() {
  // Hide bookmark view if shown
  var bv = document.getElementById('bookmarkView');
  bv.classList.remove('on');
  bv.classList.add('off');

  if (curTopic) {
    curTopic = null;
    curDiff = 'all';
    document.getElementById('topicView').classList.remove('on');
    document.getElementById('homeView').classList.remove('off');
    window.scrollTo(0, 0);
    if (curSection === 'frontend' || curSection === 'backend') {
      history.pushState({ section: curSection }, '', '#' + curSection);
      renderGrid();
    } else {
      showLanding();
    }
  } else {
    showLanding();
  }
}

/**
 * Set filter
 * @param {string} filter - Filter value
 * @param {Element} btn - Filter button element
 */
function setF(filter, btn) {
  curFilter = filter;
  if (btn) {
    document.querySelectorAll('.fp').forEach(function(b) { b.classList.remove('on'); });
    btn.classList.add('on');
  }
  renderGrid();
}
