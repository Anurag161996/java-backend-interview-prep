// ═══════════════════════════════════════════════════════════════════════════
// app.js - CORE APPLICATION
// PURPOSE: App initialization, global state, and core utilities
// VERSION: 2.0 (Modular Architecture)
// ═══════════════════════════════════════════════════════════════════════════

// ── GLOBAL STATE & CONFIGURATION ──────────────────────────────────────────
const ALL_TOPICS = [
  SEC_JAVA, SEC_SPRING, SEC_HIBERNATE, SEC_THREADS, SEC_SQL,
  SEC_REST, SEC_REDIS, SEC_KAFKA, SEC_HLD, SEC_MICRO,
  SEC_DOCKER, SEC_AWS, SEC_K8S, SEC_OBS, SEC_PERF, SEC_SEC,
  SEC_GRPC, SEC_REACTIVE, SEC_CICD, SEC_AI,
  SEC_TESTING, SEC_PATTERNS, SEC_SOLID, SEC_MAVEN, SEC_DSA, SEC_REACT,
  SEC_JS, SEC_NEXTJS
];

let curSection = 'landing'; // 'landing', 'frontend', 'backend'
let curFilter = 'all';
let curTopic  = null;
let curDiff   = 'all';

const SECTION_CONFIG = {
  frontend: {
    chip: '📚 Frontend Interview Guide',
    heading: 'Master Your <span class="ca">Frontend</span> Interview with <span class="cg">Confidence</span>',
    subheading: 'Learn 483 frontend Q&As on JavaScript, React, Next.js, and modern web development.',
    categories: { all: 'All', javascript: 'JavaScript', react: 'React', nextjs: 'Next.js' }
  },
  backend: {
    chip: '📚 Backend Interview Guide',
    heading: 'Master Your <span class="ca">Backend</span> Interview with <span class="cg">Confidence</span>',
    subheading: 'Learn 681 backend Q&As across Java, Spring, infrastructure, and advanced architecture.',
    categories: { all: 'All', core: 'Core Backend', advanced: 'Advanced Topics', infra: 'Infrastructure & Data' }
  }
};

const BACKEND_CATEGORIES = {
  core: ['java', 'multithreading', 'dsa', 'perf', 'maven', 'springboot', 'hibernate', 'restapi', 'security', 'grpc', 'reactive', 'testing'],
  advanced: ['designpatterns', 'solid', 'microservices', 'hld', 'ai'],
  infra: ['sql', 'redis', 'docker', 'aws', 'k8s', 'kafka', 'obs', 'cicd']
};

const TOPIC_SECTIONS = {
  frontend: ['javascript', 'react', 'nextjs'],
  backend: ['java', 'springboot', 'hibernate', 'multithreading', 'sql', 'restapi', 'redis', 'kafka', 'hld', 'microservices', 'docker', 'aws', 'k8s', 'obs', 'perf', 'security', 'grpc', 'reactive', 'cicd', 'ai', 'testing', 'designpatterns', 'solid', 'maven', 'dsa']
};

// ── localStorage HELPERS ──────────────────────────────────────────────────
function getLS(key, fallback) {
  if (fallback === undefined) fallback = null;
  try { var v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch(e) { return fallback; }
}
function setLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}

// ── THEME MANAGEMENT ──────────────────────────────────────────────────────
function initTheme() {
  if (getLS('theme') === 'light') {
    document.body.classList.add('light');
    var btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = '☀️';
  }
}

function toggleTheme() {
  document.body.classList.toggle('light');
  var isLight = document.body.classList.contains('light');
  setLS('theme', isLight ? 'light' : 'dark');
  var btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = isLight ? '☀️' : '🌙';

  // Track theme change
  trackEvent('theme_change', {
    'theme': isLight ? 'light' : 'dark'
  });
}

