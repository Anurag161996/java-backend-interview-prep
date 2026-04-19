// ═══════════════════════════════════════════════════════════════════════════
// MODULE: analytics.js
// PURPOSE: Google Analytics tracking integration
// MEASUREMENT ID: G-122HCTD02W
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Track a custom event with Google Analytics
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Event parameters to send
 */
function trackEvent(eventName, eventParams) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventParams || {});
  }
}

/**
 * Track a page view with Google Analytics
 * @param {string} pagePath - Path of the page (e.g., '/frontend')
 * @param {string} pageTitle - Title of the page
 */
function trackPageView(pagePath, pageTitle) {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'G-122HCTD02W', {
      'page_path': pagePath,
      'page_title': pageTitle
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// TRACKING HELPER: Converts tracking calls into GA events
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Events Tracked:
 * - section_button_clicked: When user clicks Frontend/Backend
 * - topic_url_clicked: When user clicks on a topic
 * - bookmark_tab_clicked: When user opens bookmarks
 * - clear_button_clicked: When user clears bookmarks
 * - quiz_button_clicked: When user starts quiz dialog
 * - quiz_start: When quiz begins
 * - quiz_answer: When user answers a question
 * - quiz_complete: When user finishes a quiz
 * - bookmark_toggle: When user bookmarks/unbookmarks
 * - theme_change: When user switches theme
 * - search: When user searches for questions
 */
