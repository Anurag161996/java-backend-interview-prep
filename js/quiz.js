// ═══════════════════════════════════════════════════════════════════════════
// MODULE: quiz.js
// PURPOSE: Quiz functionality and gamification
// DEPENDENCIES: analytics.js, app.js (trackEvent, ALL_TOPICS, TOPIC_SECTIONS)
// ═══════════════════════════════════════════════════════════════════════════

// ── QUIZ STATE VARIABLES ──────────────────────────────────────────────────
var quizQuestions = [];
var quizIndex = 0;
var quizCorrect = 0;
var quizCount = 20;
var quizDiffFilter = 'all';
var quizAnswered = [];
var quizStreak = 0;
var quizStartTime = null;

/**
 * Open the quiz setup card
 * @param {string} preselectedTopicId - Optional topic to preselect
 */
function openQuizSetup(preselectedTopicId) {
  // Track quiz button click
  if (preselectedTopicId) {
    var topic = ALL_TOPICS.find(function(t) { return t.id === preselectedTopicId; });
    trackEvent('quiz_button_clicked', {
      'source': 'topic_detail',
      'topic_id': preselectedTopicId,
      'topic_name': topic ? topic.title : 'unknown'
    });
  } else {
    trackEvent('quiz_button_clicked', {
      'source': 'nav_or_home',
      'section': curSection
    });
  }

  var sectionTopics = curSection === 'frontend'
    ? ALL_TOPICS.filter(function(t) { return TOPIC_SECTIONS.frontend.includes(t.id); })
    : ALL_TOPICS.filter(function(t) { return TOPIC_SECTIONS.backend.includes(t.id); });

  document.getElementById('quizTopicList').innerHTML = sectionTopics.map(function(t) {
    var checked = preselectedTopicId === t.id ? ' checked' : '';
    return '<label class="quiz-topic-check">' +
      '<input type="checkbox" value="' + t.id + '"' + checked + '>' +
      '<span class="qtc-label" style="background:' + t.ib + ';color:' + t.ic + ';padding:2px 8px;border-radius:5px;font-size:12px;">' + t.icon + ' ' + t.title + '</span>' +
      '<span class="quiz-tc-count">' + t.qs.length + 'q</span>' +
    '</label>';
  }).join('');

  // Reset options
  quizCount = 20;
  quizDiffFilter = 'all';
  document.querySelectorAll('#quizCountOpts .qopt').forEach(function(b) { b.classList.remove('on'); });
  var countBtns = document.querySelectorAll('#quizCountOpts .qopt');
  if (countBtns[1]) countBtns[1].classList.add('on');

  document.querySelectorAll('#quizDiffOpts .qopt').forEach(function(b) { b.classList.remove('on'); });
  var diffBtns = document.querySelectorAll('#quizDiffOpts .qopt');
  if (diffBtns[0]) diffBtns[0].classList.add('on');

  document.getElementById('quizSetupCard').classList.remove('off');
  document.getElementById('quizQuestionCard').classList.add('off');
  document.getElementById('quizResultsCard').classList.add('off');
  document.getElementById('quizCardContainer').classList.remove('off');
  document.body.classList.add('modal-open');
}

/**
 * Close the quiz card
 */
function closeQuiz() {
  document.getElementById('quizCardContainer').classList.add('off');
  document.body.classList.remove('modal-open');
}

/**
 * Set the quiz question count
 * @param {number} n - Number of questions
 * @param {Element} btn - The button element
 */
function selectQuizCount(n, btn) {
  quizCount = n;
  document.querySelectorAll('#quizCountOpts .qopt').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
}

/**
 * Set the quiz difficulty filter
 * @param {string} d - Difficulty level (all, easy, medium, hard)
 * @param {Element} btn - The button element
 */
function selectQuizDiff(d, btn) {
  quizDiffFilter = d;
  document.querySelectorAll('#quizDiffOpts .qopt').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
}

/**
 * Start the quiz
 */
