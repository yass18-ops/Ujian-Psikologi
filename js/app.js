/**
 * Main Application Logic & SPA State Engine
 * Manages Home Screen dashboard, active test-taking flow, responsive mobile navigation,
 * scoring calculations, localStorage persistence, and print reports.
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  state: {
    currentScreen: 'home', // 'home', 'test', 'result'
    activeCategory: 'all',
    searchQuery: '',
    activeTestId: null,
    activeTest: null,
    currentQuestionIndex: 0,
    answers: {}, // { questionId: value }
    testStartTime: null,
    timerInterval: null,
    elapsedSeconds: 0,
    currentResults: null,
    testHistory: []
  },

  init: function() {
    this.loadHistory();
    this.bindEvents();
    this.renderHomeScreen();
  },

  loadHistory: function() {
    try {
      const saved = localStorage.getItem('ujian_psikologi_history');
      if (saved) {
        this.state.testHistory = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  },

  saveHistory: function(resultEntry) {
    try {
      this.state.testHistory.unshift(resultEntry);
      // Keep last 30 tests
      if (this.state.testHistory.length > 30) {
        this.state.testHistory = this.state.testHistory.slice(0, 30);
      }
      localStorage.setItem('ujian_psikologi_history', JSON.stringify(this.state.testHistory));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  },

  bindEvents: function() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value.toLowerCase().trim();
        this.renderHomeScreen();
      });
    }

    // Filter pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.state.activeCategory = pill.getAttribute('data-category');
        this.renderHomeScreen();
      });
    });

    // Test Navigation Controls
    const btnBackHome = document.getElementById('btn-back-home');
    if (btnBackHome) {
      btnBackHome.addEventListener('click', () => this.showHomeScreen());
    }

    const btnPrevQ = document.getElementById('btn-prev-q');
    if (btnPrevQ) {
      btnPrevQ.addEventListener('click', () => this.prevQuestion());
    }

    const btnNextQ = document.getElementById('btn-next-q');
    if (btnNextQ) {
      btnNextQ.addEventListener('click', () => this.nextQuestion());
    }

    const btnSubmitTest = document.getElementById('btn-submit-test');
    if (btnSubmitTest) {
      btnSubmitTest.addEventListener('click', () => this.submitTest());
    }

    // Result Actions
    const btnRetake = document.getElementById('btn-retake');
    if (btnRetake) {
      btnRetake.addEventListener('click', () => {
        if (this.state.activeTestId) {
          this.startTest(this.state.activeTestId);
        }
      });
    }

    const btnPrint = document.getElementById('btn-print-report');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => window.print());
    }

    const btnHomeResult = document.getElementById('btn-home-result');
    if (btnHomeResult) {
      btnHomeResult.addEventListener('click', () => this.showHomeScreen());
    }
  },

  showHomeScreen: function() {
    this.stopTimer();
    this.state.currentScreen = 'home';
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('test-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.renderHomeScreen();
  },

  renderHomeScreen: function() {
    const grid = document.getElementById('tests-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const testKeys = Object.keys(TESTS_DATA);
    let filteredKeys = testKeys.filter(key => {
      const test = TESTS_DATA[key];
      const matchCat = (this.state.activeCategory === 'all' || test.category === this.state.activeCategory);
      const matchSearch = (!this.state.searchQuery || 
        test.title.toLowerCase().includes(this.state.searchQuery) ||
        test.description.toLowerCase().includes(this.state.searchQuery) ||
        test.categoryLabel.toLowerCase().includes(this.state.searchQuery));
      return matchCat && matchSearch;
    });

    if (filteredKeys.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-folder-open text-4xl"></i>
          <p>Tiada ujian dijumpai sepadan dengan carian anda.</p>
        </div>
      `;
      return;
    }

    filteredKeys.forEach(key => {
      const test = TESTS_DATA[key];
      const card = document.createElement('div');
      card.className = 'test-card glass-panel';
      card.innerHTML = `
        <div class="test-card-header">
          <div class="test-icon-badge">
            <i class="fa-solid ${test.icon || 'fa-clipboard-list'}"></i>
          </div>
          <span class="test-lang-tag">${test.language}</span>
        </div>
        <div class="test-card-body">
          <span class="test-category-badge">${test.categoryLabel}</span>
          <h3 class="test-card-title">${test.title}</h3>
          <p class="test-card-desc">${test.description}</p>
        </div>
        <div class="test-card-footer">
          <div class="test-meta">
            <span><i class="fa-regular fa-clock"></i> ${test.estimatedTime}</span>
            <span><i class="fa-solid fa-list-check"></i> ${test.questionCount} Soalan</span>
          </div>
          <button class="btn-start-test" onclick="App.startTest('${test.id}')">
            Mula Ujian <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    this.renderHistorySection();
  },

  renderHistorySection: function() {
    const historyContainer = document.getElementById('history-container');
    const historyList = document.getElementById('history-list');
    if (!historyContainer || !historyList) return;

    if (!this.state.testHistory || this.state.testHistory.length === 0) {
      historyContainer.classList.add('hidden');
      return;
    }

    historyContainer.classList.remove('hidden');
    historyList.innerHTML = '';

    this.state.testHistory.slice(0, 5).forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item glass-panel';
      div.innerHTML = `
        <div class="history-item-header">
          <div>
            <h4 class="history-item-title">${item.testTitle}</h4>
            <span class="history-item-date"><i class="fa-regular fa-calendar-days"></i> ${item.date}</span>
          </div>
          <span class="history-score-tag">${item.summaryShort || 'Selesai'}</span>
        </div>
      `;
      historyList.appendChild(div);
    });
  },

  startTest: function(testId) {
    const test = TESTS_DATA[testId];
    if (!test) return;

    this.state.activeTestId = testId;
    this.state.activeTest = test;
    this.state.currentQuestionIndex = 0;
    this.state.answers = {};
    this.state.elapsedSeconds = 0;

    this.state.currentScreen = 'test';
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('test-screen').classList.remove('hidden');

    document.getElementById('test-title-header').innerText = test.shortTitle || test.title;
    document.getElementById('test-instructions').innerText = test.instructions;

    this.startTimer();
    this.renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  startTimer: function() {
    this.stopTimer();
    this.state.testStartTime = new Date();
    const timerElem = document.getElementById('test-timer');

    this.state.timerInterval = setInterval(() => {
      this.state.elapsedSeconds++;
      const mins = Math.floor(this.state.elapsedSeconds / 60).toString().padStart(2, '0');
      const secs = (this.state.elapsedSeconds % 60).toString().padStart(2, '0');
      if (timerElem) timerElem.innerText = `${mins}:${secs}`;
    }, 1000);
  },

  stopTimer: function() {
    if (this.state.timerInterval) {
      clearInterval(this.state.timerInterval);
      this.state.timerInterval = null;
    }
  },

  renderQuestion: function() {
    const test = this.state.activeTest;
    const qIndex = this.state.currentQuestionIndex;
    const question = test.questions[qIndex];
    const totalQ = test.questions.length;

    // Update Progress
    const pct = Math.round(((qIndex + 1) / totalQ) * 100);
    const progressFill = document.getElementById('test-progress-fill');
    if (progressFill) progressFill.style.width = `${pct}%`;

    const progressText = document.getElementById('test-progress-text');
    if (progressText) progressText.innerText = `Soalan ${qIndex + 1} daripada ${totalQ}`;

    const container = document.getElementById('question-card-body');
    if (!container) return;

    let html = `
      <div class="question-number-badge">Soalan ${qIndex + 1} / ${totalQ}</div>
    `;

    if (question.section) {
      html += `<span class="section-tag">${question.section}</span>`;
    }

    if (question.title) {
      html += `<h3 class="question-text">${question.title}</h3>`;
    } else {
      html += `<h3 class="question-text">${question.text}</h3>`;
    }

    // Render Options based on test type
    if (test.type === 'numeric-input') {
      const currentVal = this.state.answers[question.id] || 0;
      html += `
        <div class="numeric-input-group">
          <label class="numeric-label">Masukkan jam sehari / seminggu (${question.unit}):</label>
          <div class="input-with-stepper">
            <button class="btn-step" onclick="App.stepNumeric(${question.id}, -1)">-</button>
            <input type="number" id="num-input-${question.id}" class="numeric-field" min="0" max="24" step="0.5" value="${currentVal}" onchange="App.setAnswer(${question.id}, this.value)">
            <button class="btn-step" onclick="App.stepNumeric(${question.id}, 1)">+</button>
          </div>
        </div>
      `;
    } else if (test.type === 'group-options') {
      const selectedVal = this.state.answers[question.id];
      html += `<div class="options-grid">`;
      question.options.forEach(opt => {
        const isChecked = (selectedVal !== undefined && parseInt(selectedVal) === opt.v);
        html += `
          <div class="option-tile ${isChecked ? 'selected' : ''}" onclick="App.selectOption(${question.id}, ${opt.v})">
            <div class="tile-radio ${isChecked ? 'checked' : ''}"></div>
            <span class="tile-label">${opt.text}</span>
          </div>
        `;
      });
      html += `</div>`;
    } else if (test.type === 'pair-options') {
      const selectedVal = this.state.answers[question.id];
      html += `<div class="options-grid pair-grid">`;
      html += `
        <div class="option-tile pair-tile ${selectedVal === 'a' ? 'selected' : ''}" onclick="App.selectOption('${question.id}', 'a')">
          <span class="pair-letter">A</span>
          <span class="tile-label">${question.a}</span>
        </div>
        <div class="option-tile pair-tile ${selectedVal === 'b' ? 'selected' : ''}" onclick="App.selectOption('${question.id}', 'b')">
          <span class="pair-letter">B</span>
          <span class="tile-label">${question.b}</span>
        </div>
      `;
      html += `</div>`;
    } else if (test.isMultiSelect) {
      const selectedArr = this.state.answers[question.id] || [];
      html += `<div class="options-grid">`;
      question.options.forEach(opt => {
        const isChecked = selectedArr.includes(opt.key);
        html += `
          <div class="option-tile ${isChecked ? 'selected' : ''}" onclick="App.toggleMultiOption(${question.id}, '${opt.key}')">
            <div class="tile-checkbox ${isChecked ? 'checked' : ''}"><i class="fa-solid fa-check"></i></div>
            <span class="tile-label">${opt.label}</span>
          </div>
        `;
      });
      html += `</div>`;
    } else {
      // Standard Options Array (DASS-21, IGB, Saringan Minda Sihat)
      const optionsToRender = question.options || test.options;
      const selectedVal = this.state.answers[question.id];
      html += `<div class="options-grid">`;
      optionsToRender.forEach(opt => {
        const val = opt.value !== undefined ? opt.value : opt.v;
        const label = opt.label;
        const isChecked = (selectedVal !== undefined && parseInt(selectedVal) === val);
        html += `
          <div class="option-tile ${isChecked ? 'selected' : ''}" onclick="App.selectOption(${question.id}, ${val})">
            <div class="tile-radio ${isChecked ? 'checked' : ''}"></div>
            <span class="tile-label">${label}</span>
          </div>
        `;
      });
      html += `</div>`;
    }

    container.innerHTML = html;
    this.updateNavButtons();
  },

  selectOption: function(qId, val) {
    this.state.answers[qId] = val;
    this.renderQuestion();
  },

  toggleMultiOption: function(qId, key) {
    let current = this.state.answers[qId] || [];
    if (!Array.isArray(current)) current = [];

    if (current.includes(key)) {
      current = current.filter(k => k !== key);
    } else {
      current.push(key);
    }
    this.state.answers[qId] = current;
    this.renderQuestion();
  },

  setAnswer: function(qId, val) {
    this.state.answers[qId] = parseFloat(val) || 0;
    this.updateNavButtons();
  },

  stepNumeric: function(qId, delta) {
    const input = document.getElementById(`num-input-${qId}`);
    if (!input) return;
    let val = parseFloat(input.value) || 0;
    val = Math.max(0, Math.min(24, val + delta));
    input.value = val;
    this.setAnswer(qId, val);
  },

  updateNavButtons: function() {
    const qIndex = this.state.currentQuestionIndex;
    const totalQ = this.state.activeTest.questions.length;

    const btnPrev = document.getElementById('btn-prev-q');
    const btnNext = document.getElementById('btn-next-q');
    const btnSubmit = document.getElementById('btn-submit-test');

    if (btnPrev) {
      btnPrev.disabled = (qIndex === 0);
    }

    if (qIndex === totalQ - 1) {
      if (btnNext) btnNext.classList.add('hidden');
      if (btnSubmit) btnSubmit.classList.remove('hidden');
    } else {
      if (btnNext) btnNext.classList.remove('hidden');
      if (btnSubmit) btnSubmit.classList.add('hidden');
    }
  },

  prevQuestion: function() {
    if (this.state.currentQuestionIndex > 0) {
      this.state.currentQuestionIndex--;
      this.renderQuestion();
    }
  },

  nextQuestion: function() {
    const test = this.state.activeTest;
    const qIndex = this.state.currentQuestionIndex;
    const question = test.questions[qIndex];

    // Validate answer if needed
    const ans = this.state.answers[question.id];
    if (ans === undefined || (Array.isArray(ans) && ans.length === 0 && !test.isMultiSelect)) {
      // Gentle toast/alert
      this.showToast('Sila pilih jawapan sebelum meneruskan.');
      return;
    }

    if (qIndex < test.questions.length - 1) {
      this.state.currentQuestionIndex++;
      this.renderQuestion();
    }
  },

  submitTest: function() {
    this.stopTimer();
    const test = this.state.activeTest;

    // Check completion
    const results = test.calculateResults(this.state.answers);
    this.state.currentResults = results;

    const resultEntry = {
      testId: test.id,
      testTitle: test.title,
      date: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      summaryShort: results.summary
    };
    this.saveHistory(resultEntry);

    this.showResultScreen(results);
  },

  showResultScreen: function(results) {
    this.state.currentScreen = 'result';
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('test-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    const test = this.state.activeTest;
    document.getElementById('result-test-name').innerText = test.title;
    document.getElementById('result-summary-text').innerText = results.summary;

    if (results.status) {
      document.getElementById('result-badge').innerText = results.status;
      document.getElementById('result-badge').style.backgroundColor = results.statusColor || '#3b82f6';
      document.getElementById('result-desc-text').innerText = results.statusDesc || '';
    } else if (results.dominant) {
      document.getElementById('result-badge').innerText = results.dominant.name;
      document.getElementById('result-badge').style.backgroundColor = results.dominant.color || '#3b82f6';
      document.getElementById('result-desc-text').innerText = results.dominant.desc || '';
    } else if (results.mbtiType) {
      document.getElementById('result-badge').innerText = results.mbtiType;
      document.getElementById('result-badge').style.backgroundColor = '#ec4899';
      document.getElementById('result-desc-text').innerText = results.summary;
    } else {
      document.getElementById('result-badge').innerText = 'Keputusan Selesai';
      document.getElementById('result-badge').style.backgroundColor = '#10b981';
      document.getElementById('result-desc-text').innerText = 'Tahniah! Anda telah melengkapkan ujian ini dengan jayanya.';
    }

    // Render Subscales Progress Bars
    const subscaleContainer = document.getElementById('result-subscales-container');
    if (subscaleContainer) {
      subscaleContainer.innerHTML = ChartsEngine.renderSubscaleBars(results.subscales);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  showToast: function(msg) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
};