// ── SECTION NAVIGATION ────────────────────────────────────────────────────
function showSection(section) {
  if (section !== 'frontend' && section !== 'backend') return;
  curSection = section;
  curTopic = null;
  curFilter = 'all';
  document.getElementById('landingView').classList.add('off');
  document.getElementById('homeView').classList.remove('off');
  document.getElementById('topicView').classList.remove('on');
  document.getElementById('bookmarkView').classList.remove('on');
  document.getElementById('bookmarkView').classList.add('off');
  window.scrollTo(0, 0);
  history.pushState({ section: section }, '', '#' + section);

  // Track section button click
  trackEvent('section_button_clicked', {
    'section': section,
    'button_name': capitalize(section) + ' Interview Guide'
  });

  // Track section view
  trackPageView('/' + section, capitalize(section) + ' Interview Guide');

  updateSectionButtons();
  renderGrid();
}

/**
 * Show topic detail page
 * @param {string} id - Topic ID
 */
function showTopic(id) {
  curTopic = ALL_TOPICS.find(function(t) { return t.id === id; });
  if (!curTopic) return;
  curDiff = 'all';

  if (!curSection || curSection === 'landing') {
    if (TOPIC_SECTIONS.frontend.includes(id)) {
      curSection = 'frontend';
    } else {
      curSection = 'backend';
    }
  }

  // Track topic view with URL
  var topicPath = '/' + curSection + '/' + id;
  trackEvent('topic_url_clicked', {
    'topic_id': id,
    'topic_name': curTopic.title,
    'topic_url': topicPath,
    'total_questions': curTopic.qs.length,
    'section': curSection,
    'easy_count': curTopic.qs.filter(function(q) { return q.d === 'easy'; }).length,
    'medium_count': curTopic.qs.filter(function(q) { return q.d === 'medium'; }).length,
    'hard_count': curTopic.qs.filter(function(q) { return q.d === 'hard'; }).length
  });

  trackPageView(topicPath, curTopic.title);

  history.pushState({ topicId: id }, '', '#' + id);
  _activateTopic();
}

/**
 * Handle search input
 */
function onSearch() {
  if (curTopic) return;
  var searchQuery = document.getElementById('gSearch').value.trim();
  if (searchQuery) {
    trackEvent('search', {
      'search_query': searchQuery
    });
  }
  renderGrid();
}

/**
 * Utility: Capitalize first letter
 * @param {string} s - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── APP INITIALIZATION ────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  initTheme();
  updateStats();
  updateBmBadge();

  // Handle routing based on hash
  var hash = location.hash.slice(1);
  if (hash === 'frontend') {
    showSection('frontend');
  } else if (hash === 'backend') {
    showSection('backend');
  } else {
    // Check if hash is a topic ID
    var topic = ALL_TOPICS.find(function(t) { return t.id === hash; });
    if (topic) {
      // Infer section from topic
      if (TOPIC_SECTIONS.frontend.includes(hash)) {
        curSection = 'frontend';
      } else {
        curSection = 'backend';
      }
      curTopic = topic;
      curDiff = 'all';
      updateSectionButtons();
      document.getElementById('landingView').classList.add('off');
      document.getElementById('homeView').classList.add('off');
      document.getElementById('topicView').classList.add('on');
      renderTopic();
    } else {
      // No hash or unknown - show landing
      showLanding();
    }
  }
});

window.addEventListener('popstate', function() {
  var hash = location.hash.slice(1);

  // Check if it's a section
  if (hash === 'frontend') {
    showSection('frontend');
    return;
  } else if (hash === 'backend') {
    showSection('backend');
    return;
  }

  // Check if it's a topic
  var topic = ALL_TOPICS.find(function(t) { return t.id === hash; });
  if (topic) {
    if (TOPIC_SECTIONS.frontend.includes(hash)) {
      curSection = 'frontend';
    } else {
      curSection = 'backend';
    }
    curTopic = topic;
    curDiff = 'all';
    updateSectionButtons();
    document.getElementById('homeView').classList.add('off');
    document.getElementById('topicView').classList.add('on');
    window.scrollTo(0, 0);
    renderTopic();
    return;
  }

  // No hash or unknown - go to landing
  showLanding();
});

// ═══════════════════════════════════════════════════════════════════════════
// MODULE STRUCTURE:
//
// analytics.js  → Google Analytics tracking (trackEvent, trackPageView)
// bookmarks.js  → Bookmark management
// quiz.js       → Quiz functionality and gamification
// ui.js         → DOM rendering and UI manipulation
// app.js        → Core app state and initialization (this file)
//
// ═══════════════════════════════════════════════════════════════════════════
