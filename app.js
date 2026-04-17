// ── ENGINE ───────────────────────────────────────────────────────────────────
const ALL_TOPICS = [
  SEC_JAVA, SEC_SPRING, SEC_HIBERNATE, SEC_THREADS, SEC_SQL,
  SEC_REST, SEC_REDIS, SEC_KAFKA, SEC_HLD, SEC_MICRO,
  SEC_DOCKER, SEC_AWS, SEC_K8S, SEC_OBS, SEC_PERF, SEC_SEC,
  SEC_GRPC, SEC_REACTIVE, SEC_CICD, SEC_AI,
  SEC_TESTING, SEC_PATTERNS, SEC_SOLID, SEC_MAVEN, SEC_DSA, SEC_REACT,
  SEC_JS
];

let curSection = 'landing'; // 'landing', 'frontend', 'backend'
let curFilter = 'all';
let curTopic  = null;
let curDiff   = 'all';

// ── SECTION CONFIGURATION ────────────────────────────────────────────────────
const SECTION_CONFIG = {
  frontend: {
    chip: '📚 Frontend Interview Guide',
    heading: 'Master Your <span class="ca">Frontend</span> Interview with <span class="cg">Confidence</span>',
    subheading: 'Learn 140+ frontend Q&As on JavaScript, React, and modern web development.',
    categories: { all: 'All', javascript: 'JavaScript', react: 'React' }
  },
  backend: {
    chip: '📚 Backend Interview Guide',
    heading: 'Master Your <span class="ca">Backend</span> Interview with <span class="cg">Confidence</span>',
    subheading: 'Learn 530+ backend Q&As across Java, Spring, infrastructure, and advanced architecture.',
    categories: { all: 'All', core: 'Core Backend', advanced: 'Advanced Topics', infra: 'Infrastructure & Data' }
  }
};

// Category mapping for backend topics
const BACKEND_CATEGORIES = {
  core: ['java', 'spring', 'test'],
  advanced: ['arch'],
  infra: ['data', 'infra']
};

// Topic section assignment
const TOPIC_SECTIONS = {
  frontend: ['javascript', 'react'],
  backend: ['java', 'spring', 'hibernate', 'threads', 'sql', 'rest', 'redis', 'kafka', 'hld', 'microservices', 'docker', 'aws', 'kubernetes', 'observability', 'performance', 'security', 'grpc', 'reactive', 'cicd', 'ai', 'testing', 'patterns', 'solid', 'maven', 'dsa']
};

// ── INIT ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  updateStats();

  // Handle routing based on hash
  const hash = location.hash.slice(1);
  if (hash === 'frontend') {
    showSection('frontend');
  } else if (hash === 'backend') {
    showSection('backend');
  } else {
    // Check if hash is a topic ID
    const topic = ALL_TOPICS.find(t => t.id === hash);
    if (topic) {
      // Infer section from topic
      if (TOPIC_SECTIONS.frontend.includes(hash)) {
        curSection = 'frontend';
      } else {
        curSection = 'backend';
      }
      curTopic = topic;
      curDiff = 'all';
      renderTopic();
      document.getElementById('landingView').classList.add('off');
      document.getElementById('homeView').classList.add('on');
    } else {
      // No hash or unknown - show landing
      showLanding();
    }
  }
});

window.addEventListener('popstate', () => {
  const hash = location.hash.slice(1);

  // Check if it's a section
  if (hash === 'frontend') {
    showSection('frontend');
    return;
  } else if (hash === 'backend') {
    showSection('backend');
    return;
  }

  // Check if it's a topic
  const topic = ALL_TOPICS.find(t => t.id === hash);
  if (topic) {
    if (TOPIC_SECTIONS.frontend.includes(hash)) {
      curSection = 'frontend';
    } else {
      curSection = 'backend';
    }
    curTopic = topic;
    curDiff = 'all';
    document.getElementById('homeView').classList.add('on');
    document.getElementById('topicView').classList.add('on');
    window.scrollTo(0, 0);
    renderTopic();
    return;
  }

  // No hash or unknown - go to landing
  showLanding();
});

// ── SECTIONS ──────────────────────────────────────────────────────────────────
function showLanding() {
  curSection = 'landing';
  curTopic = null;
  curFilter = 'all';
  document.getElementById('landingView').classList.remove('off');
  document.getElementById('homeView').classList.add('off');
  document.getElementById('topicView').classList.remove('on');
  window.scrollTo(0, 0);
  history.pushState({ section: 'landing' }, '', location.pathname);
  renderLanding();
}

function showSection(section) {
  if (section !== 'frontend' && section !== 'backend') return;
  curSection = section;
  curTopic = null;
  curFilter = 'all';
  document.getElementById('landingView').classList.add('off');
  document.getElementById('homeView').classList.remove('off');
  document.getElementById('topicView').classList.remove('on');
  window.scrollTo(0, 0);
  history.pushState({ section: section }, '', '#' + section);
  renderGrid();
}