function startQuiz() {
  var checked = Array.from(document.querySelectorAll('#quizTopicList input:checked'));
  if (checked.length === 0) { alert('Please select at least one topic.'); return; }

  var pool = [];
  checked.forEach(function(cb) {
    var topic = ALL_TOPICS.find(function(t) { return t.id === cb.value; });
    if (!topic) return;
    var qs = quizDiffFilter === 'all' ? topic.qs : topic.qs.filter(function(q) { return q.d === quizDiffFilter; });
    qs.forEach(function(q, i) {
      pool.push(Object.assign({}, q, {
        _topicId: topic.id,
        _topicTitle: topic.title,
        _topicIcon: topic.icon,
        _origIdx: i
      }));
    });
  });

  if (pool.length === 0) { alert('No questions match the selected difficulty. Try a different filter.'); return; }

  // Fisher-Yates shuffle
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }

  quizQuestions = pool.slice(0, quizCount);
  quizIndex = 0;
  quizCorrect = 0;
  quizAnswered = [];
  quizStreak = 0;
  quizStartTime = new Date();

  // Clear points display animation before showing first question
  var display = document.getElementById('quizPointsDisplay');
  if (display) {
    display.textContent = '';
    display.style.animation = 'none';
  }

  // Track quiz start event
  var topicNames = checked.map(function(cb) { return cb.value; }).join(', ');
  trackEvent('quiz_start', {
    'quiz_count': quizCount,
    'quiz_difficulty': quizDiffFilter,
    'topics_selected': topicNames,
    'num_topics': checked.length
  });

  document.getElementById('quizSetupCard').classList.add('off');
  document.getElementById('quizQuestionCard').classList.remove('off');
  showQuizQ();
}

/**
 * Display the current quiz question
 */
function showQuizQ() {
  if (quizIndex >= quizQuestions.length) { endQuiz(); return; }
  var q = quizQuestions[quizIndex];
  var total = quizQuestions.length;

  // Update progress bar
  document.getElementById('quizProgFill').style.width = ((quizIndex / total) * 100) + '%';
  document.getElementById('quizCounter').textContent = 'Q ' + (quizIndex + 1) + ' of ' + total;

  // Update topic label
  document.getElementById('quizTopicLabel').textContent = q._topicIcon + ' ' + q._topicTitle;

  // Update question text
  document.getElementById('quizQText').textContent = q.q;

  // Reset answer box
  var ansBox = document.getElementById('quizAnsBox');
  ansBox.classList.add('off');
  document.getElementById('quizAnsIn').innerHTML = '';

  // Reset show button
  var showBtn = document.getElementById('quizShowBtn');
  showBtn.classList.remove('off');

  // Update streak display
  updateStreakDisplay();

  // Scroll card to top so question is visible
  var card = document.getElementById('quizQuestionCard');
  if (card) card.scrollTop = 0;
}

/**
 * Show the quiz answer
 */
function showQuizAnswer() {
  var q = quizQuestions[quizIndex];
  document.getElementById('quizAnsIn').innerHTML = q.a;
  document.getElementById('quizAnsBox').classList.remove('off');
  document.getElementById('quizShowBtn').classList.add('off');
}

/**
 * Mark an answer as correct or incorrect
 * @param {boolean} correct - Whether the answer was correct
 */
function markAnswer(correct) {
  var q = quizQuestions[quizIndex];
  if (correct) {
    quizCorrect++;
    quizStreak++;
    // Show point animation
    showPointsAnimation();
    // Check for milestone
    if (quizCorrect > 0 && quizCorrect % 5 === 0) {
      showConfetti();
    }
  } else {
    quizStreak = 0;
  }
  quizAnswered.push({
    correct: correct,
    topicTitle: q._topicTitle,
    topicIcon: q._topicIcon,
    q: q.q
  });

  // Track answer submission
  trackEvent('quiz_answer', {
    'correct': correct,
    'topic': q._topicTitle,
    'difficulty': q.d,
    'current_streak': quizStreak,
    'question_number': quizIndex + 1,
    'total_correct': quizCorrect
  });

  quizIndex++;
  // Smooth card transition
  setTimeout(function() { showQuizQ(); }, 300);
}

/**
 * Update the streak display
 */
function updateStreakDisplay() {
  var streakBox = document.getElementById('quizStreakBox');
  if (quizStreak > 0) {
    streakBox.innerHTML = '🔥 ' + quizStreak + ' in a row';
    streakBox.style.display = 'flex';
  } else {
    streakBox.style.display = 'none';
  }
}

/**
 * Show the +10 points animation
 */
function showPointsAnimation() {
  var display = document.getElementById('quizPointsDisplay');
  display.textContent = '+10 pts';
  display.style.animation = 'none';
  setTimeout(function() {
    display.style.animation = 'pointsFloat 1.5s cubic-bezier(.12,.74,.58,1) forwards';
  }, 10);
}

