// ── ENGINE ───────────────────────────────────────────────────────────────────
const ALL_TOPICS = [
  SEC_JAVA, SEC_SPRING, SEC_HIBERNATE, SEC_THREADS, SEC_SQL,
  SEC_REST, SEC_REDIS, SEC_KAFKA, SEC_HLD, SEC_MICRO,
  SEC_DOCKER, SEC_AWS, SEC_K8S, SEC_OBS, SEC_PERF, SEC_SEC,
  SEC_GRPC, SEC_REACTIVE, SEC_CICD, SEC_AI,
  SEC_TESTING, SEC_PATTERNS, SEC_SOLID, SEC_MAVEN, SEC_DSA, SEC_REACT
];

let curFilter = 'all';
let curTopic  = null;
let curDiff   = 'all';

// ── INIT ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  updateStats();
  renderGrid();
});

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

  let topics = curFilter === 'all'
    ? ALL_TOPICS
    : ALL_TOPICS.filter(t => t.grp === curFilter);

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
function showTopic(id) {
  curTopic = ALL_TOPICS.find(t => t.id === id);
  if (!curTopic) return;
  curDiff = 'all';
  document.getElementById('homeView').classList.add('off');
  const tv = document.getElementById('topicView');
  tv.classList.add('on');
  window.scrollTo(0, 0);
  renderTopic();
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
  document.getElementById('homeView').classList.remove('off');
  const tv = document.getElementById('topicView');
  tv.classList.remove('on');
  curTopic = null;
  window.scrollTo(0, 0);
}

function setF(filter, btn) {
  curFilter = filter;
  document.querySelectorAll('.fp').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  renderGrid();
}

function onSearch() {
  if (curTopic) return; // don't interfere with topic view
  renderGrid();
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