function renderLanding() {
  const landingCards = document.getElementById('landingCards');
  landingCards.innerHTML = `
    <div class="landing-cards-container">
      <div class="lcard" onclick="showSection('frontend')">
        <div class="lcard-icon">⚛️</div>
        <div class="lcard-title">Frontend</div>
        <div class="lcard-topics">2 topics</div>
        <div class="lcard-questions">140+ Q&As</div>
        <div class="lcard-desc">JavaScript, React</div>
        <div class="lcard-btn">Explore →</div>
      </div>
      <div class="lcard" onclick="showSection('backend')">
        <div class="lcard-icon">☕</div>
        <div class="lcard-title">Backend</div>
        <div class="lcard-topics">23 topics</div>
        <div class="lcard-questions">530+ Q&As</div>
        <div class="lcard-desc">Java, Spring, AWS</div>
        <div class="lcard-btn">Explore →</div>
      </div>
    </div>
  `;
}

function updateHeroSection() {
  const config = SECTION_CONFIG[curSection];
  const homeView = document.getElementById('homeView');
  const hero = homeView.querySelector('.hero-chip');
  const heroH1 = homeView.querySelector('.hero-inner h1');
  const heroSub = homeView.querySelector('.hero-sub');

  if (hero) hero.textContent = config.chip;
  if (heroH1) heroH1.innerHTML = config.heading;
  if (heroSub) heroSub.textContent = config.subheading;
}

function updateFilterButtons() {
  const filterRow = document.getElementById('filterRow');
  if (!filterRow) return;

  const config = SECTION_CONFIG[curSection];
  const categories = config.categories;

  filterRow.innerHTML = Object.entries(categories).map(([key, label]) => `
    <button class="fp ${curFilter === key ? 'on' : ''}" onclick="setF('${key}',this)">${label}</button>
  `).join('');
}

function updateStats() {
  const total = ALL_TOPICS.reduce((s, t) => s + t.qs.length, 0);
  const el = document.getElementById('totalQ');
  if (el) el.textContent = total + '+';
  const meta = document.getElementById('navMeta');
  if (meta) meta.textContent = total + '+ Q · ' + ALL_TOPICS.length + ' topics';
}

