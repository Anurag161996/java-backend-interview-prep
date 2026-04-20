// ═══════════════════════════════════════════════════════════════════════════
// MODULE: bookmarks.js
// PURPOSE: Bookmark management functionality
// DEPENDENCIES: analytics.js, app.js (getLS, setLS, ALL_TOPICS)
// KEY FORMAT: "topicId:q.id" (e.g. "java:jdk-jre-jvm")
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get bookmarks from localStorage
 * @returns {Set} Set of bookmark keys ("topicId:q.id")
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
 * Build bookmark key from topic ID and question object
 * @param {string} topicId
 * @param {Object} q - question object (must have q.id)
 * @returns {string} "topicId:q.id"
 */
function makeBookmarkKey(topicId, q) {
  return topicId + ':' + String(q.id);
}

/**
 * No-op kept for compatibility — stable IDs need no migration
 */
function migrateBookmarks() {}

/**
 * Toggle bookmark for a specific question
 * @param {string} fullKey - "topicId:q.id"
 * @param {Event} event - Click event
 */
function toggleBookmark(fullKey, event) {
  if (event) event.stopPropagation();
  var bms = getBookmarks();
  var isBookmarked = !bms.has(fullKey);
  if (bms.has(fullKey)) { bms.delete(fullKey); } else { bms.add(fullKey); }
  saveBookmarks(bms);

  document.querySelectorAll('.bm-btn[data-key="' + fullKey + '"]').forEach(function(btn) {
    btn.classList.toggle('bm-active', bms.has(fullKey));
    btn.title = bms.has(fullKey) ? 'Remove bookmark' : 'Bookmark this question';
  });

  var topicId = fullKey.substring(0, fullKey.indexOf(':'));
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

  trackEvent('bookmark_tab_clicked', {
    'total_bookmarks': getBookmarks().size,
    'timestamp': new Date().toISOString()
  });

  renderBookmarks();
}

/**
 * Render bookmarks view.
 * Orphaned keys (question ID not found in topic) are silently removed.
 */
function renderBookmarks() {
  var bms = getBookmarks();
  var content = document.getElementById('bmContent');
  if (!content) return;

  if (bms.size === 0) {
    content.innerHTML = '<div class="empty"><div class="empty-icon">⭐</div><p>No bookmarks yet. Click ⭐ on any question to save it here.</p></div>';
    return;
  }

  // Group by topic; prune any key whose question no longer exists
  var grouped = {};
  var pruned = new Set(bms);

  bms.forEach(function(key) {
    var colonIdx = key.indexOf(':');
    if (colonIdx === -1) { pruned.delete(key); return; }
    var topicId = key.substring(0, colonIdx);
    var qId = key.substring(colonIdx + 1);
    var topic = ALL_TOPICS.find(function(t) { return t.id === topicId; });
    if (!topic) { pruned.delete(key); return; }
    var q = topic.qs.find(function(item) { return String(item.id) === qId; });
    if (!q) { pruned.delete(key); return; }   // orphan — remove silently
    if (!grouped[topicId]) grouped[topicId] = [];
    grouped[topicId].push({ q: q, key: key });
  });

  // Persist cleaned set if any orphans were removed
  if (pruned.size !== bms.size) saveBookmarks(pruned);

  if (pruned.size === 0) {
    content.innerHTML = '<div class="empty"><div class="empty-icon">⭐</div><p>No bookmarks yet. Click ⭐ on any question to save it here.</p></div>';
    return;
  }

  content.innerHTML = Object.keys(grouped).map(function(topicId) {
    var topic = ALL_TOPICS.find(function(t) { return t.id === topicId; });
    if (!topic) return '';
    return '<div class="bm-group">' +
      '<div class="bm-group-hdr">' +
        '<span style="background:' + topic.ib + ';color:' + topic.ic + ';padding:4px 10px;border-radius:7px;font-size:13px;font-weight:600;">' + topic.icon + ' ' + topic.title + '</span>' +
        '<button class="bm-clear-topic" onclick="clearTopicBookmarks(\'' + topicId + '\')">Clear</button>' +
      '</div>' +
      grouped[topicId].map(function(entry) {
        var q = entry.q;
        var fullKey = entry.key;
        var qIdx = topic.qs.indexOf(q);
        var safeId = fullKey.replace(':', '-');
        return '<div class="qi" id="bqi-' + safeId + '">' +
          '<div class="qq" onclick="toggleBmQ(\'' + safeId + '\')">' +
            '<span class="qnum">' + String(qIdx + 1).padStart(2, '0') + '.</span>' +
            '<span class="qtext">' + q.q + '</span>' +
            '<div class="qright">' +
              '<span class="dbadge ' + q.d + '">' + q.d.charAt(0).toUpperCase() + q.d.slice(1) + '</span>' +
              '<button class="bm-btn bm-active" data-key="' + fullKey + '" onclick="removeBmAndRefresh(\'' + fullKey + '\',event)" title="Remove bookmark">⭐</button>' +
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
 * @param {string} safeId - e.g. "java-jdk-jre-jvm"
 */
function toggleBmQ(safeId) {
  var el = document.getElementById('bqi-' + safeId);
  if (el) el.classList.toggle('open');
}

/**
 * Remove bookmark and refresh view
 * @param {string} fullKey - "topicId:q.id"
 * @param {Event} event - Click event
 */
function removeBmAndRefresh(fullKey, event) {
  if (event) event.stopPropagation();
  toggleBookmark(fullKey);
  renderBookmarks();
}

/**
 * Clear all bookmarks for a topic
 * @param {string} topicId
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
