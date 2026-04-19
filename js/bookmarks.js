// ═══════════════════════════════════════════════════════════════════════════
// MODULE: bookmarks.js
// PURPOSE: Bookmark management functionality
// DEPENDENCIES: analytics.js, app.js (getLS, setLS, ALL_TOPICS)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get bookmarks from localStorage
 * @returns {Set} Set of bookmark keys (format: "topicId:questionIndex")
 */
function getBookmarks() {
  return new Set(getLS('bookmarks', []));
}

/**
 * Save bookmarks to localStorage
 * @param {Set} set - Set of bookmark keys
 */
function saveBookmarks(set) {
  setLS('bookmarks', Array.from(set));
}

/**
 * Toggle bookmark for a specific question
 * @param {string} topicId - ID of the topic
 * @param {number} idx - Index of the question
 * @param {Event} event - Click event
 */
function toggleBookmark(topicId, idx, event) {
  if (event) event.stopPropagation();
  var bms = getBookmarks();
  var key = topicId + ':' + idx;
  var isBookmarked = !bms.has(key);
  if (bms.has(key)) { bms.delete(key); } else { bms.add(key); }
  saveBookmarks(bms);

  // Update all matching bm-btn elements
  document.querySelectorAll('.bm-btn[data-key="' + key + '"]').forEach(function(btn) {
    btn.classList.toggle('bm-active', bms.has(key));
    btn.title = bms.has(key) ? 'Remove bookmark' : 'Bookmark this question';
  });

  // Track bookmark toggle
  trackEvent('bookmark_toggle', {
    'topic_id': topicId,
    'action': isBookmarked ? 'bookmark' : 'unbookmark',
    'total_bookmarks': bms.size
  });

  updateBmBadge();
}

/**
 * Update the bookmark count badge in navigation
 */
function updateBmBadge() {
  var count = getBookmarks().size;
  var badge = document.getElementById('bmBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

/**
 * Show bookmarks view
 */
function showBookmarks() {
  document.getElementById('landingView').classList.add('off');
  document.getElementById('homeView').classList.add('off');
  document.getElementById('topicView').classList.remove('on');
  var bv = document.getElementById('bookmarkView');
  bv.classList.remove('off');
  bv.classList.add('on');
  window.scrollTo(0, 0);

  // Track bookmark tab click
  var bmCount = getBookmarks().size;
  trackEvent('bookmark_tab_clicked', {
    'total_bookmarks': bmCount,
    'timestamp': new Date().toISOString()
  });

  renderBookmarks();
}

/**
 * Render bookmarks view
 */
function renderBookmarks() {
  var bms = getBookmarks();
  var content = document.getElementById('bmContent');
  if (!content) return;

  if (bms.size === 0) {
    content.innerHTML = '<div class="empty"><div class="empty-icon">⭐</div><p>No bookmarks yet. Click ⭐ on any question to save it here.</p></div>';
    return;
  }

  // Group by topic
  var grouped = {};
  bms.forEach(function(key) {
    var parts = key.split(':');
    var topicId = parts[0], idx = parseInt(parts[1]);
    if (!grouped[topicId]) grouped[topicId] = [];
    grouped[topicId].push(idx);
  });

  content.innerHTML = Object.keys(grouped).map(function(topicId) {
    var topic = ALL_TOPICS.find(function(t) { return t.id === topicId; });
    if (!topic) return '';
    var indices = grouped[topicId];
    return '<div class="bm-group">' +
      '<div class="bm-group-hdr">' +
        '<span style="background:' + topic.ib + ';color:' + topic.ic + ';padding:4px 10px;border-radius:7px;font-size:13px;font-weight:600;">' + topic.icon + ' ' + topic.title + '</span>' +
        '<button class="bm-clear-topic" onclick="clearTopicBookmarks(\'' + topicId + '\')">Clear</button>' +
      '</div>' +
      indices.map(function(i) {
        var q = topic.qs[i];
        if (!q) return '';
        return '<div class="qi" id="bqi-' + topicId + '-' + i + '">' +
          '<div class="qq" onclick="toggleBmQ(\'' + topicId + '\',' + i + ')">' +
            '<span class="qnum">' + String(i+1).padStart(2,'0') + '.</span>' +
            '<span class="qtext">' + q.q + '</span>' +
            '<div class="qright">' +
              '<span class="dbadge ' + q.d + '">' + q.d.charAt(0).toUpperCase() + q.d.slice(1) + '</span>' +
              '<button class="bm-btn bm-active" data-key="' + topicId + ':' + i + '" onclick="removeBmAndRefresh(\'' + topicId + '\',' + i + ',event)" title="Remove bookmark">⭐</button>' +
              '<span class="qchev">▼</span>' +
            '</div>' +
          '</div>' +
          '<div class="qans"><div class="qans-in">' + q.a + '</div></div>' +
        '</div>';
      }).join('') +
    '</div>';
  }).join('');
}

/**
 * Toggle bookmark question open/closed in bookmarks view
 * @param {string} topicId - ID of the topic
 * @param {number} idx - Index of the question
 */
function toggleBmQ(topicId, idx) {
  var el = document.getElementById('bqi-' + topicId + '-' + idx);
  if (el) el.classList.toggle('open');
}

/**
 * Remove bookmark and refresh view
 * @param {string} topicId - ID of the topic
 * @param {number} idx - Index of the question
 * @param {Event} event - Click event
 */
function removeBmAndRefresh(topicId, idx, event) {
  if (event) event.stopPropagation();
  toggleBookmark(topicId, idx);
  renderBookmarks();
}

/**
 * Show confirmation dialog to clear topic bookmarks
 * @param {string} topicId - ID of the topic
 */
function clearTopicBookmarks(topicId) {
  var count = 0;
  getBookmarks().forEach(function(key) {
    if (key.startsWith(topicId + ':')) count++;
  });
  var action = Object.assign({}, { topicId: topicId }, { action: 'clearTopic' });
  pendingConfirmAction = action;
  showConfirm(action, 'Clear ' + count + ' bookmark' + (count !== 1 ? 's' : '') + ' from this topic? This cannot be undone.');
}

/**
 * Show confirmation dialog to clear all bookmarks
 */
function clearAllBookmarks() {
  var count = getBookmarks().size;
  showConfirm('clearAll', 'Clear all ' + count + ' bookmarks? This cannot be undone.');
}