// ── GRID ─────────────────────────────────────────────────────────────────────
function renderGrid() {
  const q  = (document.getElementById('gSearch')?.value || '').trim().toLowerCase();
  const grid = document.getElementById('topicGrid');
  const lbl  = document.getElementById('gridLbl');
  if (!grid) return;

  // Update hero section based on current section
  updateHeroSection();

  // Update filter buttons based on section
  updateFilterButtons();

  // Filter topics by section
  let topics = curSection === 'frontend'
    ? ALL_TOPICS.filter(t => TOPIC_SECTIONS.frontend.includes(t.id))
    : ALL_TOPICS.filter(t => TOPIC_SECTIONS.backend.includes(t.id));

  // Apply category filter
  if (curFilter !== 'all') {
    if (curSection === 'frontend') {
      topics = topics.filter(t => t.id === curFilter);
    } else {
      // Backend section - filter by category groups
      const categoryTopics = [];
      for (const grp of BACKEND_CATEGORIES[curFilter]) {
        categoryTopics.push(...topics.filter(t => t.grp === grp));
      }
      topics = categoryTopics;
    }
  }

  // Apply search filter
  if (q) {
    topics = topics.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q)) ||
      t.qs.some(item => item.q.toLowerCase().includes(q))
    );
  }

  lbl.textContent = (curFilter === 'all' ? 'All Topics' : capitalize(curFilter))
    + ' — ' + topics.length;

  if (topics.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <div class="empty-icon">🔍</div>
      <p>No topics match "<strong>${q}</strong>"</p></div>`;
    return;
  }

  grid.innerHTML = topics.map((t, i) => {
    const qc = t.qs.length;
    const easy = t.qs.filter(q => q.d === 'easy').length;
    const med  = t.qs.filter(q => q.d === 'medium').length;
    const hard = t.qs.filter(q => q.d === 'hard').length;
    return `
    <div class="tc" onclick="showTopic('${t.id}')"
         style="--tglow:${t.tglow};animation-delay:${i * 0.03}s">
      <div class="tc-top">
        <div class="tc-icon" style="background:${t.ib};color:${t.ic}">${t.icon}</div>
        <span class="tc-badge">${t.grp}</span>
      </div>
      <div class="prog"><div class="progf" style="width:${Math.min((qc/20)*100,100)}%;background:${t.bar}"></div></div>
      <div class="tc-title">${t.title}</div>
      <div class="tc-desc">${t.desc}</div>
      <div class="tc-tags">${t.tags.slice(0,4).map(tag => `<span class="ttag">${tag}</span>`).join('')}</div>
      <div class="tc-foot">
        <span class="tc-qc"><strong>${qc}</strong> questions &nbsp;·&nbsp;
          <span style="color:#4ade80">${easy}E</span>&nbsp;
          <span style="color:#fb923c">${med}M</span>&nbsp;
          <span style="color:#f87171">${hard}H</span>
        </span>
        <div class="tc-arr">→</div>
      </div>
    </div>`;
  }).join('');
}

// ── TOPIC DETAIL ──────────────────────────────────────────────────────────────
function _activateTopic() {
  document.getElementById('homeView').classList.add('off');
  document.getElementById('topicView').classList.add('on');
  window.scrollTo(0, 0);
  renderTopic();
}

function showTopic(id) {
  curTopic = ALL_TOPICS.find(t => t.id === id);
  if (!curTopic) return;
  curDiff = 'all';

  // Infer section if not already set
  if (!curSection || curSection === 'landing') {
    if (TOPIC_SECTIONS.frontend.includes(id)) {
      curSection = 'frontend';
    } else {
      curSection = 'backend';
    }
  }

  history.pushState({ topicId: id }, '', '#' + id);
  _activateTopic();
}

function renderTopic() {
  const t = curTopic;
  const qs = curDiff === 'all' ? t.qs : t.qs.filter(q => q.d === curDiff);
  const easy = t.qs.filter(q => q.d === 'easy').length;
  const med  = t.qs.filter(q => q.d === 'medium').length;
  const hard = t.qs.filter(q => q.d === 'hard').length;

  document.getElementById('topicContent').innerHTML = `
    <div class="thdr">
      <div class="thdr-icon" style="background:${t.ib};color:${t.ic}">${t.icon}</div>
      <div class="thdr-info">
        <div class="thdr-title">${t.title}</div>
        <div class="thdr-meta">${t.desc}</div>
        <div class="thdr-stats">
          <div class="ths"><span class="ths-n">${t.qs.length}</span><span class="ths-l">Total</span></div>
          <div class="ths"><span class="ths-n" style="color:#4ade80">${easy}</span><span class="ths-l">Easy</span></div>
          <div class="ths"><span class="ths-n" style="color:#fb923c">${med}</span><span class="ths-l">Medium</span></div>
          <div class="ths"><span class="ths-n" style="color:#f87171">${hard}</span><span class="ths-l">Hard</span></div>
        </div>
      </div>
    </div>

    <div class="drow">
      <button class="db ${curDiff==='all'?'on':''}"  onclick="setDiff('all')">All (${t.qs.length})</button>
      <button class="db easy ${curDiff==='easy'?'on':''}" onclick="setDiff('easy')">Easy (${easy})</button>
      <button class="db medium ${curDiff==='medium'?'on':''}"  onclick="setDiff('medium')">Medium (${med})</button>
      <button class="db hard ${curDiff==='hard'?'on':''}" onclick="setDiff('hard')">Hard (${hard})</button>
    </div>

    <div class="qlist" id="qlist">
      ${qs.length === 0
        ? '<div class="empty"><div class="empty-icon">📭</div><p>No questions for this filter.</p></div>'
        : qs.map((item, i) => `
          <div class="qi" id="qi-${i}">
            <div class="qq" onclick="toggleQ(${i})">
              <span class="qnum">${String(i+1).padStart(2,'0')}.</span>
              <span class="qtext">${item.q}</span>
              <div class="qright">
                <span class="dbadge ${item.d}">${item.d.charAt(0).toUpperCase()+item.d.slice(1)}</span>
                <span class="qchev">▼</span>
              </div>
            </div>
            <div class="qans">
              <div class="qans-in">${item.a}</div>
            </div>
          </div>`).join('')
      }
    </div>

    `;
}

function toggleQ(i) {
  const el = document.getElementById('qi-' + i);
  if (!el) return;
  el.classList.toggle('open');
}

function setDiff(d) {
  curDiff = d;
  renderTopic();
}

function goHome() {
  // If viewing a topic, go back to section grid
  // Otherwise, go to landing
  if (curTopic) {
    curTopic = null;
    document.getElementById('topicView').classList.remove('on');
    window.scrollTo(0, 0);
    if (curSection === 'frontend' || curSection === 'backend') {
      history.pushState({ section: curSection }, '', '#' + curSection);
    } else {
      showLanding();
    }
  } else {
    showLanding();
  }
}

function setF(filter, btn) {
  curFilter = filter;
  if (btn) {
    document.querySelectorAll('.fp').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  }
  renderGrid();
}

function onSearch() {
  if (curTopic) return; // don't interfere with topic view
  renderGrid();
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
