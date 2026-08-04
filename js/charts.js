/**
 * Dynamic SVG Chart & Visualizer Engine for Psychological Test Results
 * Renders high-resolution responsive SVG Bar Progress, Donut Gauges, and Visual Cards
 */

const ChartsEngine = {
  /**
   * Renders a series of responsive SVG progress bars for subscales
   * @param {Array} subscales Array of { name, score, max, percentage, color, desc, level }
   * @returns {string} HTML string of rendered progress components
   */
  renderSubscaleBars: function(subscales) {
    if (!subscales || !subscales.length) return '';

    return subscales.map(item => {
      const pct = Math.min(100, Math.max(0, item.percentage !== undefined ? item.percentage : Math.round((item.score / item.max) * 100)));
      const barColor = item.color || '#3b82f6';
      
      return `
        <div class="subscale-card">
          <div class="subscale-header">
            <div class="subscale-title-group">
              <span class="subscale-dot" style="background-color: ${barColor}"></span>
              <span class="subscale-name">${item.name}</span>
            </div>
            <div class="subscale-score-badge" style="border-color: ${barColor}; color: ${barColor}">
              ${item.level ? item.level : `${item.score} / ${item.max}`}
            </div>
          </div>
          
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, ${barColor}aa, ${barColor});"></div>
          </div>

          <div class="subscale-footer">
            <span class="subscale-desc">${item.desc || ''}</span>
            <span class="subscale-percentage">${pct}%</span>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * Renders an SVG Donut gauge for a single primary score or percentage
   */
  renderDonutGauge: function(score, max, label, color = '#3b82f6') {
    const pct = Math.min(100, Math.max(0, Math.round((score / max) * 100)));
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (pct / 100) * circumference;

    return `
      <div class="donut-gauge-container">
        <svg class="donut-svg" viewBox="0 0 100 100">
          <circle class="donut-bg" cx="50" cy="50" r="${radius}" stroke-width="10" />
          <circle class="donut-fill" cx="50" cy="50" r="${radius}" stroke-width="10"
            stroke="${color}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${strokeDashoffset}"
            transform="rotate(-90 50 50)" />
          <text x="50" y="47" class="donut-text-value" fill="${color}">${pct}%</text>
          <text x="50" y="64" class="donut-text-label">${score} / ${max}</text>
        </svg>
        <div class="donut-label-title">${label}</div>
      </div>
    `;
  }
};