/**
 * Show confetti animation
 */
function showConfetti() {
  var container = document.getElementById('quizConfetti');
  for (var i = 0; i < 20; i++) {
    var particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.textContent = ['🎉', '⭐', '✨', '🔥', '💯'][Math.floor(Math.random() * 5)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '50%';
    particle.style.fontSize = (12 + Math.random() * 12) + 'px';
    container.appendChild(particle);
  }
  setTimeout(function() { container.innerHTML = ''; }, 2000);
}

/**
 * End the quiz and show results
 */
function endQuiz() {
  var total = quizQuestions.length;
  var pct = Math.round((quizCorrect / total) * 100);
  var timeTaken = Math.round((new Date() - quizStartTime) / 1000 / 60); // minutes

  // Track quiz completion
  trackEvent('quiz_complete', {
    'score_percentage': pct,
    'questions_correct': quizCorrect,
    'total_questions': total,
    'time_taken_minutes': timeTaken,
    'avg_time_per_question': Math.round((timeTaken * 60) / total),
    'highest_streak': Math.max.apply(Math, quizAnswered.map(function(a) { return a.correct ? 1 : 0; }))
  });

  document.getElementById('quizQuestionCard').classList.add('off');
  document.getElementById('quizResultsCard').classList.remove('off');

  // Score section with gradient
  document.getElementById('quizScore').innerHTML =
    '<span class="quiz-score-pct">' + pct + '%</span>' +
    '<span class="quiz-score-detail">' + quizCorrect + ' / ' + total + ' correct • ' + timeTaken + ' min</span>';

  // Achievement badge
  var badge = getAchievementBadge(pct, timeTaken, total);
  document.getElementById('quizAchievementBadge').innerHTML = badge.emoji;

  // Missed questions
  var missed = quizAnswered.filter(function(a) { return !a.correct; });
  var missedEl = document.getElementById('quizMissedList');

  if (missed.length === 0) {
    missedEl.innerHTML = '<div class="quiz-perfect">🎉 Perfect score! You crushed it! <br><span style="font-size:13px;color:var(--t2);">All questions answered correctly</span></div>';
    showConfetti();
  } else {
    var grouped = {};
    missed.forEach(function(a) {
      if (!grouped[a.topicTitle]) grouped[a.topicTitle] = { icon: a.topicIcon, qs: [] };
      grouped[a.topicTitle].qs.push(a.q);
    });
    missedEl.innerHTML =
      '<div class="quiz-missed-hdr">📝 Review these (' + missed.length + ' missed)</div>' +
      Object.keys(grouped).map(function(title) {
        var data = grouped[title];
        return '<div class="quiz-missed-group">' +
          '<div class="quiz-missed-topic">' + data.icon + ' ' + title + '</div>' +
          data.qs.map(function(q) { return '<div class="quiz-missed-q">• ' + q + '</div>'; }).join('') +
        '</div>';
      }).join('');
  }

  // Save session to localStorage
  setLS('quiz_last', {
    date: new Date().toISOString().slice(0, 10),
    correct: quizCorrect,
    total: total,
    pct: pct,
    timeMins: timeTaken,
    badge: badge.name
  });
}

/**
 * Get achievement badge based on performance
 * @param {number} pct - Score percentage
 * @param {number} timeMins - Time taken in minutes
 * @param {number} total - Total questions
 * @returns {object} Badge object with emoji and name
 */
function getAchievementBadge(pct, timeMins, total) {
  if (pct === 100) return { emoji: '🏆', name: 'Perfect' };
  if (pct >= 90) return { emoji: '⭐', name: 'Excellent' };
  if (pct >= 80) return { emoji: '🌟', name: 'Great' };
  if (timeMins < 5 && total >= 20) return { emoji: '⚡', name: 'Speedster' };
  return { emoji: '💪', name: 'Keep Going' };
}

/**
 * Retake the quiz with same questions
 */
function retakeQuiz() {
  // Shuffle same questions
  for (var i = quizQuestions.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = quizQuestions[i]; quizQuestions[i] = quizQuestions[j]; quizQuestions[j] = tmp;
  }
  quizIndex = 0;
  quizCorrect = 0;
  quizAnswered = [];
  document.getElementById('quizResults').classList.add('off');
  document.getElementById('quizQuestion').classList.remove('off');
  showQuizQ();
}
